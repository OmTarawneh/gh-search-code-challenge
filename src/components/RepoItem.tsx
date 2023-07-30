import { Case, Default, Switch } from "react-if";
import { FC, useState } from "react";
import useSWR from "swr";

import Chip from "@mui/material/Chip";
import Collapse from "@mui/material/Collapse";
import Divider from "@mui/material/Divider";
import GitHubIcon from "@mui/icons-material/GitHub";
import Grid from "@mui/material/Grid";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";

import { formatDate } from "@src/utils/formatDate";
import { octokit } from "@src/store/search";
import { SearchReposType, SearchUsersType } from "@src/store/search";
import ItemsLoadingSkeleton from "@src/components/ItemsLoadingSkeleton";
import UserItem from "@src/components/UserItem";

interface Props {
	repo: SearchReposType["items"][0];
}

const fetcher = (url: string) => octokit.request(url).then((res) => res.data);

const RepoItem: FC<Props> = ({ repo }) => {
	const [open, setOpen] = useState(false);
	const [forkUsers, setForkUser] = useState<SearchUsersType["items"][0][]>();
	const [isFetchUserLoading, setIsFetchUserLoading] = useState(false);

	const { data, error } = useSWR<Record<string, number>>(
		repo.languages_url,
		fetcher
	);

	const handleClick = async () => {
		setOpen((prev) => !prev);
		setIsFetchUserLoading(true);

		// last three users that forked the repo, sort is default to newest.
		const repos = await octokit
			.request(`${repo.forks_url}?per_page=3`)
			.then((res) => res.data)
			.catch(() => setForkUser(undefined));
		setForkUser(
			repos?.map((repo: { owner: SearchUsersType["items"][0] }) => repo.owner)
		);
		setIsFetchUserLoading(false);
	};

	return (
		<>
			<ListItemButton onClick={handleClick} data-testid="repo-item-button">
				<ListItemIcon>
					<GitHubIcon />
				</ListItemIcon>
				<ListItemText
					primary={repo.full_name}
					secondary={`Created at: ${formatDate(repo.created_at)}`}
				/>
				<ListItemIcon>
					<Grid container justifyContent="flex-end" spacing={1}>
						{data &&
							!error &&
							Object.keys(data).map((lang) => (
								<Grid key={lang} item>
									<Chip label={lang} color="success" />
								</Grid>
							))}
					</Grid>
				</ListItemIcon>
			</ListItemButton>
			<Collapse in={open} timeout="auto" unmountOnExit>
				<List
					component="div"
					disablePadding
					subheader={
						<ListSubheader component="div" id="nested-list-subheader">
							Last 3 Users Forked The Repo
						</ListSubheader>
					}
				>
					<Switch>
						<Case condition={isFetchUserLoading}>
							<ItemsLoadingSkeleton />
						</Case>
						<Case condition={!!forkUsers}>
							{forkUsers?.map((user) => (
								<UserItem key={user.id} user={user} />
							))}
						</Case>
					</Switch>
				</List>
			</Collapse>

			<Divider variant="inset" component="li" />
		</>
	);
};

export default RepoItem;
