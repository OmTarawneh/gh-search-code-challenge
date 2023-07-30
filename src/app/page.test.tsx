import { render } from "@testing-library/react";
import Home from "./page";

// Mock the components used in Home
jest.mock("../components/Banner", () => () => <div>Banner Component</div>);
jest.mock("../components/SearchResult", () => () => (
	<div>SearchResult Component</div>
));
jest.mock("../components/Search", () => () => (
	<div>SearchSection Component</div>
));

describe("Home", () => {
	it("renders all the required components", () => {
		const { container } = render(<Home />);

		// Ensure that the required components are rendered
		expect(container.textContent).toContain("Banner Component");
		expect(container.textContent).toContain("SearchResult Component");
		expect(container.textContent).toContain("SearchSection Component");
	});

	it("matches the snapshot", () => {
		const { container } = render(<Home />);

		// Check if the rendered component matches the snapshot
		expect(container).toMatchSnapshot();
	});
});
