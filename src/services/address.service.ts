import { GetProvincesQueryParams } from "@interfaces";
import axios, { Axios } from "axios";

class AddressService {
  private http: Axios;
  constructor() {
    this.http = axios.create({
      baseURL: "https://vn-public-apis.fpo.vn"
    });
  }

  async getProvinces(query: GetProvincesQueryParams) {
    const response = await this.http.get("/provinces/getAll", {
      params: { ...query, limit: query.limit ? query.limit : -1 }
    });
    return response.data.data.data;
  }
}

export const addressService = new AddressService();
