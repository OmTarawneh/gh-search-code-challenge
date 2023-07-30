import { FC } from "react";

import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Skeleton from "@mui/material/Skeleton";

const ItemsLoadingSkeleton: FC = () => {
	return (
		<>
			{[1, 2, 3].map((el) => (
				<ListItemButton key={el}>
					<ListItemIcon>
						<Skeleton
							data-testid="loading-skeleton"
							animation="wave"
							variant="circular"
							width={40}
							height={40}
						/>
					</ListItemIcon>
					<ListItemText
						primary={<Skeleton data-testid="loading-skeleton-primary" />}
						secondary={<Skeleton data-testid="loading-skeleton-secondary" />}
					/>
				</ListItemButton>
			))}
		</>
	);
};

export default ItemsLoadingSkeleton;
