import { api } from "#api";
import type { Role } from "#types";
import { Text } from "@radix-ui/themes";
import { CheckCircledIcon, CrossCircledIcon } from "@radix-ui/react-icons";
import { CommonTable, TableAlert } from "#shared";
import { Edit } from "./Edit";
import { useState } from "react";

export const columnCount = 4;
export const rowCount = 6;

export const List = ({ search }: { search: string }) => {
	const [editingRole, setEditingRole] = useState<Role | null>(null);
	const { data } = api.roles.get(1, search);

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
			label: "Name",
			id: "name",
			width: "301px",
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
			label: "Edit",
			id: "edit",
			actionFn: (role: Role) => {
				setEditingRole(role);
			},
		},
		{
			label: "Delete role",
			id: "delete",
			actionFn: (role: Role) => {
				console.log("delete", role);
			},
		},
	];

	return (
		<>
			<CommonTable data={data} template={columns} actions={actions} />
			<Edit
				role={editingRole}
				open={editingRole !== null}
				onOpenChange={() => setEditingRole(null)}
				title="Edit Role"
			/>
		</>
	);
};
