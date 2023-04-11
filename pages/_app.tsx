import "@/styles/globals.css";
import type { AppProps } from "next/app";
import "antd/dist/reset.css";
import Authenticatedlayout from "@/components/layout/Authenticated.Layout";
import { useRouter } from "next/router";
import UnAuthenticatedLayout from "@/components/layout/UnAuthenticated.Layout";
import { Provider } from "react-redux";
import { useEffect } from "react";
import { UserContext, UserProvider } from "@/context/userContext";

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

  if (UnAuthenticatedRoutes.includes(router.pathname)) {
    return (
      <UnAuthenticatedLayout>
        <Component {...pageProps} />;
      </UnAuthenticatedLayout>
    );
  }
  return (
    <UserProvider>
      <Authenticatedlayout>
        <Component {...pageProps} />
      </Authenticatedlayout>
    </UserProvider>
  );
}
