import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { Flex, Box, TextField, Spinner } from "@radix-ui/themes";

export const CommonSearch = ({
	onChange,
	defaultValue,
	placeholder = "Search...",
	disabled = false,
	busy = false,
}: {
	onChange: (value: string) => void;
	defaultValue: string;
	placeholder?: string;
	disabled?: boolean;
	busy?: boolean;
}) => {
	return (
		<Flex gap="2" my="8px" width="100%">
			<Box width="100%">
				<TextField.Root
					placeholder={placeholder}
					defaultValue={defaultValue}
					disabled={disabled}
					onChange={(e) => onChange(e.target.value)}
				>
					<TextField.Slot>
						{busy ? (
							<Spinner />
						) : (
							<MagnifyingGlassIcon height="16" width="16" />
						)}
					</TextField.Slot>
				</TextField.Root>
			</Box>
		</Flex>
	);
};
