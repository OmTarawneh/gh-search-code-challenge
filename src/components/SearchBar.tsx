"use client";

import { ChangeEvent, FC, useEffect, useMemo } from "react";
import { observer } from "mobx-react-lite";
import { toJS } from "mobx";
import debounce from "lodash/debounce";

import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";

import { Search } from "@src/store/search";

interface Props {
	search: Search;
}

const SearchBar: FC<Props> = observer(({ search }) => {
	const onChange = async (
		e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		if (e.target.value) {
			search.setQuery(e.target.value);
			await search.searchGitHub();
		} else {
			search.setSearchResultToDefault();
			search.setError("", true);
		}
	};

	const debouncedOnChangeHandler = useMemo(
		() => debounce(onChange, 500),
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[search]
	);

	// Stop the invocation of the debounced function after unmounting.
	useEffect(() => {
		return () => debouncedOnChangeHandler.cancel();
	});

	return (
		<TextField
			fullWidth
			id="search-query"
			label="Query"
			variant="outlined"
			onChange={debouncedOnChangeHandler}
			error={!toJS(search.validation).isValid}
			helperText={
				toJS(search.validation).errorMessage || (
					<Link
						href="https://docs.github.com/en/search-github/getting-started-with-searching-on-github/understanding-the-search-syntax"
						rel="noopener"
						target="_blank"
						underline="hover"
					>
						Understanding GitHub Search syntax
					</Link>
				)
			}
		/>
	);
});

export default SearchBar;
