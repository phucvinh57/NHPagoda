import { useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import { Input } from "@material-tailwind/react";
import { FaSearch } from "react-icons/fa";
import { peopleService } from "@services";
import { PersonSearchItem } from "@interfaces";
import { toast } from "react-toastify";
import { CreateFamilyForm, PersonSearchResult } from "@components";
import { MIN_QUERY_LENGTH } from "@constants";

export function PersonInfoPage() {
  const [query, setQuery] = useState("");
  const [searchPersonResults, setSearchPersonResults] = useState<PersonSearchItem[]>([]);

  const debounced = useDebouncedCallback(
    () => {
      console.log("TEST TAURI COMMAND");
      if (query.length >= MIN_QUERY_LENGTH)
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
    <div className='px-5 py-4 divide-y-2 divide-blue-600'>
      <div className='mb-3 flex justify-between'>
        <div className='bg-white rounded grow mr-3'>
          <Input
            label='Tìm kiếm theo tên ...'
            icon={<FaSearch />}
            onChange={(e) => {
              setQuery(e.target.value);
              if (e.target.value.length === 0) setSearchPersonResults([]);
              debounced();
            }}
            value={query}
          />
        </div>
        <CreateFamilyForm />
      </div>

      <div className='pt-3'>
        {searchPersonResults.length === 0 ? (
          <div className='text-center mt-40 italic text-lg text-stone-600/50'>Kết quả tìm kiếm ...</div>
        ) : (
          searchPersonResults.map((person) => (
            <PersonSearchResult
              key={person.id}
              name={person.firstName + " " + person.lastName}
              address={person.address}
              religiousName={person.religiousName}
              familyId={person.familyId}
            />
          ))
        )}
      </div>
    </div>
  );
}
