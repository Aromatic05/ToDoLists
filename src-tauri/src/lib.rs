mod dirs;
mod ipc;
mod storage;
mod aigc;

use std::sync::Mutex;
use storage::Storage;

pub fn run() -> std::io::Result<()> {
    let storage = Storage::new().expect("Failed to initialize storage");

    tauri::Builder::default()
        .manage(storage::StorageState(Mutex::new(storage)))
        .invoke_handler(tauri::generate_handler![
            ipc::new_event,
            ipc::add_event,
            ipc::delete_event,
            ipc::get_events,
            ipc::get_metadata,
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");

    Ok(())
}
