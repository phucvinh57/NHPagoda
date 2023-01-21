import * as yup from "yup";

export interface IPersonSearchItem {
  id: number;
  firstName: string;
  lastName: string;
  religiousName?: string;
  address: string;
  familyId: number;
}

export interface IPersonCreateInput {
  firstName: string;
  lastName: string;
  searchName: string;
  religiousName?: string;
  birthdate: number;
}

export const personCreateInput = yup
  .object({
    firstName: yup.string().required(),
    lastName: yup.string().required(),
    searchName: yup.string().required(),
    religiousName: yup.string().optional(),
    birthdate: yup.number().required()
  })
  .required();

export interface IFamilyCreateInput {
  provinceId: string;
  districtId: string;
  wardId: string;
  address: string;
  persons: IPersonCreateInput[];
}

export const familyCreateInput = yup
  .object({
    provinceId: yup.string().required(),
    districtId: yup.string().required(),
    wardId: yup.string().required(),
    address: yup.string().required(),
    persons: yup.array(personCreateInput).required()
  })
  .required();
