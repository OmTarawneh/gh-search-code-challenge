import { FC, memo } from "react";

import Avatar from "@mui/material/Avatar";
import Divider from "@mui/material/Divider";
import Link from "@mui/material/Link";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";

import { SearchUsersType } from "@src/store/search";

interface Props {
	user: SearchUsersType["items"][0];
}

const UserItem: FC<Props> = ({ user }) => {
	return (
		<>
			<ListItem>
				<ListItem alignItems="flex-start">
					<ListItemAvatar>
						<Link href={user.html_url} target="_blank" rel="noopener">
							<Avatar alt={user.login || "user"} src={user.avatar_url} />
						</Link>
					</ListItemAvatar>
					<ListItemText
						primary={user.login}
						secondary={
							<Link href={user.html_url} target="_blank" rel="noopener">
								{user.html_url}
							</Link>
						}
					/>
				</ListItem>
			</ListItem>
			<Divider variant="inset" component="li" />
		</>
	);
};

export default memo(UserItem);
