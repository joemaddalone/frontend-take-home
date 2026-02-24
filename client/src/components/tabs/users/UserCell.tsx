import { Avatar, Flex, Text } from "@radix-ui/themes";
import type { User } from "#types";

export const UserCell = ({ user }: { user: User }) => {
	return (
		<Flex gap="3" align="center">
			<Avatar
				radius="full"
				size="2"
				src={user.photo}
				fallback={`${user.first.charAt(0)}${user.last.charAt(0)}`}
			/>
			<Text>
				{user.first} {user.last}
			</Text>
		</Flex>
	);
};
