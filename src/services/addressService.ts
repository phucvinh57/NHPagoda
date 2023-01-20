import { ProvinceDataCol } from "@constants";
import {
  IGetDistrictsQueryParams,
  IGetDistrictsRawResults,
  IGetDistrictsResults,
  IGetProvincesQueryParams,
  IGetProvincesRawResults,
  IGetProvincesResults,
  IGetWardsQueryParams,
  IGetWardsRawResults,
  IGetWardsResults
} from "@interfaces";
import axios, { Axios } from "axios";

class AddressService {
  private http: Axios;
  constructor() {
    this.http = axios.create({
      baseURL: "https://vn-public-apis.fpo.vn"
    });
  }

  async getProvinces(params?: IGetProvincesQueryParams): Promise<IGetProvincesResults[]> {
    const response = await this.http.get(
      "/provinces/getAll",
      params
        ? {
            params: {
              q: params.query,
              cols: [ProvinceDataCol.NAME_WITH_TYPE, ProvinceDataCol.CODE, ProvinceDataCol.TYPE].join(","),
              limit: params.limit ? params.limit : -1
            }
          }
        : {
            params: {
              limit: -1
            }
          }
    );
    const rawResults: IGetProvincesRawResults[] = response.data.data.data;
    return rawResults.map((item) => ({
      id: item._id,
      name: item.name_with_type,
      code: item.code,
      type: item.type
    }));
  }

  async getDistrictsByProvince(params: IGetDistrictsQueryParams): Promise<IGetDistrictsResults[]> {
    const response = await this.http.get("/districts/getByProvince", {
      params: {
        q: params.query,
        cols: [ProvinceDataCol.NAME_WITH_TYPE, ProvinceDataCol.CODE, ProvinceDataCol.TYPE].join(","),
        limit: params.limit ? params.limit : -1
      }
    });
    const rawResults: IGetDistrictsRawResults[] = response.data.data.data;
    return rawResults.map((item) => ({
      id: item._id,
      name: item.name_with_type,
      code: item.code,
      type: item.type,
      path: item.path_with_type
    }));
  }

  async getWardsByDistrict(params: IGetWardsQueryParams): Promise<IGetWardsResults[]> {
    const response = await this.http.get("/districts/getByProvince", {
      params: {
        q: params.query,
        cols: [ProvinceDataCol.NAME_WITH_TYPE, ProvinceDataCol.CODE, ProvinceDataCol.TYPE].join(","),
        limit: params.limit ? params.limit : -1
      }
    });
    const rawResults: IGetWardsRawResults[] = response.data.data.data;
    return rawResults.map((item) => ({
      id: item._id,
      name: item.name_with_type,
      code: item.code,
      type: item.type,
      path: item.path_with_type
    }));
  }
}

export const addressService = new AddressService();
