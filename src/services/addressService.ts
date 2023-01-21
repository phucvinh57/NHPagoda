import { DISTRICT_NOT_EXISTS, PROVINCE_NOT_EXISTS } from "@constants";
import { IAddress, IRawProvince } from "@interfaces";
import axios from "axios";

const VNProvincesData = await axios.get("https://raw.githubusercontent.com/kenzouno1/DiaGioiHanhChinhVN/master/data.json");
const provinces: IRawProvince[] = VNProvincesData.data;

class AddressService {
  private $provinces: IRawProvince[];

  constructor() {
    this.$provinces = provinces;
  }

  getProvinces(): IAddress[] {
    return this.$provinces.map((province) => ({ id: province.Id, name: province.Name }));
  }

  getDistricts(provinceId: string): IAddress[] {
    const province = this.$provinces.find((item) => item.Id === provinceId);
    if (!province) throw new Error(PROVINCE_NOT_EXISTS);
    return province.Districts.map((district) => ({ id: district.Id, name: district.Name }));
  }

  getWards(provinceId: string, districtId: string): IAddress[] {
    const province = this.$provinces.find((item) => item.Id === provinceId);
    if (!province) throw new Error(PROVINCE_NOT_EXISTS);
    const district = province.Districts.find((item) => item.Id === districtId);
    if (!district) throw new Error(DISTRICT_NOT_EXISTS);
    return district.Wards.map((ward) => ({ id: ward.Id, name: ward.Name }));
  }
}

export const addressService = new AddressService();
