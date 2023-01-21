import { DISTRICT_NOT_EXISTS, PROVINCE_NOT_EXISTS } from "@constants";
import { IAddress, IRawProvince } from "@interfaces";
import axios from "axios";

class AddressService {
  private $provinces: IRawProvince[] | null = null;

  private async $init(): Promise<IRawProvince[]> {
    const response = await axios.get("https://raw.githubusercontent.com/kenzouno1/DiaGioiHanhChinhVN/master/data.json");
    return response.data;
  }

  async getProvinces(): Promise<IAddress[]> {
    if (!this.$provinces) this.$provinces = await this.$init();
    return this.$provinces.map((province) => ({ id: province.Id, name: province.Name }));
  }

  async getDistricts(provinceName: string): Promise<IAddress[]> {
    if (!this.$provinces) this.$provinces = await this.$init();
    const province = this.$provinces.find((item) => item.Name === provinceName);
    if (!province) throw new Error(PROVINCE_NOT_EXISTS);
    return province.Districts.map((district) => ({ id: district.Id, name: district.Name }));
  }
  async getWards(provinceName: string, districtName: string): Promise<IAddress[]> {
    if (!this.$provinces) this.$provinces = await this.$init();
    const province = this.$provinces.find((item) => item.Name === provinceName);
    if (!province) throw new Error(PROVINCE_NOT_EXISTS);
    const district = province.Districts.find((item) => item.Name === districtName);
    if (!district) throw new Error(DISTRICT_NOT_EXISTS);
    return district.Wards.map((ward) => ({ id: ward.Id, name: ward.Name }));
  }
}

export const addressService = new AddressService();
