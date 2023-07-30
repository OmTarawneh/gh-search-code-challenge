// Import dependencies for testing
import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import { Search } from "@src/store/search";
import SearchSection from "./Search";

// Mock the "SearchType" and "SearchBar" components
jest.mock("./SearchType", () => ({
	__esModule: true,
	default: () => <div data-testid="mocked-search-type" />,
}));

jest.mock("./SearchBar", () => ({
	__esModule: true,
	default: () => <div data-testid="mocked-search-bar" />,
}));

// Create a mock Search object
const mockSearch = {
	// Add any properties or methods your "Search" class might have that are used in the component
};

describe("SearchSection Component", () => {
	it("should render SearchType and SearchBar components", () => {
		const { getByTestId } = render(
			<SearchSection search={mockSearch as Search} />
		);

		// Assert that the SearchType and SearchBar components are rendered
		expect(getByTestId("mocked-search-type")).toBeInTheDocument();
		expect(getByTestId("mocked-search-bar")).toBeInTheDocument();
	});
});
