import { CREATE_FAMILY_SUCCESS } from "@constants";
import { Button, Dialog, DialogBody, DialogFooter, DialogHeader } from "@material-tailwind/react";
import { Fragment, useState } from "react";
import { FaUserPlus } from "react-icons/fa";
import { toast } from "react-toastify";

export function CreateFamilyForm() {
  const [open, setOpen] = useState(false);
  const toggleOpen = () => setOpen(!open);
  return (
    <Fragment>
      <Button className='flex align-middle' onClick={toggleOpen}>
        Thêm hộ gia đình
        <FaUserPlus className='ml-2' size={15} />
      </Button>
      <Dialog open={open} handler={toggleOpen}>
        <DialogHeader>Its a simple dialog.</DialogHeader>
        <DialogBody divider>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Accusamus ad reprehenderit omnis perspiciatis aut odit! Unde architecto
          perspiciatis, dolorum dolorem iure quia saepe autem accusamus eum praesentium magni corrupti explicabo!
        </DialogBody>
        <DialogFooter>
          <Button variant='text' color='red' onClick={toggleOpen} className='mr-1'>
            <span>Cancel</span>
          </Button>
          <Button
            variant='gradient'
            color='green'
            onClick={() => {
              toggleOpen();
              toast.success(CREATE_FAMILY_SUCCESS);
            }}
          >
            <span>Confirm</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </Fragment>
  );
}
