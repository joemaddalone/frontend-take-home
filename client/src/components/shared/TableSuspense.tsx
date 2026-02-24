/** biome-ignore-all lint/suspicious/noArrayIndexKey: placeholder, not really an issue */
import { Suspense } from "react";
import { Skeleton, Table } from "@radix-ui/themes";

interface TableSuspenseProps {
	children: React.ReactNode;
	columns: number;
	rows: number;
}

export const SkeletonTable = ({
	columns,
	rows,
}: {
	columns: number;
	rows: number;
}) => {
	return (
		<Table.Root variant="surface">
			<Table.Header>
				<Table.Row>
					{Array.from({ length: columns }).map((_, i) => (
						<Table.ColumnHeaderCell key={i}>
							<Skeleton />
						</Table.ColumnHeaderCell>
					))}
				</Table.Row>
			</Table.Header>
			<Table.Body>
				{Array.from({ length: rows }).map((_, i) => (
					<Table.Row key={i}>
						{Array.from({ length: columns }).map((_, j) => (
							<Table.Cell key={j}>
								<Skeleton />
							</Table.Cell>
						))}
					</Table.Row>
				))}
			</Table.Body>
		</Table.Root>
	);
};

export const TableSuspense = ({
	children,
	columns,
	rows,
}: TableSuspenseProps) => {
	return (
		<Suspense fallback={<SkeletonTable columns={columns} rows={rows} />}>
			{children}
		</Suspense>
	);
};
