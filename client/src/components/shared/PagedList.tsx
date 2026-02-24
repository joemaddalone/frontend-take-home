import { mutate } from "swr";
import { Button } from "@radix-ui/themes";
import { TableSuspense } from "#shared";
import { ErrorBoundary } from "react-error-boundary";
import { useParams } from "react-router";
import { useState } from "react";

export const PagedList = ({
	List,
	errorMessage,
	columns,
	rows,
	search,
}: {
	List: React.ComponentType<{ search: string; }>;
	errorMessage: string;
	columns: number;
	rows: number;
	search: string;
}) => {
	const [resetKey, setResetKey] = useState(0);
	const { pageNumber = 1 } = useParams();
	return (
		<ErrorBoundary
			key={`${resetKey}-${pageNumber}`}
			onReset={() => mutate(() => true, undefined, { revalidate: true })}
			fallbackRender={({ resetErrorBoundary }) => (
				<h2>
					{errorMessage}
					<Button
						onClick={() => {
							setResetKey((k) => k + 1);
							resetErrorBoundary();
						}}
					>
						Retry
					</Button>
				</h2>
			)}
		>
			<TableSuspense columns={columns} rows={rows}>
				<List search={search} />
			</TableSuspense>
		</ErrorBoundary>
	);
};
