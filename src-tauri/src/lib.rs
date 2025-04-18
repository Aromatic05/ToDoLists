mod dirs;
mod storage;

use crate::storage::{Event, Storage, TimeFilter};
use std::sync::Mutex;
use tauri::State;

struct StorageState(Mutex<Storage>);

#[tauri::command]
async fn add_event(state: State<'_, StorageState>, event: Event) -> Result<(), String> {
    state
        .0
        .lock()
        .unwrap()
        .add_event(event)
        .map_err(|e| e.to_string())
}

#[tauri::command]
async fn delete_event(state: State<'_, StorageState>, uuid: String) -> Result<(), String> {
    state
        .0
        .lock()
        .unwrap()
        .delete_event(&uuid)
        .map_err(|e| e.to_string())
}

#[tauri::command]
async fn get_events(state: State<'_, StorageState>, deadline: u64) -> Result<Vec<Event>, String> {
    let filter = TimeFilter { ddl: deadline };
    state
        .0
        .lock()
        .unwrap()
        .get_events(&filter)
        .map_err(|e| e.to_string())
}

pub fn run() -> std::io::Result<()> {
    let storage = Storage::new().expect("Failed to initialize storage");

    tauri::Builder::default()
        .manage(StorageState(Mutex::new(storage)))
        .invoke_handler(tauri::generate_handler![
            add_event,
            delete_event,
            get_events,
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");

    Ok(())
}
