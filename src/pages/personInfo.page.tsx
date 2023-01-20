import { useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import { Input } from "@material-tailwind/react";
import { FaSearch } from "react-icons/fa";
import { peopleService } from "@services";
import { PersonSearchItem } from "@interfaces";
import { toast } from "react-toastify";
// import moment from "moment";

export function PersonInfoPage() {
  const [query, setQuery] = useState("");
  const [searchPersonResults, setSearchPersonResults] = useState<PersonSearchItem[]>([]);

  const debounced = useDebouncedCallback(
    () => {
      console.log("TEST TAURI COMMAND");
      peopleService
        .findPersonByName(query)
        .then((persons) => {
          setSearchPersonResults(persons);
        })
        .catch((err: string) => toast.error<string>(err));
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
      <p>{JSON.stringify(searchPersonResults)}</p>
      {searchPersonResults.map((person) => (
        <div>
          <p>{person.firstName}</p>
          <p>{person.address}</p>
        </div>
      ))}
    </div>
  );
}
