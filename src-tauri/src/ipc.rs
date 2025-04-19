use crate::storage;
use chrono::Utc;
use tauri::State;
use uuid::Uuid;

use crate::storage::{Event, EventType, StorageState};

#[tauri::command]
pub fn new_event(
    title: String,
    content: String,
    event_type: String,
    task_time: storage::TaskTime,
) -> Event {
    let uuid = Uuid::new_v4().to_string();
    let event_type = match event_type.as_str() {
        "Instant" => EventType::Instant,
        "Duration" => EventType::Duration,
        _ => panic!("Invalid event type"),
    };
    let timestamp = Utc::now().timestamp_millis() as u64;
    Event {
        uuid,
        title,
        content,
        timestamp,
        event_type,
        task_time,
    }
}

#[tauri::command]
pub async fn add_event(state: State<'_, StorageState>, event: Event) -> Result<(), String> {
    state
        .0
        .lock()
        .unwrap()
        .add_event(event)
        .map_err(|e| e.to_string())
}

#[tauri::command]
pub async fn delete_event(state: State<'_, StorageState>, uuid: String) -> Result<(), String> {
    state
        .0
        .lock()
        .unwrap()
        .delete_event(&uuid)
        .map_err(|e| e.to_string())
}

#[tauri::command]
pub async fn get_events(state: State<'_, StorageState>, deadline: u64) -> Result<Vec<Event>, String> {
    let filter = storage::TimeFilter { ddl: deadline };
    state
        .0
        .lock()
        .unwrap()
        .get_events(&filter)
        .map_err(|e| e.to_string())
}
