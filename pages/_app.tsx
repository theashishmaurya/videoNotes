import "@/styles/globals.css";
import type { AppProps } from "next/app";
import "antd/dist/reset.css";
import Authenticatedlayout from "@/components/layout/Authenticated.Layout";
import { useRouter } from "next/router";

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
    return <Component {...pageProps} />;
  }
  return (
    <Authenticatedlayout>
      <Component {...pageProps} />
    </Authenticatedlayout>
  );
}
