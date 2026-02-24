import { useDebounceValue } from "usehooks-ts";
import { List, columnCount, rowCount } from "./List";
import { PagedList, CommonSearch } from "#shared";
import { Flex, Button } from "@radix-ui/themes";
import { PlusIcon } from "@radix-ui/react-icons";

export const UserList = () => {
  const [debouncedSearch, setDebouncedSearch] = useDebounceValue("", 500);
  return (
    <PagedList
      search={debouncedSearch}
      columns={columnCount}
      rows={rowCount}
      List={List}
      errorMessage="Could not fetch users."
    >
      <Flex align="center" gap="2">
        <CommonSearch
          onChange={setDebouncedSearch}
          defaultValue={debouncedSearch}
          placeholder="Search by name..."
        />
        <Button>
          <PlusIcon /> Add user
        </Button>
      </Flex>
    </PagedList>
  );
};
