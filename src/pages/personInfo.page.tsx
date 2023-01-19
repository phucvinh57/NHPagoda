import { useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import { Input } from "@material-tailwind/react";
import { FaSearch } from "react-icons/fa";
import { peopleService } from "@services";

export function PersonInfoPage() {
  const [query, setQuery] = useState("");
  const [content, setContent] = useState("");

  const debounced = useDebouncedCallback(
    () => {
      console.log("TEST TAURI COMMAND");
      peopleService.findPersonByName("Vinh").then((result) => setContent(result));
    },
    // delay in ms
    800,
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
