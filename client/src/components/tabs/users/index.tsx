import { useDebounceValue } from "usehooks-ts";
import { List, columns, rows } from "./List";
import { PagedList, CommonSearch } from "#shared";

export const UserList = () => {
	const [debouncedSearch, setDebouncedSearch] = useDebounceValue("", 500);
	return (
		<>
			<CommonSearch onChange={setDebouncedSearch} defaultValue={debouncedSearch} />
			<PagedList
				search={debouncedSearch}
				columns={columns}
				rows={rows}
				List={List}
				errorMessage="Could not fetch users."
			/>
		</>
	);
};
