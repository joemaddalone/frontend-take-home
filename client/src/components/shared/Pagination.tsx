import { Button, Flex } from "@radix-ui/themes";

interface PaginationProps {
	next: number | null;
	prev: number | null;
	onPageChange: (page: number) => void;
}

// api only returns next, prev, and pages
// this function derives the current page from that
// const deriveCurrentPage = (prev: number | null, next: number | null) => {
// 	if (prev) return prev + 1;
// 	if (next) return next - 1;
// 	return 1;
// };

export const Pagination = ({ next, prev, onPageChange }: PaginationProps) => {
	return (
		<Flex align="center" justify="end" gap="2">
			<Button
				color="gray"
				variant="surface"
				highContrast
				onClick={() => onPageChange(prev || 0)}
				disabled={!prev}
			>
				Previous
			</Button>
			<Button
				color="gray"
				variant="surface"
				highContrast
				onClick={() => onPageChange(next || 0)}
				disabled={!next}
			>
				Next
			</Button>
		</Flex>
	);
};
