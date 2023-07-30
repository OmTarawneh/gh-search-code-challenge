import type { Metadata } from "next";
import type { ReactNode } from "react";

import { ErrorBoundary } from "react-error-boundary";

import ErrorBoundaryFallback from "@src/components/ErrorBoundaryFallback";
import ThemeRegistry from "@src/components/Theme/Registry";

export const metadata: Metadata = {
	title: "GitHub Search",
	description: "GitHub Search Code Challenge",
};

export default function RootLayout({ children }: { children: ReactNode }) {
	return (
		<html lang="en">
			<body>
				<ThemeRegistry>
					<ErrorBoundary fallbackRender={ErrorBoundaryFallback}>
						{children}
					</ErrorBoundary>
				</ThemeRegistry>
			</body>
		</html>
	);
}
