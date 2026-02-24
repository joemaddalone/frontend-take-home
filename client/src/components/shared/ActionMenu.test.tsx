import { describe, it, expect, vi } from "vitest";
import { render, screen } from "../../test-utils";
import userEvent from "@testing-library/user-event";
import { ActionMenu } from "./ActionMenu";

describe("ActionMenu", () => {
	it("renders actions and calls actionFn on click", async () => {
		const user = userEvent.setup();
		const mockAction = vi.fn();
		const item = { id: "1", name: "Test Item" };
		const actions = [
			{ id: "edit", label: "Edit", actionFn: mockAction },
			{ id: "delete", label: "Delete", actionFn: mockAction },
		];

		render(<ActionMenu item={item} actions={actions} />);

		// open the menu
		await user.click(screen.getByTestId("action-menu-trigger"));
		// click the action button
		await user.click(screen.getByTestId("edit"));

		expect(mockAction).toHaveBeenCalledWith(item);
	});
});
