import { AddressComponentType } from "@constants";

export interface IGetProvincesQueryParams {
  query?: string; // Query string
  page?: number; // For pagination,
  limit?: number; // Default -1 (get all items)
}

export interface IGetDistrictsQueryParams extends IGetProvincesQueryParams {
  provinceCode: number;
}

export interface IGetWardsQueryParams extends IGetProvincesQueryParams {
  districtCode: number;
}

export interface IGetProvincesRawResults {
  _id: string;
  type: AddressComponentType;
  name_with_type: string;
  code: number;
}

export interface IGetProvincesResults {
  id: string;
  type: AddressComponentType;
  name: string;
  code: number;
}

export interface IGetDistrictsRawResults extends IGetProvincesRawResults {
  path_with_type: string;
}

export interface IGetDistrictsResults extends IGetProvincesResults {
  path: string;
}

export interface IGetWardsRawResults extends IGetProvincesRawResults {
  path_with_type: string;
}

export interface IGetWardsResults extends IGetProvincesResults {
  path: string;
}
