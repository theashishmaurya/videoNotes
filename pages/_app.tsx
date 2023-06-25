import type { AppProps } from "next/app";
import "antd/dist/reset.css";
import Authenticatedlayout from "@/components/layout/Authenticated.Layout";
import { useRouter } from "next/router";
import UnAuthenticatedLayout from "@/components/layout/UnAuthenticated.Layout";

import { UserContext, UserProvider } from "@/context/userContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Analytics } from "@vercel/analytics/react";
import { ConfigProvider } from "antd";
import "@/styles/globals.css";

const UnAuthenticatedRoutes = [
  "/login",
  "/register",
  "/forgot-password",
  "/reset-password",
  "/verify-email",
  "/verify-email-success",
  "/",
];

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const queryClient = new QueryClient();

  if (UnAuthenticatedRoutes.includes(router.pathname)) {
    return (
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: "#000000",

            fontFamily: "Poppins" /* "Poppins" */,
          },
        }}
      >
        <UnAuthenticatedLayout>
          <Component {...pageProps} />;
          <Analytics />
        </UnAuthenticatedLayout>
      </ConfigProvider>
    );
  }
  return (
    <QueryClientProvider client={queryClient}>
      <UserProvider>
        <ConfigProvider
          theme={{
            token: {
              colorPrimary: "#000000",
            },
          }}
        >
          <Authenticatedlayout>
            <Component {...pageProps} />
            <Analytics />
          </Authenticatedlayout>
        </ConfigProvider>
      </UserProvider>
    </QueryClientProvider>
  );
}
