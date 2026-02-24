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

  const getById = (id: string | null, options?: SWRConfiguration) => {
    const url = id ? `${endpoint}/${id}` : null;
    return useRequest<T>(url, options);
  };

  const create = async (item: T) => {
    // create the request
    const promise = fetcher<T>(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(item),
    });

    // optimistic update
    mutate(
      (key) => typeof key === "string" && key.startsWith(endpoint),
      (currentData: PagedData<T> | undefined) => {
        if (!currentData) return currentData;
        return { ...currentData, data: [item, ...currentData.data] };
      },
      { revalidate: false },
    );

    // await server response
    const result = await promise;
    // invalidate the cache
    mutate((key) => typeof key === "string" && key.startsWith(endpoint));
    // return the result
    return result;
  };

  const remove = async (id: string) => {
    // create the request
    const url = `${endpoint}/${id}`;
    const promise = fetcher<{ id: string }>(url, {
      method: "DELETE",
    });

    // optimistic update
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

    // await server response
    const result = await promise;
    // invalidate the cache
    mutate((key) => typeof key === "string" && key.startsWith(endpoint));
    return result;
  };

  const update = async (id: string, item: T) => {
    const url = `${endpoint}/${id}`;
    // create the request
    const promise = fetcher<T>(url, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(item),
    });

    // optimistic update
    mutate(
      (key) => typeof key === "string" && key.startsWith(endpoint),
      (currentData: PagedData<T> | undefined) => {
        if (!currentData) return currentData;
        return {
          ...currentData,
          data: currentData.data.map((i) =>
            i.id === id ? { ...i, ...item } : i,
          ),
        };
      },
      { revalidate: false },
    );

    // await server response
    const result = await promise;
    // invalidate the cache
    mutate((key) => typeof key === "string" && key.startsWith(endpoint));
    // return the result
    return result;
  };

  return {
    get,
    getById,
    remove,
    update,
		create
  };
};

export default crudFactory;
