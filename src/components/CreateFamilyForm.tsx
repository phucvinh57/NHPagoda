import { CREATE_FAMILY_INVALID_INPUT, CREATE_FAMILY_SUCCESS } from "@constants";
import { familyCreateInput, IAddress, IFamilyCreateInput } from "@interfaces";
import { Button, Dialog, DialogBody, Input, Option, Select } from "@material-tailwind/react";
import { addressService } from "@services";
import React, { Fragment, useEffect, useState } from "react";
import { FaUserPlus } from "react-icons/fa";
import { toast } from "react-toastify";

export function CreateFamilyForm() {
  const [open, setOpen] = useState(false);
  const toggleOpen = () => setOpen(!open);

  const [provinces, setProvinces] = useState<IAddress[]>([]);
  const [districts, setDistricts] = useState<IAddress[]>([]);
  const [wards, setWards] = useState<IAddress[]>([]);

  const [formInput, setFormInput] = useState<IFamilyCreateInput>({
    provinceId: "",
    districtId: "",
    wardId: "",
    address: "",
    persons: []
  });

  const [address, setAddress] = useState<{ province: string; district: string; ward: string }>({
    province: "",
    district: "",
    ward: ""
  });

  useEffect(() => {
    setFormInput({ ...formInput, address: [address.ward, address.district, address.province].join(", ") });
  }, [address]);

  useEffect(() => {
    setProvinces(addressService.getProvinces());
  }, []);

  const handleSubmitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    familyCreateInput.isValid(formInput).then((value) => {
      value ? toast.success(CREATE_FAMILY_SUCCESS) : toast.warn(CREATE_FAMILY_INVALID_INPUT);
    });
    setOpen(false);
  };

  return (
    <Fragment>
      <Button className='flex align-middle' onClick={toggleOpen}>
        Thêm hộ gia đình
        <FaUserPlus className='ml-2' size={15} />
      </Button>

      <Dialog open={open} handler={toggleOpen} className='divide-y-2 divide-black-600' size='xl'>
        <DialogBody className='pt-8'>
          <form onSubmit={handleSubmitForm}>
            <div className='mb-7'>
              <Select
                key='province'
                label='Tỉnh/Thành phố'
                variant='static'
                onChange={(value) => {
                  if (value) {
                    const province = provinces.find((item) => item.id === value);
                    if (province) {
                      setFormInput({
                        ...formInput,
                        provinceId: province.id
                      });
                      setDistricts(addressService.getDistricts(province.id));
                      setAddress({ ...address, province: province.name });
                      setWards([]);
                    }
                  }
                }}
              >
                {provinces.map((province) => (
                  <Option value={province.id} key={province.id}>
                    {province.name}
                  </Option>
                ))}
              </Select>
            </div>
            <div className='mb-7'>
              <Select
                key='district'
                label='Quận/Huyện'
                variant='static'
                onChange={(value) => {
                  const district = districts.find((item) => item.id === value);
                  if (district) {
                    setFormInput({ ...formInput, districtId: district.id });
                    setWards(addressService.getWards(formInput.provinceId, district.id));
                    setAddress({ ...address, district: district.name });
                  }
                }}
              >
                {districts.map((district) => (
                  <Option value={district.id} key={district.id}>
                    {district.name}
                  </Option>
                ))}
              </Select>
            </div>
            <div className='mb-7'>
              <Select
                key='ward'
                label='Thôn/Xã'
                variant='static'
                onChange={(value) => {
                  if (value) {
                    const ward = wards.find((item) => item.id === value);
                    if (ward) {
                      setFormInput({ ...formInput, wardId: ward.id });
                      setAddress({ ...address, ward: ward.name });
                    }
                  }
                }}
              >
                {wards.map((ward) => (
                  <Option value={ward.id} key={ward.id}>
                    {ward.name}
                  </Option>
                ))}
              </Select>
            </div>

            <div className='mb-7'>
              <Input
                label='Địa chỉ'
                required
                variant='static'
                value={formInput.address}
                onChange={(e) => {
                  setFormInput({ ...formInput, address: e.target.value });
                  console.log(formInput);
                }}
              />
            </div>

            <Button variant='gradient' color='green' type='submit'>
              Tạo
            </Button>
          </form>
        </DialogBody>
      </Dialog>
    </Fragment>
  );
}
