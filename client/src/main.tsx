import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router";
import { Theme } from "@radix-ui/themes";
import { App } from "#components/App";
import { themeConfig } from "./config/theme";
import { api } from "./api";
import "./styles/index.css";

const router = createBrowserRouter([
	{
		path: "/",
		element: <App />,
		loader: async () => {
			const users = await api.users.get(1);
			console.log({ users }) ;
			return { users }
		}
	},
]);

const root = document.getElementById("root");

if (!root) {
	throw new Error("Root element not found");
}

createRoot(root).render(
	<StrictMode>
		<Theme {...themeConfig}>
			<RouterProvider router={router} />
		</Theme>
	</StrictMode>,
);
