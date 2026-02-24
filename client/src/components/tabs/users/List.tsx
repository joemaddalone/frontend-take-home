import { api, useRolesLookup } from "#api";
import type { User } from "#types";
import { Text } from "@radix-ui/themes";
import { UserCell } from "./UserCell";
import { CommonTable, TableAlert } from "#shared";
import { formatDate } from "#utils";

export const columnCount = 4;
export const rowCount = 10;

export const List = ({ search }: { search: string }) => {
	const { data } = api.users.get(1, search);
	const rolesLookup = useRolesLookup();

	if (!data || data.data.length === 0) {
		if (search === "") {
			return (
				<TableAlert
					columns={columnCount}
					rows={rowCount}
					message={`No users have joined yet`}
				/>
			);
		}
		return (
			<TableAlert
				columns={columnCount}
				rows={rowCount}
				message={`No results for "${search}"`}
			/>
		);
	}

	const columns = [
		{
			label: "User",
			id: "user",
			width: "301px",
			display: (user: User) => <UserCell user={user} />,
		},
		{
			label: "Role",
			id: "role",
			width: "277px",
			display: (user: User) => (
				<Text>{rolesLookup[user.roleId]?.name || "Unknown"}</Text>
			),
		},
		{
			label: "Joined",
			id: "joined",
			width: "236px",
			display: (user: User) => <Text>{formatDate(user.createdAt)}</Text>,
		},
	];

	const actions = [
		{
			label: "Delete",
			id: "delete",
		},
	];

	return <CommonTable data={data} template={columns} actions={actions} />;
};
