import { render, screen } from "@testing-library/react";
import RateSelector from "./RateSelector";
import { useRates } from "@/hooks/useRates";
import { vi } from "vitest";

import { Provider } from "../ui/provider";

// Mock useRates hook
vi.mock("@/hooks/useRates", () => ({
  useRates: vi.fn(),
}));

// Mock RateFlag to render a span
vi.mock("../RateFlag/RateFlag", () => ({
  RateFlag: ({ rate }: any) => <span data-testid="flag">{rate?.code}</span>,
}));

// Helper to render with ChakraProvider
const renderWithProvider = (ui: React.ReactElement) =>
  render(<Provider>{ui}</Provider>);

describe("RateSelector", () => {
  const mockRates = [
    { code: "USD", rate: 1, country: "USA", currency: "Dollar", amount: 1 },
    { code: "EUR", rate: 0.9, country: "Europe", currency: "Euro", amount: 1 },
  ];

  const mockedUseRates = vi.mocked(useRates, { partial: true });

  it("renders nothing if useRates returns error", () => {
    mockedUseRates.mockReturnValue({
      data: undefined,
      error: { name: "Error", message: "fail" },
    });
    const { container } = renderWithProvider(
      <RateSelector selectedRate={mockRates[0]} onSelectRate={() => {}} />
    );
    expect(container.querySelector("button")).toBeNull();
    expect(container.querySelector("div")).toBeNull();
  });

  it("renders button with selected rate", () => {
    mockedUseRates.mockReturnValue({
      data: { date: "01 Dec 2025", rates: mockRates },
      error: undefined,
    });
    renderWithProvider(
      <RateSelector selectedRate={mockRates[0]} onSelectRate={() => {}} />
    );

    // RateFlag
    expect(screen.getByTestId("flag")).toHaveTextContent("USD");

    // Button text
    const button = screen.getByRole("button");
    expect(button).toHaveTextContent("USD");
  });
});
