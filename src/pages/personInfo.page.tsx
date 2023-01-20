import { useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import { Input } from "@material-tailwind/react";
import { FaSearch } from "react-icons/fa";
import { peopleService } from "@services";
import moment from "moment";

export function PersonInfoPage() {
  const [query, setQuery] = useState("");
  const [content, setContent] = useState("");

  const debounced = useDebouncedCallback(
    () => {
      console.log("TEST TAURI COMMAND");
      peopleService
        .createFamily({
          provinceCode: 62,
          districtCode: 611,
          wardCode: 23377,
          address: "Thôn 7",
          persons: [
            {
              firstName: "Vinh",
              lastName: "Nguyễn Phúc",
              birthdate: moment().unix(),
              searchName: "vinhnguyenphuc"
            }
          ]
        })
        .then((familyId) => setContent("Family ID:" + familyId))
        .catch((err) => setContent(err));
    },
    // delay in ms
    1000,
    { maxWait: 3000 }
  );

  return (
    <div className='px-5 py-4'>
      <div className='bg-white rounded'>
        <Input
          label='Tìm kiếm theo tên ...'
          icon={<FaSearch />}
          onChange={(e) => {
            setQuery(e.target.value);
            debounced();
          }}
          value={query}
        />
      </div>
      <p>{content}</p>
    </div>
  );
}
