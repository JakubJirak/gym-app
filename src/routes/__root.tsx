import {
  HeadContent,
  Link,
  Outlet,
  Scripts,
  createRootRouteWithContext,
} from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";

import TanStackQueryLayout from "../integrations/tanstack-query/layout.tsx";

import { Button } from "@/components/ui/button.tsx";
import { ThemeProvider, useTheme } from "@/data/providers/theme-provider.tsx";
import { getUserSession } from "@/lib/auth-server.ts";
import { getThemeServerFn } from "@/lib/theme.ts";
import type { QueryClient } from "@tanstack/react-query";
import type { ReactNode } from "react";
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
        title: "Gym tracker",
      },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
    ],
  }),
  beforeLoad: async () => {
    const session = await getUserSession();
    return { session };
  },
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
  notFoundComponent: () => {
    return (
      <>
        <p className="mt-10 mb-5 text-red-500 text-center">
          Tato stránka nebyla nalezena
        </p>
        <div className="flex items-center justify-center">
          <Link to={"/"}>
            <Button>Domovská stránka</Button>
          </Link>
        </div>
      </>
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
