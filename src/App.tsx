import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./clients/queryClient";
import { RateExchanger } from "./components/RateExchanger/RateExchanger";
import { Container } from "@chakra-ui/react";

export default function App() {
  return (
    <Container p={10}>
      <QueryClientProvider client={queryClient}>
        <RateExchanger />
      </QueryClientProvider>
    </Container>
  );
}
