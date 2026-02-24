import { useMemo } from "react";
import { mutate } from "swr";
import crudFactory from "./crud";
import type { Role, User } from "../types";

const BASE_URL = "http://localhost:3002";

const ENDPOINTS = {
	USERS: `${BASE_URL}/users`,
	ROLES: `${BASE_URL}/roles`,
} as const;

const rolesCrud = crudFactory<Role>(ENDPOINTS.ROLES);
const usersCrud = crudFactory<User>(ENDPOINTS.USERS);

// hack to force lookup refresh without
// invalidating roles and users cache
export function refreshRolesLookup() {
	return mutate("api/roles?page=0");
}

export function useRolesLookup() {
	const { data } = rolesCrud.get(0, undefined, {
		revalidateIfStale: false,
		revalidateOnFocus: false,
		revalidateOnReconnect: false,
		revalidateOnMount: false,
		dedupingInterval: 60_000,
	});

	return useMemo(() => {
		if (!data) return {};
		return data.data.reduce<Record<string, Role>>((acc, r) => {
			acc[r.id] = r;
			return acc;
		}, {});
	}, [data]);
}

export const api = {
	ENDPOINTS,
	BASE_URL,
	users: { ...usersCrud },
	roles: { ...rolesCrud },
};
