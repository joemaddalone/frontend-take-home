import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router";
import { Theme } from "@radix-ui/themes";
import { App } from "#components/App";
import { themeConfig } from "./config/theme";
import "./styles/index.css";

const router = createBrowserRouter([
	{
		path: "/:activeTab?",
		element: <App />,
	},
	{
		path: "/:activeTab/:pageNumber",
		element: <App />,
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
