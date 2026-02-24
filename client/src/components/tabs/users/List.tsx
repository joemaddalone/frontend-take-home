import { api } from "#api";

export const columns = 4;
export const rows = 10;

export const List = () => {
	const { data } = api.users.get(1);

	if (!data) return null;

	return (

		<pre>
			{JSON.stringify(data, null, 2)}
		</pre>
	);
}
