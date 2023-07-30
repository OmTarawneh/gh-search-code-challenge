"use client";

import Stack from "@mui/material/Stack";

import { Search } from "@src/store/search";
import Banner from "@src/components/Banner";
import SearchResult from "@src/components/SearchResult";
import SearchSection from "@src/components/Search";

const search = new Search();

export default function Home() {
	return (
		<Stack justifyContent="center" alignItems="center" marginTop={15} gap={5}>
			<Banner />
			<SearchSection search={search} />
			<SearchResult search={search} />
		</Stack>
	);
}
