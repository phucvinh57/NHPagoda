export interface PersonSearchItem {
  id: number;
  firstName: string;
  lastName: string;
  religiousName?: string;
  address: string;
  familyId: number;
}

export interface PersonCreateInput {
  firstName: string;
  lastName: string;
  searchName: string;
  religiousName?: string;
  birthdate: number;
}

export interface PersonUpdateInput {
  data: {
    firstName?: string;
    lastName?: string;
    religiousName?: string;
    birthdate?: number;
  };
  id: number;
}

export interface FamilyCreateInput {
  provinceCode: number;
  districtCode: number;
  wardCode: number;
  address: string;
  persons: PersonCreateInput[];
}

export interface FamilyModel {
  id: number;
  provinceCode: number;
  districtCode: number;
  wardCode: number;
  address: string;
  members?: PersonSearchItem[];
}
