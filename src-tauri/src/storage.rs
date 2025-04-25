use anyhow::Result;
use chrono::Utc;
use redb::{self, Database, ReadableTable, TableDefinition};
use serde::{Deserialize, Serialize};
use std::sync::Mutex;
use tauri::Manager;
use uuid::Uuid;

const TABLE: TableDefinition<&[u8], &[u8]> = TableDefinition::new("events");

pub struct StorageState(pub Mutex<Storage>);

pub struct Storage {
    db: Database,
}

impl Storage {
    pub fn new(app:&tauri::AppHandle) -> Result<Self> {
        let db = connect_to_db(app)?;
        Ok(Self { db })
    }

    pub fn add_event(&self, event: Event) -> Result<()> {
        add_event(event, &self.db)
    }

    pub fn delete_event(&self, uuid: &String) -> Result<()> {
        delete_event(uuid, &self.db)
    }

    pub fn get_events(&self, filter: &dyn EventFilter) -> Result<Vec<Event>> {
        get_events(&self.db, filter)
    }
}
#[derive(Serialize, Deserialize, Debug, Clone, PartialEq)]
pub struct EventMetadata {
    uuid: String,
    timestamp: u64,
}

impl EventMetadata {
    pub fn new() -> Self {
        Self {
            uuid: Uuid::new_v4().to_string(),
            timestamp: Utc::now().timestamp_millis() as u64,
        }
    }
}

#[derive(Serialize, Deserialize, Debug, Clone, PartialEq)]
pub enum EventType {
    Instant,
    Duration,
}

#[derive(Serialize, Deserialize, Debug, Clone, PartialEq)]
pub struct DurationTime {
    pub start: u64,
    pub end: u64,
}

#[derive(Serialize, Deserialize, Debug, Clone, PartialEq)]
pub enum TaskTime {
    Deadline(u64),
    Duration(DurationTime),
}

#[derive(Serialize, Deserialize, Debug, Clone)]
pub struct Event {
    pub metadata: EventMetadata,
    pub title: String,
    pub content: String,
    pub event_type: EventType,
    pub task_time: TaskTime,
    pub finished: bool,
}

fn connect_to_db(app: &tauri::AppHandle) -> Result<Database> {
    let data_dir = app
        .path()
        .data_dir()?
        .join("events");
    let db_path = data_dir.join("events.db");
    if !db_path.exists() {
        std::fs::create_dir_all(&data_dir)?;
    }
    let db = Database::create(db_path)?;
    Ok(db)
}

fn add_event(event: Event, db: &Database) -> Result<()> {
    let txn = db.begin_write()?;
    {
        let mut table = txn.open_table(TABLE)?;
        let key = event.metadata.uuid.as_bytes();
        let value = serde_json::to_vec(&event)?;
        table.insert(&key[..], &value[..])?;
    }
    txn.commit()?;
    Ok(())
}

fn delete_event(uuid: &String, db: &Database) -> Result<()> {
    let txn = db.begin_write()?;
    {
        let mut table = txn.open_table(TABLE)?;
        let key = uuid.as_bytes();
        table.remove(&key[..])?;
    }
    txn.commit()?;
    Ok(())
}

pub trait EventFilter {
    fn matches(&self, event: &Event) -> bool;
}

pub struct TimeFilter {
    pub ddl: u64,
}
impl EventFilter for TimeFilter {
    fn matches(&self, event: &Event) -> bool {
        match &event.task_time {
            TaskTime::Deadline(d) => *d <= self.ddl,
            TaskTime::Duration(d) => d.end <= self.ddl,
        }
    }
}

fn get_events(db: &Database, filter: &dyn EventFilter) -> Result<Vec<Event>> {
    let txn = db.begin_read()?;
    let table = txn.open_table(TABLE)?;
    let mut events = Vec::new();
    for row in table.iter()? {
        let (_key, value) = row?;
        let event: Event = serde_json::from_slice(value.value())?;
        if filter.matches(&event) {
            events.push(event);
        }
    }
    Ok(events)
}
