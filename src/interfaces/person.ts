export interface PersonModel {
  id: number;
  firstName: string;
  lastName: string;
  religiousName: string;
  birthdate: number;
  searchName: string;
}

export interface PersonCreateInput {
  firstName: string;
  lastName: string;
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
  members?: PersonModel[];
}
