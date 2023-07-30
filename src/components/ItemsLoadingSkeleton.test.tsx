import React from "react";
import { render } from "@testing-library/react";
import ItemsLoadingSkeleton from "./ItemsLoadingSkeleton";

describe("ItemsLoadingSkeleton", () => {
	it("renders a circular loading skeleton icon for each item", () => {
		const { getAllByTestId } = render(<ItemsLoadingSkeleton />);
		const skeletonIcons = getAllByTestId("loading-skeleton"); 
		expect(skeletonIcons).toHaveLength(3);
	});

	it("renders loading skeletons for primary and secondary text for each item", () => {
		const { getAllByTestId } = render(<ItemsLoadingSkeleton />);
		const primarySkeletons = getAllByTestId("loading-skeleton-primary"); 
		const secondarySkeletons = getAllByTestId("loading-skeleton-secondary"); 
		expect(primarySkeletons).toHaveLength(3);
		expect(secondarySkeletons).toHaveLength(3);
	});
});
