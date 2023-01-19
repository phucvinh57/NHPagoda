import { addressService } from "@services";
import { useState, useMemo } from "react";
import { useDebouncedCallback } from "use-debounce";
import { Combobox } from "@headlessui/react";

const people = [
  "Durward Reynolds",
  "Kenton Towne",
  "Therese Wunsch",
  "Benedict Kessler",
  "Katelyn Rohan",
];

export function PersonInfoPage() {
  const [selectedPerson, setSelectedPerson] = useState(people[0]);
  const [query, setQuery] = useState("");

  const filteredPeople = useMemo(() => {
    return query === ""
      ? people
      : people.filter((person) => {
          return person.toLowerCase().includes(query.toLowerCase());
        });
  }, [query]);

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
    <Combobox
      value={selectedPerson}
      onChange={(value) => {
        setSelectedPerson(value);
        debounced();
      }}
    >
      <Combobox.Input onChange={(event) => setQuery(event.target.value)} />
      <Combobox.Options>
        {filteredPeople.map((person) => (
          <Combobox.Option key={person} value={person}>
            {person}
          </Combobox.Option>
        ))}
      </Combobox.Options>
    </Combobox>
  );
}
