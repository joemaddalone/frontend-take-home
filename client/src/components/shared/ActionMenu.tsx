import { DropdownMenu, IconButton } from "@radix-ui/themes";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";

interface Action<T> {
	label: string;
	id: string;
	actionFn: (value: T) => void;
}

interface CommonTableActionProps<T> {
	item: T;
	actions: Action<T>[];
}

export const ActionMenu = <T extends { id: string }>({
	actions,
	item,
}: CommonTableActionProps<T>) => {
	return (
		<DropdownMenu.Root>
			<DropdownMenu.Trigger>
				<IconButton
					variant="ghost"
					radius="full"
					size="2"
					aria-label="Actions"
					data-testid="action-menu-trigger"
				>
					<DotsHorizontalIcon />
				</IconButton>
			</DropdownMenu.Trigger>
			<DropdownMenu.Content side="bottom" align="end">
				{actions.map((action: Action<T>) => (
					<DropdownMenu.Item
						key={action.id}
						data-testid={action.id}
						onClick={() => action.actionFn(item)}
					>
						{action.label}
					</DropdownMenu.Item>
				))}
			</DropdownMenu.Content>
		</DropdownMenu.Root>
	);
};
