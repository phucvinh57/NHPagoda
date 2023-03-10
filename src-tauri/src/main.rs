// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]
mod dto;
mod model;

use crate::dto::FamilyCreateInput;
use lazy_static::lazy_static;
use model::PersonModel;
use sqlite::{open, Connection, Error, State, Value};
use std::sync::Mutex;

lazy_static! {
    static ref DB: Mutex<Connection> = Mutex::new(open("../database.db").unwrap());
}

static ERR_MESSAGE: &str = "Thao tác thất bại !";

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
        provinceId    TEXT NOT NULL,
        districtId    TEXT NOT NULL,
        wardId        TEXT NOT NULL,
        address       TEXT NOT NULL
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

    let transaction = || -> Result<(), Error> {
        db.execute("BEGIN TRANSACTION").unwrap();
        let create_family_query = "INSERT INTO family (provinceId, districtId, wardId, address) VALUES (:pc, :dc, :wc, :addr)";
        let mut create_family_statement = db.prepare(create_family_query)?;

        create_family_statement.bind(
            &[
                (":pc", Value::String(data.province_id)),
                (":dc", Value::String(data.district_id)),
                (":wc", Value::String(data.ward_id)),
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

    if let Err(_err) = transaction() {
        db.execute("ROLLBACK TRANSACTION").unwrap();
        return Err(ERR_MESSAGE.into());
    }
    Ok(family_id)
}

#[tauri::command]
fn find_person_by_name(search_name: String) -> Result<Vec<PersonModel>, String> {
    let db = DB.lock().unwrap();
    let query = "
        SELECT
            person.id AS id,
            person.firstName AS first_name,
            person.lastName AS last_name,
            family.address AS address,
            family.id AS family_id
        FROM person JOIN family ON person.familyId = family.id
        WHERE person.searchName LIKE ?
    ";

    let transaction = || -> Result<Vec<PersonModel>, Error> {
        let mut stmt = db.prepare(query)?;
        stmt.bind((1, Value::String(format!("%{}%", search_name))))?;

        let mut persons: Vec<PersonModel> = Vec::new();
        while let Ok(State::Row) = stmt.next() {
            let mut person = PersonModel::new();
            person.set_id(stmt.read::<i64, _>("id").unwrap());
            person.set_first_name(stmt.read::<String, _>("first_name").unwrap());
            person.set_last_name(stmt.read::<String, _>("last_name").unwrap());
            person.set_address(stmt.read::<String, _>("address").unwrap());
            person.set_family_id(stmt.read::<i64, _>("family_id").unwrap());

            persons.push(person);
        }
        Ok(persons)
    };

    match transaction() {
        Ok(persons) => Ok(persons),
        Err(err) => {
            println!("{:?}", err);
            Err(ERR_MESSAGE.into())
        }
    }
}

fn main() {
    init_db();

    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![create_family, find_person_by_name])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
