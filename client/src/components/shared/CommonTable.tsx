import { Table } from "@radix-ui/themes";
import { AnimatePresence, motion } from "motion/react";
import { ActionMenu, Pagination } from "#shared";
import type { PagedData } from "#types";

const MotionTableRow = motion.create(Table.Row);

interface CommonTableProps<T> {
	data: PagedData<T>;
	actions?: { label: string; id: string; actionFn: (value: T) => void }[];
	template: {
		label: string;
		id: string;
		width?: string;
		display: (value: T) => React.ReactNode;
	}[];
	onPageChange?: (page: number) => void;
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
	onPageChange,
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
										<ActionMenu actions={actions} item={row} />
									</Table.Cell>
								)}
							</MotionTableRow>
						</AnimatePresence>
					);
				})}
			</Table.Body>
			{onPageChange && data?.pages > 1 && (
				<tfoot>
					<AnimatePresence>
						<MotionTableRow {...rowAnimation}>
							<Table.Cell colSpan={template.length + 1}>
								{data && (
									<Pagination
										next={data.next}
										prev={data.prev}
										onPageChange={(page: number) => {
											onPageChange(page);
										}}
									/>
								)}
							</Table.Cell>
						</MotionTableRow>
					</AnimatePresence>
				</tfoot>
			)}
		</Table.Root>
	);
};
