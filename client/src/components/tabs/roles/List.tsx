import { api } from "#api";
import type { Role } from "#types";
import { Text } from "@radix-ui/themes";
import { CheckCircledIcon, CrossCircledIcon } from "@radix-ui/react-icons";
import { CommonTable } from "#shared";

export const columns = 4;
export const rows = 6;

export const List = () => {
	const { data } = api.roles.get(1);

	const columns = [
		{
			label: "Name",
			id: "name",
			display: (role: Role) => <Text>{role.name}</Text>,
		},
		{
			label: "Default",
			id: "default",
			display: (role: Role) =>
				role.isDefault ? (
					<CheckCircledIcon color="green" />
				) : (
					<CrossCircledIcon color="red" />
				),
		},
		{
			label: "Description",
			id: "description",
			display: (role: Role) => <Text>{role.description}</Text>,
		},
	];

	const actions = [
		{
			label: "Edit user",
			id: "edit",
		},
		{
			label: "Delete user",
			id: "delete",
		},
	];

	if (!data) return null;


	return (
		<CommonTable
			data={data}
			template={columns}
			actions={actions}
		/>
	);
}
