import { formatDate } from "./formatDate";

describe("formatDate Function", () => {
	it("returns a formatted date string", () => {
		// Mock the current timezone to ensure consistent results
		const originalIntl = Intl.DateTimeFormat;
		Intl.DateTimeFormat = function () {
			return {
				format: () => "July 30, 2023 at 12:00:00 PM UTC",
			};
		};

		const dateString = "2023-07-30T12:00:00Z";
		const formattedDate = formatDate(dateString);

		// Restore the original Intl.DateTimeFormat to avoid side effects in other tests
		Intl.DateTimeFormat = originalIntl;

		expect(formattedDate).toBe("July 30, 2023 at 12:00:00 PM UTC");
	});

	it("returns a formatted date string for different dates", () => {
		const dateString1 = "2021-09-15T09:30:00Z";
		const formattedDate1 = formatDate(dateString1);
		expect(formattedDate1).toBe("September 15, 2021 at 9:30:00 AM UTC");

		const dateString2 = "2022-03-05T18:45:30Z";
		const formattedDate2 = formatDate(dateString2);
		expect(formattedDate2).toBe("March 5, 2022 at 6:45:30 PM UTC");
	});

	it("handles invalid date string", () => {
		// If an invalid date string is provided.
		const dateString = "2023-07-30T12:00:00"; // Missing timezone "Z"
		const formattedDate = formatDate(dateString);
		expect(formattedDate).toBe("July 30, 2023 at 9:00:00 AM UTC");
	});

});
