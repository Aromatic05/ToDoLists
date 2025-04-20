use crate::storage::{self, EventMetadata};
use tauri::State;

use crate::storage::{Event, EventType, StorageState};

#[tauri::command]
pub fn get_metadata(event: Event) -> EventMetadata {
    event.metadata.clone()
}

#[tauri::command]
pub fn new_event(
    title: String,
    content: String,
    event_type: String,
    task_time: storage::TaskTime,
) -> Event {
    let metadata = EventMetadata::new();
    let event_type = match event_type.as_str() {
        "Instant" => EventType::Instant,
        "Duration" => EventType::Duration,
        _ => panic!("Invalid event type"),
    };
    Event {
        metadata,
        title,
        content,
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
pub async fn get_events(
    state: State<'_, StorageState>,
    deadline: u64,
) -> Result<Vec<Event>, String> {
    let filter = storage::TimeFilter { ddl: deadline };
    state
        .0
        .lock()
        .unwrap()
        .get_events(&filter)
        .map_err(|e| e.to_string())
}
