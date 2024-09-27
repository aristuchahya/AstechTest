import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import App from "./App";
import { Toaster } from "sonner";

export function Provider() {
  const client = new QueryClient();
  return (
    <>
      <QueryClientProvider client={client}>
        <App />
        <Toaster />
      </QueryClientProvider>
    </>
  );
}
