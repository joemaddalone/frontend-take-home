const BASE_URL = "http://localhost:3002";

const ENDPOINTS = {
	USERS: `${BASE_URL}/users`,
	ROLES: `${BASE_URL}/roles`,
} as const;

// TODO: Use swr here to create basic crud for users and roles


export const api ={
	ENDPOINTS,
	BASE_URL,
	users: {
		get: async (page: number) => {
			const res = await fetch(`${ENDPOINTS.USERS}?page=${page}`);
			return res.json();
		},
	},
	roles: {
		get: async (page: number) => {
			const res = await fetch(`${ENDPOINTS.ROLES}?page=${page}`);
			return res.json();
		},
	},
}