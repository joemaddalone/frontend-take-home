import { useEffect, useState, useTransition } from "react";
import { useDebounceValue } from "usehooks-ts";
import { List, columnCount, rowCount } from "./List";
import { PagedList, CommonSearch } from "#shared";
import { Flex, Button } from "@radix-ui/themes";
import { PlusIcon } from "@radix-ui/react-icons";

export const RoleList = () => {
	const [debouncedSearch, setDebouncedSearch] = useDebounceValue("", 500);
	const [search, setSearch] = useState("");
	const [isPending, startTransition] = useTransition();

	useEffect(() => {
		startTransition(() => {
			setSearch(debouncedSearch);
		});
	}, [debouncedSearch]);

	return (
		<>
			<Flex align="center" gap="2">
				<CommonSearch
					onChange={setDebouncedSearch}
					defaultValue={debouncedSearch}
					placeholder="Search by name..."
					busy={isPending && debouncedSearch !== ""}
				/>
				<Button disabled={isPending}>
					<PlusIcon /> Add role
				</Button>
			</Flex>
			<PagedList
				search={search}
				columns={columnCount}
				rows={rowCount}
				List={List}
				errorMessage="Could not fetch roles."
			/>
		</>
	);
};
