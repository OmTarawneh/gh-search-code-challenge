"use client";

import { ReactNode } from "react";

import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

import NextAppDirEmotionCacheProvider from "@src/components/Theme/EmotionCache";
import theme from "@src/components/Theme/theme";

export default function ThemeRegistry({ children }: { children: ReactNode }) {
	return (
		<NextAppDirEmotionCacheProvider options={{ key: "mui" }}>
			<ThemeProvider theme={theme}>
				<CssBaseline />
				{children}
			</ThemeProvider>
		</NextAppDirEmotionCacheProvider>
	);
}
