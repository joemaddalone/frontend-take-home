import { AlertDialog, Button, Text, Flex } from "@radix-ui/themes";

interface ConfirmDialogProps {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	onConfirm: () => void;
	title: string;
	actionLabel?: string;
	children: React.ReactNode;
	loading: boolean;
	error?: string;
}

export const ConfirmDialog = ({
	open,
	onOpenChange,
	onConfirm,
	title,
	children,
	actionLabel,
	loading,
	error,
}: ConfirmDialogProps) => {
	return (
		<AlertDialog.Root open={open} onOpenChange={onOpenChange}>
			<AlertDialog.Content maxWidth="500px">
				<AlertDialog.Title>{title}</AlertDialog.Title>
				<AlertDialog.Description size="2">{children}</AlertDialog.Description>

				<Flex gap="3" mt="4" justify="end">
					<AlertDialog.Cancel>
						<Button color="gray" variant="surface" highContrast>
							Cancel
						</Button>
					</AlertDialog.Cancel>
					<Button variant="soft" color="red" onClick={onConfirm} loading={loading}>
						{error ? "Try again" : actionLabel || "Confirm"}
					</Button>
					{error && (
						<AlertDialog.Description>
							<Text color="red">{error}</Text>
						</AlertDialog.Description>
					)}
				</Flex>
			</AlertDialog.Content>
		</AlertDialog.Root>
	);
};
