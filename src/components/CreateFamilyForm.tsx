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
        <DialogBody className='pt-7'>
          <form onSubmit={handleSubmitForm}>
            <div className='mb-7 flex'>
              <Select>
                <Option>CLMN</Option>
                <Option>DCM WTF ?</Option>
              </Select>
            </div>
            <div className='mb-7 flex'>
              <Select
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
                      setWards([]);
                    }
                  }
                }}
                value={formInput.provinceId}
              >
                {provinces.map((province) => (
                  <Option value={province.id} key={province.id}>
                    {province.name}
                  </Option>
                ))}
              </Select>
            </div>
            <div className='mb-7 flex'>
              <Select
                label='Quận/Huyện'
                variant='static'
                onChange={(value) => {
                  const district = districts.find((item) => item.id === value);
                  if (district) {
                    setFormInput({ ...formInput, districtId: district.id });
                    setWards(addressService.getWards(formInput.provinceId, district.id));
                  }
                }}
                value={formInput.districtId}
              >
                {districts.map((district) => (
                  <Option value={district.id} key={district.id}>
                    {district.name}
                  </Option>
                ))}
              </Select>
            </div>
            <div className='mb-7 flex'>
              <Select
                label='Thôn/Xã'
                variant='static'
                onChange={(value) => {
                  if (value) {
                    const ward = wards.find((item) => item.id === value);
                    if (ward) setFormInput({ ...formInput, wardId: ward.id });
                  }
                }}
                value={formInput.wardId}
              >
                {wards.map((ward) => (
                  <Option value={ward.id} key={ward.id}>
                    {ward.name}
                  </Option>
                ))}
              </Select>
            </div>

            <div>
              <Input
                label='Địa chỉ'
                required
                variant='static'
                value={formInput.address}
                onChange={(e) => setFormInput({ ...formInput, address: e.target.value })}
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
