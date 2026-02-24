import { useNavigate, useParams } from "react-router";
import { Tabs, Box, Container } from "@radix-ui/themes";
import { UserList } from "#components/tabs/users";
import { RoleList } from "#components/tabs/roles";

const DEFAULT_TAB = "users";

export const App = () => {
	const navigate = useNavigate();
	const { activeTab } = useParams();

	const handleTabChange = (tab: string) => {
		navigate(`/${tab}`);
	};
	return (
		<Container>
			<Tabs.Root value={activeTab || DEFAULT_TAB} onValueChange={handleTabChange}>
				<Tabs.List>
					<Tabs.Trigger value="users">Users</Tabs.Trigger>
					<Tabs.Trigger value="roles">Roles</Tabs.Trigger>
				</Tabs.List>

				<Box pt="3">
					<Tabs.Content tabIndex={0} value="users">
						<UserList />
					</Tabs.Content>

					<Tabs.Content tabIndex={0} value="roles">
						<RoleList />
					</Tabs.Content>
				</Box>
			</Tabs.Root>
		</Container>
	);
};
