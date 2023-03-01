import "../styles/globals.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { AccountProvider } from "../contexts/AccountContext";
import ProtectedRoute from "../components/ProtectedRoute";
import useScrollRestoration from "../utils/useScrollRestoration";
import { Toaster } from "react-hot-toast";

const noAuthRequired = ["/login"];

const queryClient = new QueryClient();

function MyApp({ Component, pageProps, router }) {
  useScrollRestoration(router);
  return (
    <AccountProvider>
      {noAuthRequired.includes(router.pathname) ? (
        <QueryClientProvider client={queryClient}>
          <Component {...pageProps} />{" "}
          {/* <ReactQueryDevtools initialIsOpen={false} /> */}
        </QueryClientProvider>
      ) : (
        <ProtectedRoute>
          <QueryClientProvider client={queryClient}>
            <Component {...pageProps} />
            {/* <ReactQueryDevtools initialIsOpen={false} /> */}
          </QueryClientProvider>
        </ProtectedRoute>
      )}
      <Toaster
        position="bottom-center"
        toastOptions={{
          duration: 5000,
          style: {
            background: "#363636",
            color: "#fff",
          },
          success: {
            icon: false,
            style: {
              background: "#60a5fa",
            },
          },
          error: {
            icon: false,
            style: {
              background: "red",
            },
          },
        }}
      />
    </AccountProvider>
  );
}

export default MyApp;
