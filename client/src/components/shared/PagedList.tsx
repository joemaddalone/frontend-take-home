import { mutate } from "swr";
import { TableSuspense } from "#shared";
import { ErrorBoundary } from "react-error-boundary";
import { TableAlert } from "./TableAlert";
import { useParams } from "react-router";
import { useState } from "react";

export const PagedList = ({
	List,
	errorMessage,
	columns,
	rows,
	search,
}: {
	List: React.ComponentType<{ search: string }>;
	errorMessage: string;
	columns: number;
	rows: number;
	search: string;
}) => {
	const [resetKey, setResetKey] = useState(0);
	const { pageNumber = 1 } = useParams();

	const retry = (reset: () => void) => {
		setResetKey((k) => k + 1);
		reset();
	};

	return (
		<ErrorBoundary
			key={`${resetKey}-${pageNumber}`}
			onReset={() => mutate(() => true, undefined, { revalidate: true })}
			fallbackRender={({ resetErrorBoundary }) => (
				<TableAlert
					columns={columns}
					rows={rows}
					message={errorMessage}
					onRetry={() => retry(resetErrorBoundary)}
				/>
			)}
		>
			<TableSuspense columns={columns} rows={rows}>
				<List search={search} />
			</TableSuspense>
		</ErrorBoundary>
	);
};
