import { List, columns, rows } from "./List";
import { PagedList } from "#shared";

export const UserList = () => (
	<PagedList
		columns={columns}
		rows={rows}
		List={List}
		errorMessage="Could not fetch users."
	/>
);
