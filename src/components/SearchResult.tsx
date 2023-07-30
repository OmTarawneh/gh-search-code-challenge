import { Case, Default, Switch } from "react-if";
import { FC, useEffect } from "react";
import { nanoid } from "nanoid";
import { observer } from "mobx-react-lite";
import { toJS } from "mobx";
import InfiniteScroll from "react-infinite-scroll-component";

import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";

import RepoItem from "@src/components/RepoItem";
import ItemsLoadingSkeleton from "@src/components/ItemsLoadingSkeleton";
import UserItem from "@src/components/UserItem";
import {
	Search,
	SearchReposType,
	SearchResultMapType,
	SearchTypeEnum,
	SearchUsersType,
} from "@src/store/search";

interface Props {
	search: Search;
}

const getItems = (result: SearchResultMapType, type: SearchTypeEnum) =>
	toJS(result[type])?.items;

const SearchResult: FC<Props> = observer(({ search }) => {
	const items = getItems(search.searchResultMap, search.type);

	const loadMore = () => {
		search.searchGitHub();
	};

	useEffect(() => {
		// Whenever the query or search type changes, reset the page number and search results
		search.setSearchResultToDefault();
		search.resetPageNumber();
	}, [search, search.query, search.type]);

	return (
		<Container maxWidth="xl">
			<InfiniteScroll
				dataLength={items?.length || 0}
				next={loadMore}
				hasMore={items?.length < search.itemsNumber}
				loader={<ItemsLoadingSkeleton />}
			>
				<List>
					<Switch>
						<Case condition={search.loading && !items}>
							<ItemsLoadingSkeleton />
						</Case>
						<Case
							condition={
								search.type === SearchTypeEnum.repositories && items?.length
							}
						>
							{items?.map((repo) => (
								<RepoItem
									key={nanoid()}
									repo={repo as SearchReposType["items"][0]}
								/>
							))}
						</Case>
						<Case
							condition={search.type === SearchTypeEnum.users && items?.length}
						>
							{items?.map((user) => (
								<UserItem
									key={nanoid()}
									user={user as SearchUsersType["items"][0]}
								/>
							))}
						</Case>
						<Default>
							<Grid container justifyContent="center">
								<Typography variant="h4">No Result</Typography>
							</Grid>
						</Default>
					</Switch>
				</List>
			</InfiniteScroll>
		</Container>
	);
});

export default SearchResult;
