import { removeAccents } from "@utils";
import { IFamilyCreateInput, IPersonSearchItem } from "@interfaces";
import { invoke } from "@tauri-apps/api/tauri";
import { TauriCommand } from "@constants";

class PeopleService {
  async findPersonByName(name: string): Promise<IPersonSearchItem[]> {
    const searchName = removeAccents(name);
    return invoke(TauriCommand.FIND_PERSON_BY_NAME, { searchName });
  }

  async createFamily(data: IFamilyCreateInput): Promise<number> {
    return invoke(TauriCommand.CREATE_FAMILY, { data });
  }
}

export const peopleService = new PeopleService();
