import { removeAccents } from "@utils";
import util from "util";
import * as sqlite3 from "sqlite3";
import { FamilyCreateInput, PersonModel } from "@interfaces";

class PeopleService {
  private db: sqlite3.Database;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private query: (statement: string, params?: any[]) => Promise<any>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private run: (statement: string, params?: any[]) => Promise<any>;

  constructor() {
    const sqlite = sqlite3.verbose();
    this.db = new sqlite.Database(process.cwd() + "database.sql");
    this.db.serialize(() => {
      this.db.run("PRAGMA case_sensitive_like = true");
      this.db.run("PRAGMA foreign_keys = ON");

      this.db.run(`CREATE TABLE family IF NOT EXISTS (
        id INTEGER    PRIMARY KEY AUTO_INCREMENT,
        provinceCode  INTEGER NOT NULL,
        districtCode  INTEGER NOT NULL,
        wardCode      INTEGER NOT NULL,
        address       TEXT    NOT NULL
      )`);
      this.db.run(`CREATE TABLE person IF NOT EXISTS (
        id INTEGER    PRIMARY KEY AUTO_INCREMENT,
        firstName     TEXT NOT NULL,
        lastName      TEXT NOT NULL,
        religiousName TEXT,
        birthdate     INTEGER NOT NULL,
        searchName    TEXT NOT NULL,
        familyId      INTEGER NOT NULL,

        FOREIGN KEY (familyId) REFERENCES family(id) ON DELETE CASCADE
      )`);
    });
    this.query = util.promisify(this.db.all.bind(this.db));
    this.run = util.promisify(this.db.run.bind(this.db));
  }

  async findPersonByName(name: string): Promise<PersonModel[]> {
    const searchName = removeAccents(name);
    const persons: PersonModel[] = await this.query(
      `
      SELECT 
        person.firstName AS firstName,
        person.lastName AS lastName,
        family.address AS address
      FROM person JOIN falimy ON person.familyId = family.id
      WHERE searchName LIKE '%?%'
    `,
      [searchName]
    );
    return persons;
  }

  async createFamily(data: FamilyCreateInput): Promise<number> {
    if (data.persons.length === 0) throw new Error("Empty family members !");
    try {
      await this.run(`BEGIN TRANSACTION`);
      await this.run(
        `
        INSERT INTO family (provinceCode, districtCode, wardCode, address) 
        VALUES (?, ?, ?, ?)
      `,
        [data.provinceCode, data.districtCode, data.wardCode, data.address]
      );
      const familyId: number = await this.query("last_insert_rowid()");
      for (const person of data.persons) {
        await this.run(
          `
          INSERT INTO person (firstName, lastName, religiousName, birthdate, searchName, familyId)
          VALUES (?, ?, ?, ?, ?, ?)
        `,
          [
            person.firstName,
            person.lastName,
            person.religiousName ? person.religiousName : null,
            person.birthdate,
            removeAccents(person.firstName + person.lastName),
            familyId
          ]
        );
      }
      await this.run(`COMMIT`);
      return familyId;
    } catch (err) {
      console.log(JSON.stringify(err, null, 4));
      await this.run("ROLLBACK TRANSACTION");
      throw err;
    }
  }
}

export const peopleService = new PeopleService();
