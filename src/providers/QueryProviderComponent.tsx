import React from "react";
import { QueryClientProvider } from "@tanstack/react-query";
import { client } from "../config/QueryClient";

const QueryProviderComponent = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
};

export default QueryProviderComponent;
