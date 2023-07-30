// Banner.test.js

import React from "react";
import { render } from "@testing-library/react";
import Banner from "./Banner";

describe("Banner", () => {
	it("renders the component with the correct text", () => {
		const { getByText } = render(<Banner />);
		const bannerText = getByText("GitHub Search");

		// Ensure that the component is rendered with the correct text
		expect(bannerText).toBeTruthy();
	});

	it("matches the snapshot", () => {
		const { container } = render(<Banner />);

		// Check if the rendered component matches the snapshot
		expect(container).toMatchSnapshot();
	});
});
