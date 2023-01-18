import { ProvinceDataCol } from "@types";

export interface GetProvincesQueryParams {
  q?: string; // Query string
  cols?: ProvinceDataCol[];
  page?: number; // For pagination,
  limit?: number; // Default -1 (get all items)
}
