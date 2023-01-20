import { removeAccents } from "@utils";
import { FamilyCreateInput, PersonSearchItem } from "@interfaces";
import { invoke } from "@tauri-apps/api/tauri";
import { TauriCommand } from "@constants";

class PeopleService {
  async findPersonByName(name: string): Promise<PersonSearchItem[]> {
    const searchName = removeAccents(name);
    return invoke(TauriCommand.FIND_PERSON_BY_NAME, { searchName });
  }

  async createFamily(data: FamilyCreateInput): Promise<number> {
    return invoke(TauriCommand.CREATE_FAMILY, { data });
  }
}

export const peopleService = new PeopleService();
