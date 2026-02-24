import { Table } from "@radix-ui/themes";
import { AnimatePresence, motion } from "motion/react";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import type { PagedData } from "#types";

const MotionTableRow = motion.create(Table.Row);

interface CommonTableProps<T> {
	data: PagedData<T>;
	actions?: { label: string; id: string; }[];
	template: {
		label: string;
		id: string;
		width?: string;
		display: (value: T) => React.ReactNode;
	}[];
}

const rowAnimation = {
	initial: { opacity: 0, y: -20 },
	animate: { opacity: 1, y: 0 },
	exit: { opacity: 0, y: -20 },
};

export const CommonTable = <T extends { id: string }>({
	data,
	template,
	actions,
}: CommonTableProps<T>) => {
	return (
		<Table.Root variant="surface">
			<Table.Header>
				<Table.Row>
					{template.map((column) => (
						<Table.ColumnHeaderCell
							key={column.id}
							style={{ width: column.width }}
						>
							{column.label}
						</Table.ColumnHeaderCell>
					))}
					{actions && <Table.ColumnHeaderCell>&nbsp;</Table.ColumnHeaderCell>}
				</Table.Row>
			</Table.Header>
			<Table.Body>
				{data?.data.map((row) => {
					return (
						<AnimatePresence key={row.id}>
							<MotionTableRow align="center" {...rowAnimation}>
								{template.map((column) => (
									<Table.Cell key={column.id} style={{ width: column.width }}>
										{column.display(row)}
									</Table.Cell>
								))}
								{actions && (
									<Table.Cell style={{ textAlign: "right", width: "100px" }}>
										<DotsHorizontalIcon />
									</Table.Cell>
								)}
							</MotionTableRow>
						</AnimatePresence>
					);
				})}
			</Table.Body>
			{/* {data?.pages > 1 && (
				<tfoot>
					<AnimatePresence>
						<MotionTableRow {...rowAnimation}>
							<Table.Cell colSpan={template.length + 1}>
								Pagination here
							</Table.Cell>
						</MotionTableRow>
					</AnimatePresence>
				</tfoot>
			)} */}
		</Table.Root>
	);
};
