import { useMemo } from "react";
import crudFactory from "./crud";
import type { Role, User } from "../types";

const BASE_URL = "http://localhost:3002";

const ENDPOINTS = {
  USERS: `${BASE_URL}/users`,
  ROLES: `${BASE_URL}/roles`,
} as const;

const rolesCrud = crudFactory<Role>(ENDPOINTS.ROLES);
const usersCrud = crudFactory<User>(ENDPOINTS.USERS);

export function useRolesLookup() {
  const { data } = rolesCrud.get(undefined, undefined, {
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
  roles: { ...rolesCrud }
};
