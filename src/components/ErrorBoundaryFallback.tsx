"use client";

import { FC } from "react";

import { FallbackProps } from "react-error-boundary";

import Alert from "@mui/material/Alert";
import { AlertTitle } from "@mui/material";

const ErrorBoundaryFallback: FC<FallbackProps> = ({ error }) => {
	return (
		<Alert severity="error">
			<AlertTitle>Error - Something Went Wrong</AlertTitle>
			{error.message}
		</Alert>
	);
};

export default ErrorBoundaryFallback;
