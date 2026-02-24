import type { SWRConfiguration } from "swr";
import type { PagedData } from "../types";
import useSWR, { mutate } from "swr";

// mostly lifted from https://github.com/vercel/swr/blob/main/examples/basic-typescript/libs/fetch.ts
export async function fetcher<JSON>(
	input: RequestInfo,
	init?: RequestInit,
): Promise<JSON> {
	const res = await fetch(input, init);

	if (!res.ok) {
		throw new Error("An error occurred while fetching the data.");
	}

	return res.json();
}

interface DataResponse<T> {
	data: T | undefined;
	isLoading: boolean;
	isError: unknown;
}

// mostly lifted from https://github.com/vercel/swr/blob/main/examples/basic-typescript/libs/use-request.ts
const useRequest = <T>(
	url: string | null,
	options?: SWRConfiguration,
): DataResponse<T> => {
	const { data, error, isLoading } = useSWR<T>(url, fetcher, {
		suspense: true,
		...options,
	});

	return {
		data,
		isLoading,
		isError: error,
	};
};

// TODO: R-only atm, expand to include C,U, & D.
const crudFactory = <T extends { id?: string }>(endpoint: string) => {
	const get = (page?: number, search?: string, options?: SWRConfiguration) => {
		const query = new URLSearchParams();
		if (page) query.append("page", page.toString());
		if (search) query.append("search", search);

		const queryString = query.toString();
		const url = `${endpoint}${queryString ? `?${queryString}` : ""}`;

		return useRequest<PagedData<T>>(url, options);
	};

	const remove = async (id: string) => {
		const url = `${endpoint}/${id}`;
		const promise = fetcher<{ id: string }>(url, {
			method: "DELETE",
		});

		mutate(
			(key) => typeof key === "string" && key.startsWith(endpoint),
			(currentData: PagedData<T> | undefined) => {
				if (!currentData) return currentData;
				return {
					...currentData,
					data: currentData.data.filter((i) => i.id !== id),
				};
			},
			{ revalidate: false },
		);

		const result = await promise;
		mutate((key) => typeof key === "string" && key.startsWith(endpoint));
		return result;
	};

	return {
		get,
		remove,
	};
};

export default crudFactory;
