// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]
mod dto;
mod model;

use crate::dto::FamilyCreateInput;
use lazy_static::lazy_static;
use sqlite::{open, Connection, Error, State, Value};
use std::sync::Mutex;

lazy_static! {
    static ref DB: Mutex<Connection> = Mutex::new(open("../database.db").unwrap());
}

fn init_db() {
    let db = DB.lock().unwrap();
    db.execute("PRAGMA case_sensitive_like = true").unwrap();
    db.execute("PRAGMA foreign_keys = ON").unwrap();
    db.execute("PRAGMA synchronous=OFF").unwrap();
    db.execute("PRAGMA count_changes=OFF").unwrap();
    db.execute("PRAGMA journal_mode=MEMORY").unwrap();
    db.execute("PRAGMA temp_store=MEMORY").unwrap();
    db.execute(
        "CREATE TABLE IF NOT EXISTS family (
        id INTEGER    PRIMARY KEY AUTOINCREMENT,
        provinceCode  INTEGER NOT NULL,
        districtCode  INTEGER NOT NULL,
        wardCode      INTEGER NOT NULL,
        address       TEXT    NOT NULL
    )",
    )
    .unwrap();
    db.execute(
        "CREATE TABLE IF NOT EXISTS person (
        id INTEGER    PRIMARY KEY AUTOINCREMENT,
        firstName     TEXT NOT NULL,
        lastName      TEXT NOT NULL,
        religiousName TEXT,
        birthdate     INTEGER NOT NULL,
        searchName    TEXT NOT NULL,
        familyId      INTEGER NOT NULL,

        FOREIGN KEY (familyId) REFERENCES family(id) ON DELETE CASCADE 
    )",
    )
    .unwrap();
}

#[tauri::command]
fn create_family(data: FamilyCreateInput) -> Result<i64, String> {
    let db = DB.lock().unwrap();
    let mut family_id: i64 = 0;

    let do_steps = || -> Result<(), Error> {
        db.execute("BEGIN TRANSACTION").unwrap();
        let create_family_query = "INSERT INTO family (provinceCode, districtCode, wardCode, address) VALUES (:pc, :dc, :wc, :addr)";
        let mut create_family_statement = db.prepare(create_family_query)?;

        create_family_statement.bind(
            &[
                (":pc", Value::Integer(data.province_code)),
                (":dc", Value::Integer(data.district_code)),
                (":wc", Value::Integer(data.ward_code)),
                (":addr", Value::String(data.address)),
            ][..],
        )?;

        while let Ok(State::Row) = create_family_statement.next() {}

        let get_family_id_query = "SELECT last_insert_rowid()";

        db.iterate(get_family_id_query, |pairs| {
            for &(name, value) in pairs.iter() {
                println!("{} = {}", name, value.unwrap());
                family_id = value.unwrap().parse::<i64>().unwrap();
            }
            true
        })?;

        for person in data.persons {
            let create_person_query = "
            INSERT INTO person (firstName, lastName, religiousName, birthdate, searchName, familyId)
            VALUES (:fn, :ln, :rn, :b, :sn, :fid)
        ";
            let mut create_person_statement = db.prepare(create_person_query).unwrap();

            let religious_name = {
                match person.religious_name {
                    Some(value) => Value::String(value),
                    None => Value::Null,
                }
            };
            create_person_statement.bind(
                &[
                    (":fn", Value::String(person.first_name)),
                    (":ln", Value::String(person.last_name)),
                    (":rn", religious_name),
                    (":b", Value::Integer(person.birthdate)),
                    (":sn", Value::String(person.search_name)),
                    (":fid", Value::Integer(family_id)),
                ][..],
            )?;
            while let Ok(State::Row) = create_person_statement.next() {}
        }
        db.execute("COMMIT")?;
        Ok(())
    };

    if let Err(_err) = do_steps() {
        db.execute("ROLLBACK TRANSACTION").unwrap();
        return Err("Thao tác thất bại".into());
    }
    Ok(family_id)
}

#[tauri::command]
fn find_person_by_name(search_name: String) -> Result<String, String> {
    println!("{}", search_name);
    Ok("Nguyễn Phúc Vinh".into())
}

fn main() {
    init_db();

    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![create_family, find_person_by_name])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
