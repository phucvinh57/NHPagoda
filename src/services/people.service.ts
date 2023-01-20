import { removeAccents } from "@utils";
import { FamilyCreateInput } from "@interfaces";
import { invoke } from "@tauri-apps/api/tauri";
import { TauriCommand } from "@constants";

class PeopleService {
  async findPersonByName(name: string): Promise<string> {
    const searchName = removeAccents(name);
    return invoke(TauriCommand.FIND_PERSON_BY_NAME, { searchName });
  }

  // async findPersonByName(name: string): Promise<PersonModel[]> {
  //   const searchName = removeAccents(name);
  //   const persons: PersonModel[] = await this.query(
  //     `
  //     SELECT
  //       person.firstName AS firstName,
  //       person.lastName AS lastName,
  //       family.address AS address
  //     FROM person JOIN falimy ON person.familyId = family.id
  //     WHERE searchName LIKE '%?%'
  //   `,
  //     [searchName]
  //   );
  //   return persons;
  // }

  async createFamily(data: FamilyCreateInput): Promise<number> {
    return invoke(TauriCommand.CREATE_FAMILY, { data });
  }
}

export const peopleService = new PeopleService();
