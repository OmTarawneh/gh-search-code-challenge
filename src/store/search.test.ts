import { Search, SearchTypeEnum } from "./search";

jest.mock("octokit", () => ({
	Octokit: jest.fn().mockImplementation(() => ({
		rest: {
			search: {
				repos: jest.fn().mockResolvedValue({
					data: {
						total_count: 42,
						items: [
							{ id: 1, name: "Repo 1" },
							{ id: 2, name: "Repo 2" },
						],
					},
				}),
				users: jest.fn().mockResolvedValue({
					data: {
						total_count: 42,
						items: [
							{ id: 1, name: "Repo 1" },
							{ id: 2, name: "Repo 2" },
						],
					},
				}),
				error: jest.fn().mockRejectedValue(new Error("Test error")),
			},
		},
	})),
}));

describe("Search Class", () => {
	let searchInstance: Search;
	beforeEach(() => {
		searchInstance = new Search();
	});

	afterEach(() => {
		searchInstance.reset(); // Reset the search state after each test
	});

	it("initializes with default values", () => {
		expect(searchInstance.loading).toBe(false);
		expect(searchInstance.query).toBe("");
		expect(searchInstance.page).toBe(1);
		expect(searchInstance.itemsNumber).toBe(0);
		expect(searchInstance.validation).toEqual({
			isValid: true,
			errorMessage: "",
		});
		expect(searchInstance.type).toBe(SearchTypeEnum.repositories);
		expect(searchInstance.searchResultMap).toEqual({
			[SearchTypeEnum.repositories]: {},
			[SearchTypeEnum.users]: {},
		});
	});

	it("sets the search type and resets the state", () => {
		searchInstance.setType(SearchTypeEnum.users);
		expect(searchInstance.type).toBe(SearchTypeEnum.users);
		expect(searchInstance.query).toBe("");
		expect(searchInstance.page).toBe(1);
		expect(searchInstance.itemsNumber).toBe(0);
		expect(searchInstance.validation).toEqual({
			isValid: true,
			errorMessage: "",
		});
		expect(searchInstance.searchResultMap).toEqual({
			[SearchTypeEnum.repositories]: {},
			[SearchTypeEnum.users]: {},
		});
	});

	it("sets the search query", () => {
		searchInstance.setQuery("test query");
		expect(searchInstance.query).toBe("test query");
	});

	it("formats the search query correctly", () => {
		const formattedQuery = searchInstance["formatQuery"]("test query");
		expect(formattedQuery).toBe("test+query");
	});

	it("toggles the loading state", () => {
		expect(searchInstance.loading).toBe(false);
		searchInstance.toggleLoading();
		expect(searchInstance.loading).toBe(true);
		searchInstance.toggleLoading();
		expect(searchInstance.loading).toBe(false);
	});

	it("sets the items number", () => {
		searchInstance["setItemsNumber"](42);
		expect(searchInstance.itemsNumber).toBe(42);
	});

	it("increases the page number", () => {
		expect(searchInstance.page).toBe(1);
		searchInstance.increasePageNumber();
		expect(searchInstance.page).toBe(2);
	});

	it("resets the page number", () => {
		searchInstance.page = 5;
		searchInstance.resetPageNumber();
		expect(searchInstance.page).toBe(1);
	});

	it("sets user search results", () => {
		const dummyUserData = {
			items: [
				{ id: 1, name: "User 1" },
				{ id: 2, name: "User 2" },
			],
		};
		searchInstance.setUserSearchResult(dummyUserData);
		expect(
			searchInstance.searchResultMap[SearchTypeEnum.users]["items"]
		).toEqual(dummyUserData.items);
	});

	it("sets repo search results", () => {
		const dummyRepoData = {
			items: [
				{ id: 1, name: "Repo 1" },
				{ id: 2, name: "Repo 2" },
			],
		};
		searchInstance.setRepoSearchResult(dummyRepoData);
		expect(
			searchInstance.searchResultMap[SearchTypeEnum.repositories]["items"]
		).toEqual(dummyRepoData.items);
	});

	it("resets the search result map to default", () => {
		searchInstance.searchResultMap = {
			[SearchTypeEnum.repositories]: { items: [{ id: 1, name: "Repo 1" }] },
			[SearchTypeEnum.users]: { items: [{ id: 2, name: "User 2" }] },
		};
		searchInstance.setSearchResultToDefault();
		expect(searchInstance.searchResultMap).toEqual({
			[SearchTypeEnum.repositories]: {},
			[SearchTypeEnum.users]: {},
		});
	});

	it("sets error and validation message", () => {
		searchInstance.setError("Error message");
		expect(searchInstance.validation.isValid).toBe(false);
		expect(searchInstance.validation.errorMessage).toBe("Error message");

		searchInstance.setError("", true); // Valid error message
		expect(searchInstance.validation.isValid).toBe(true);
		expect(searchInstance.validation.errorMessage).toBe("");
	});

	it("searches GitHub and sets search results for repos correctly", async () => {
		const dummyData = {
			data: {
				total_count: 42,
				items: [
					{ id: 1, name: "Repo 1" },
					{ id: 2, name: "Repo 2" },
				],
			},
		};

		// Set initial state
		searchInstance.setType(SearchTypeEnum.repositories);
		searchInstance.setQuery("test query");

		// Call the 'searchGitHub' method
		await searchInstance.searchGitHub();

		expect(searchInstance.loading).toBe(false);
		expect(searchInstance.page).toBe(2);
		expect(searchInstance.itemsNumber).toBe(42);
		expect(searchInstance.validation.isValid).toBe(true);
		expect(searchInstance.validation.errorMessage).toBe("");
	});

	it("searches GitHub and sets search results for users correctly", async () => {
		const dummyData = {
			data: {
				total_count: 42,
				items: [
					{ id: 1, name: "Repo 1" },
					{ id: 2, name: "Repo 2" },
				],
			},
		};

		// Set initial state
		searchInstance.setType(SearchTypeEnum.users);
		searchInstance.setQuery("test query");

		// Call the 'searchGitHub' method
		await searchInstance.searchGitHub();

		expect(searchInstance.loading).toBe(false);
		expect(searchInstance.page).toBe(2);
		expect(searchInstance.itemsNumber).toBe(42);
		expect(searchInstance.validation.isValid).toBe(true);
		expect(searchInstance.validation.errorMessage).toBe("");
	});
	it("handles error correctly in the catch block", async () => {
		const mockError = new Error("Some error message");

		// Set initial state
		const searchInstance = new Search();
		searchInstance.setType("error");
		searchInstance.setQuery("test query");

		// Call the 'searchGitHub' method
		await searchInstance.searchGitHub();

		expect(searchInstance.loading).toBe(false);
		expect(searchInstance.page).toBe(1);
		expect(searchInstance.itemsNumber).toBe(0);
		expect(searchInstance.validation.isValid).toBe(false);
		expect(searchInstance.validation.errorMessage).toBe("Test error");
	});

	it("sets user search results when map is empty", () => {
		const dummyUserData = {
			items: [
				{ id: 1, name: "User 1" },
				{ id: 2, name: "User 2" },
			],
		};
		searchInstance.setUserSearchResult(dummyUserData);

		expect(
			searchInstance.searchResultMap[SearchTypeEnum.users]["items"]
		).toEqual(dummyUserData.items);
	});

	it("sets user search results when map already has items", () => {
		const dummyUserData1 = {
			items: [{ id: 1, name: "User 1" }],
		};

		const dummyUserData2 = {
			items: [{ id: 2, name: "User 2" }],
		};

		// Set an initial item
		searchInstance.searchResultMap[SearchTypeEnum.users] = dummyUserData1;

		searchInstance.setUserSearchResult(dummyUserData2);

		expect(
			searchInstance.searchResultMap[SearchTypeEnum.users]["items"]
		).toEqual([...dummyUserData1.items, ...dummyUserData2.items]);
	});

	it("sets repo search results when map is empty", () => {
		const dummyRepoData = {
			items: [
				{ id: 1, name: "Repo 1" },
				{ id: 2, name: "Repo 2" },
			],
		};
		searchInstance.setRepoSearchResult(dummyRepoData);

		expect(
			searchInstance.searchResultMap[SearchTypeEnum.repositories]["items"]
		).toEqual(dummyRepoData.items);
	});

	it("sets repo search results when map already has items", () => {
		const dummyRepoData1 = {
			items: [{ id: 1, name: "Repo 1" }],
		};

		const dummyRepoData2 = {
			items: [{ id: 2, name: "Repo 2" }],
		};

		// Set an initial item
		searchInstance.searchResultMap[SearchTypeEnum.repositories] =
			dummyRepoData1;

		searchInstance.setRepoSearchResult(dummyRepoData2);

		expect(
			searchInstance.searchResultMap[SearchTypeEnum.repositories]["items"]
		).toEqual([...dummyRepoData1.items, ...dummyRepoData2.items]);
	});
});
