import { useDebounceValue } from "usehooks-ts";
import { List, columnCount, rowCount } from "./List";
import { PagedList, CommonSearch } from "#shared";

export const UserList = () => {
	const [debouncedSearch, setDebouncedSearch] = useDebounceValue("", 500);
	return (
		<>
			<CommonSearch
				onChange={setDebouncedSearch}
				defaultValue={debouncedSearch}
			/>
			<PagedList
				search={debouncedSearch}
				columns={columnCount}
				rows={rowCount}
				List={List}
				errorMessage="Could not fetch users."
			/>
		</>
	);
};
