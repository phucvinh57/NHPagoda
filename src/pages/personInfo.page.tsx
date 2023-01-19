import { addressService } from "@services";
import { useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import { Input } from "@material-tailwind/react";
import { FaSearch } from "react-icons/fa";

export function PersonInfoPage() {
  const [query, setQuery] = useState("");

  const debounced = useDebouncedCallback(
    // function
    () => {
      console.log("GET PROVINCES");
      addressService.getProvinces().then((data) => {
        console.log(data);
      });
    },
    // delay in ms
    800,
    { maxWait: 3000 }
  );

  return (
    <div className='px-5 py-4'>
      <Input
        label='Tìm kiếm theo tên ...'
        icon={<FaSearch />}
        onChange={(e) => {
          setQuery(e.target.value);
          debounced();
        }}
        value={query}
      />
      ;
    </div>
  );
}
