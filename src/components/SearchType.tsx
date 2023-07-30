"use client";

import { observer } from "mobx-react-lite";
import type { FC } from "react";

import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

import { SearchTypeEnum, Search } from "@src/store/search";

export interface Props {
	search: Search;
}

const SearchType: FC<Props> = observer(({ search }) => {
	return (
		<FormControl fullWidth>
			<InputLabel id="search-type-select-label">Search Type</InputLabel>
			<Select
				labelId="search-type-select-label"
				id="search-type-select"
				value={search.type}
				label="Search Type"
				onChange={(e) => search.setType(e.target.value as SearchTypeEnum)}
			>
				<MenuItem value={SearchTypeEnum.repositories}>
					{SearchTypeEnum.repositories}
				</MenuItem>
				<MenuItem value={SearchTypeEnum.users}>{SearchTypeEnum.users}</MenuItem>
			</Select>
		</FormControl>
	);
});

export default SearchType;
