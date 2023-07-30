import React from "react";
import { render } from "@testing-library/react";
import ErrorBoundaryFallback from "./ErrorBoundaryFallback";

describe("ErrorBoundaryFallback", () => {
	it("matches the snapshot", () => {
		const errorMessage = "This is an error message.";
		const { container } = render(
			<ErrorBoundaryFallback
				error={{ message: errorMessage }}
				resetErrorBoundary={() => {}}
			/>
		);

		// Check if the rendered component matches the snapshot
		expect(container).toMatchSnapshot();
	});
});
