import { SkeletonTable } from "./TableSuspense";
import { Button, Container, Box, Flex, Card, Text } from "@radix-ui/themes";

export const TableAlert = ({
	columns = 5,
	rows = 5,
	message,
	onRetry,
}: {
	columns: number;
	rows: number;
	message: string;
	onRetry?: () => void;
}) => {
	return (
		<Container>
			<Box width="100%" position="relative">
				<Box position="absolute" top="50%" left="0" width="100%" height="100%">
					<SkeletonTable columns={columns} rows={rows} />
				</Box>
				<Flex
					justify="center"
					align="center"
					position="absolute"
					top="50%"
					left="0"
					width="100%"
					height="250px"
				>
					<Card variant="surface" size="5">
						<Flex direction="column" gap="3" align="center">
							<Text as="div" size="2" weight="bold">
								{message}
							</Text>
							{onRetry && (
								<Button onClick={onRetry} style={{ marginBottom: "16px" }}>
									Retry
								</Button>
							)}
						</Flex>
					</Card>
				</Flex>
			</Box>
		</Container>
	);
};
