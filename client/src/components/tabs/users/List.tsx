import { useState } from "react";
import { api, useRolesLookup } from "#api";
import type { User } from "#types";
import { Text, Strong } from "@radix-ui/themes";
import { UserCell } from "./UserCell";
import { CommonTable, TableAlert, ConfirmDialog } from "#shared";
import { formatDate } from "#utils";

export const columnCount = 4;
export const rowCount = 10;

export const List = ({ search }: { search: string }) => {
	const [deletingUser, setDeletingUser] = useState<User | null>(null);
	const [dialogBusy, setDialogBusy] = useState(false);
	const [operationError, setOperationError] = useState<string | undefined>(
		undefined,
	);
	const { data } = api.users.get(1, search);
	const rolesLookup = useRolesLookup();

	const confirmDelete = async () => {
		if (deletingUser) {
			setDialogBusy(true);
			try {
				await api.users.remove(deletingUser.id);
				setDialogBusy(() => false);
				setDeletingUser(() => null);
			} catch (_err) {
				setOperationError("Failed to delete user");
				setDialogBusy(() => false);
			}
		}
	};

	const userName = (user?: User) => {
		return user ? `${user.first} ${user.last}` : "Unknown User";
	};

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
			label: "Edit User",
			id: "edit",
			actionFn: (user: User) => {
				console.log(user);
			},
		},
		{
			label: "Delete User",
			id: "delete",
			actionFn: (user: User) => {
				setDeletingUser(user);
				setOperationError(undefined);
			},
		},
	];

	return (
		<>
			<CommonTable data={data} template={columns} actions={actions} />
			<ConfirmDialog
				loading={dialogBusy}
				open={deletingUser !== null}
				onOpenChange={() => setDeletingUser(null)}
				onConfirm={confirmDelete}
				error={operationError}
				title="Delete User"
				actionLabel="Delete User"
			>
				<Text>
					Are you sure? The user{" "}
					<Strong>{userName(deletingUser ?? undefined)}</Strong> will be
					permanently deleted.
				</Text>
			</ConfirmDialog>
		</>
	);
};
