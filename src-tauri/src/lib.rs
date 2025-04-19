mod dirs;
mod storage;
mod ipc;

use storage::Storage;
use std::sync::Mutex; 

pub fn run() -> std::io::Result<()> {
    let storage = Storage::new().expect("Failed to initialize storage");

    tauri::Builder::default()
        .manage(storage::StorageState(Mutex::new(storage)))
        .invoke_handler(tauri::generate_handler![
            ipc::new_event,
            ipc::add_event,
            ipc::delete_event,
            ipc::get_events,
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");

    Ok(())
}
