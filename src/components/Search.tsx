"use client";

import { FC } from "react";
import { observer } from "mobx-react-lite";

import Grid from "@mui/material/Grid";

import { Search } from "@src/store/search";
import SearchType from "@src/components/SearchType";
import SearchBar from "@src/components/SearchBar";

interface Props {
	search: Search;
}

const SearchSection: FC<Props> = observer(({ search }) => {
	return (
		<Grid container justifyContent="center" alignItems="flex-start" spacing={3}>
			<Grid item xs={1.5}>
				<SearchType search={search} />
			</Grid>
			<Grid item xs={3.5}>
				<SearchBar search={search} />
			</Grid>
		</Grid>
	);
});

export default SearchSection;
