import { api } from "#api";
import type { User } from "#types";
import { Text } from "@radix-ui/themes";
import { UserCell } from "./UserCell";
import { CommonTable } from "#shared";
import { formatDate } from "#utils";


export const columns = 4;
export const rows = 10;

export const List = ({ search }: { search: string; }) => {
	const { data } = api.users.get(1, search);

	if (!data) return null;

	const columns = [
		{
			label: "User",
			id: "user",
			width: "301px",
			display: (user: User) => <UserCell user={user} />,
		},
		{
			label: "Group",
			id: "group",
			width: "277px",
			display: (user: User) => (
				<Text>{user.roleId}</Text>
			),
		},
		{
			label: "Joined",
			id: "joined",
			width: "236px",
			display: (user: User) => (
				<Text>{formatDate(user.createdAt)}</Text>
			),
		},
	];

	const actions = [
		{
			label: "Delete",
			id: "delete",
		},
	];


	return (
		<CommonTable
			data={data}
			template={columns}
			actions={actions}
		/>
	);
};
