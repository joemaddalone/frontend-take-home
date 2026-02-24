import { useDebounceValue } from "usehooks-ts";
import { List, columnCount, rowCount } from "./List";
import { PagedList, CommonSearch } from "#shared";

export const RoleList = () => {
	const [debouncedSearch, setDebouncedSearch] = useDebounceValue("", 500);
	return (
		<>
			<CommonSearch
				onChange={setDebouncedSearch}
				defaultValue={debouncedSearch}
				placeholder="Search by name or description..."

			/>
			<PagedList
				search={debouncedSearch}
				columns={columnCount}
				rows={rowCount}
				List={List}
				errorMessage="Could not fetch roles."
			/>
		</>
	);
};
