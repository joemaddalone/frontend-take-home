import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { Flex, Box, TextField } from "@radix-ui/themes";

export const CommonSearch = ({
	onChange,
	defaultValue,
	placeholder = "Search..."
}: {
	onChange: (value: string) => void;
	defaultValue: string;
	placeholder?: string
}) => {
	return (
		<Flex gap="2" my="8px" width="100%">
			<Box width="100%">
				<TextField.Root
					placeholder={placeholder}
					defaultValue={defaultValue}
					onChange={(e) => onChange(e.target.value)}
				>
					<TextField.Slot>
						<MagnifyingGlassIcon height="16" width="16" />
					</TextField.Slot>
				</TextField.Root>
			</Box>
		</Flex>
	);
};
