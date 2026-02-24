import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { Flex, Box, TextField } from "@radix-ui/themes";

export const CommonSearch = ({
	onChange,
	defaultValue,
}: {
	onChange: (value: string) => void;
	defaultValue: string;
}) => {
	return (
		<Flex gap="2" my="8px" width="100%">
			<Box width="100%">
				<TextField.Root
					size="2"
					placeholder="Search by name…"
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
