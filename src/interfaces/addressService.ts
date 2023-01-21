import { WardLevel } from "@constants";

export interface IRawAddress {
  Id: string;
  Name: string;
}

export interface IAddress {
  id: string;
  name: string;
}

export interface IRawWard extends IRawAddress {
  Level: WardLevel;
}

export interface IRawDistrict extends IRawAddress {
  Wards: IRawWard[];
}

export interface IRawProvince extends IRawAddress {
  Districts: IRawDistrict[];
}
