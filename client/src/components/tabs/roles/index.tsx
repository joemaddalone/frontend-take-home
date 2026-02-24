import { List, columns, rows } from "./List";
import { PagedList } from "#shared";

export const RoleList = () => (
	<PagedList
		columns={columns}
		rows={rows}
		List={List}
		errorMessage="Could not fetch users."
	/>
);
