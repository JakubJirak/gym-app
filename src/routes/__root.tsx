import {createRootRouteWithContext, HeadContent, Outlet, Scripts,} from "@tanstack/react-router";
import {TanStackRouterDevtools} from "@tanstack/react-router-devtools";

import TanStackQueryLayout from "../integrations/tanstack-query/layout.tsx";

import {ThemeProvider, useTheme} from "@/data/providers/theme-provider.tsx";
import {getThemeServerFn} from "@/lib/theme.ts";
import type {QueryClient} from "@tanstack/react-query";
import type {ReactNode} from "react";
import appCss from "../styles.css?url";

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
  loader: () => getThemeServerFn(),

  component: () => {
    const data = Route.useLoaderData();
    return (
      <ThemeProvider theme={data}>
        <RootDocument>
          <Outlet />
          <TanStackRouterDevtools />

          <TanStackQueryLayout />
        </RootDocument>
      </ThemeProvider>
    );
  },
});

function RootDocument({ children }: { children: ReactNode }) {
  const { theme } = useTheme();
  return (
    <html lang="en" className={theme}>
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}
