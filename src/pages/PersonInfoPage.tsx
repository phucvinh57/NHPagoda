import { useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import { Input } from "@material-tailwind/react";
import { FaSearch } from "react-icons/fa";
import { peopleService } from "@services";
import { IPersonSearchItem } from "@interfaces";
import { toast } from "react-toastify";
import { CreateFamilyForm, PersonSearchResult, Spinner } from "@components";
import { MIN_QUERY_LENGTH } from "@constants";

export function PersonInfoPage() {
  const [query, setQuery] = useState("");
  const [searchPersonResults, setSearchPersonResults] = useState<IPersonSearchItem[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  const debounced = useDebouncedCallback(
    () => {
      if (query.length >= MIN_QUERY_LENGTH) {
        peopleService
          .findPersonByName(query)
          .then((persons) => {
            setSearchPersonResults(persons);
            setIsSearching(false);
          })
          .catch((err: string) => {
            setIsSearching(false);
            toast.error<string>(err);
          });
      }
    },
    // delay in ms
    800,
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
              if (e.target.value.length < MIN_QUERY_LENGTH) setSearchPersonResults([]);
              else {
                setIsSearching(true);
              }
              debounced();
            }}
            value={query}
          />
        </div>
        <CreateFamilyForm />
      </div>
      <div className='pt-3'>
        {searchPersonResults.length === 0 && !isSearching ? (
          <div className='text-center mt-40 italic text-lg text-stone-600/50'>Không tìm thấy phật tử</div>
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
        <div className='flex justify-center mt-40'>
          <Spinner loading={isSearching} />
        </div>
      </div>
    </div>
  );
}
