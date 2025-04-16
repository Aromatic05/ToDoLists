use tauri::path;
use tauri::path::PathResolver;
use std::fs::File;

fn init_app_data_dir() -> std::io::Result<()> {
    let app_data_dir = PathResolver::app_data_dir();
}

fn get_storage_dir() -> String {
    let mut storage_dir = path::appdata_dir();
    storage_dir.push(".todolists");
    storage_dir.to_str().unwrap().to_string()
}