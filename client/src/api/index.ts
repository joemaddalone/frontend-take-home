import crudFactory from "./crud";
import type { Role, User } from "../types";

const BASE_URL = "http://localhost:3002";

const ENDPOINTS = {
	USERS: `${BASE_URL}/users`,
	ROLES: `${BASE_URL}/roles`,
} as const;


export const api = {
	ENDPOINTS,
	BASE_URL,
	users: {...crudFactory<User>(ENDPOINTS.USERS)},
	roles: {...crudFactory<Role>(ENDPOINTS.ROLES)},
}