use async_std::path::PathBuf;

use crate::dirs;
use crate::storage;

#[tauri::command]
pub fn get_config_dir() -> PathBuf {
    dirs::app_config_dir()
        .unwrap_or_else(|_| PathBuf::from("config"))
        .to_str()
        .unwrap_or("config")
        .to_string()
        .into()
}