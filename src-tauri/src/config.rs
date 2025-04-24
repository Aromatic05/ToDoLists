use anyhow::Result;
use fs;
use serde::{Deserialize, Serialize};
use toml;

#[derive(Deserialize)]
#[allow(dead_code)]
struct Theme {
    color: String,
}
#[derive(Deserialize)]
#[allow(dead_code)]
struct Model {
    switch: bool,
    name: String,
    tokens: String,
}
#[derive(Deserialize)]
#[allow(dead_code)]
struct Info {
    switch: bool,
    time: Option<Vec<String>>,
}
#[derive(Deserialize)]
#[allow(dead_code)]
struct Config {
    theme: Theme,
    info: Info,
    model: Model,
}

fn parse() {
    let config_path = tauri::
        .unwrap()
        .join("todolist.toml");
    let config_str = fs::read_to_string(config_path).unwrap();
    let config: Config = toml::from_str(&config_str).unwrap();
    println!("{:?}", config);
}
