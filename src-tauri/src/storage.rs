use crate::dirs;

fn get_storage_dir() -> String {
    let mut storage_dir = dirs::home_dir().unwrap();
    storage_dir.push(".todolists");
    storage_dir.to_str().unwrap().to_string()
}