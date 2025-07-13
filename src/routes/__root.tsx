import {createRootRouteWithContext, HeadContent, Outlet, Scripts,} from "@tanstack/react-router";
import {TanStackRouterDevtools} from "@tanstack/react-router-devtools";

import TanStackQueryLayout from "../integrations/tanstack-query/layout.tsx";

import appCss from "../styles.css?url";

import {ThemeProvider} from "@/data/providers/theme-provider.tsx";
import type {QueryClient} from "@tanstack/react-query";
import type {ReactNode} from "react";

interface MyRouterContext {
	queryClient: QueryClient;
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
	head: () => ({
		meta: [
			{
				charSet: "utf-8",
			},
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1",
			},
			{
				title: "Gym application",
			},
		],
		links: [
			{
				rel: "stylesheet",
				href: appCss,
			},
		],
	}),

	component: () => (
		<RootDocument>
			<ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
				<Outlet />
				<TanStackRouterDevtools />

				<TanStackQueryLayout />
			</ThemeProvider>
		</RootDocument>
	),
});

function themeScript(
	storageKey: string,
	defaultTheme: "light" | "dark" | "system" = "system",
) {
	return `
(function() {
	try {
		var theme = localStorage.getItem('${storageKey}') || '${defaultTheme}';
		var systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
		var cl = document.documentElement.classList;
		cl.remove('light', 'dark');
		if (theme === 'system') {
			cl.add(systemTheme);
		} else {
			cl.add(theme);
		}
	} catch(e){}
})();
`.trim();
}

function RootDocument({ children }: { children: ReactNode }) {
	return (
		<html lang="en">
			<head>
				<script
					// biome-ignore lint/security/noDangerouslySetInnerHtml: nevim jak jinak zastavit flashovani themes
					dangerouslySetInnerHTML={{
						__html: themeScript("vite-ui-theme", "dark"),
					}}
				/>
				<HeadContent />
			</head>
			<body>
				{children}
				<Scripts />
			</body>
		</html>
	);
}
