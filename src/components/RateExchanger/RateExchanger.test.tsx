import { render, screen } from "@testing-library/react";
import { RateExchanger } from "./RateExchanger";
import { useRates } from "@/hooks/useRates";
import { vi } from "vitest";
import { Provider } from "../ui/provider";

// Mock the hook
vi.mock("@/hooks/useRates", () => ({
  useRates: vi.fn(),
}));

const renderWithProvider = (ui: React.ReactElement) =>
  render(<Provider>{ui}</Provider>);

describe("RateExchanger", () => {
  it("renders error message when no data", () => {
    const mockedUseRates = vi.mocked(useRates, { partial: true });
    mockedUseRates.mockReturnValue({
      data: undefined,

      error: { name: "Error", message: "No rates" },
    });

    renderWithProvider(<RateExchanger />);
    expect(screen.getByText("No rates")).toBeInTheDocument();
  });

  it("renders correctly with data", () => {
    const mockedUseRates = vi.mocked(useRates, { partial: true });
    mockedUseRates.mockReturnValue({
      data: {
        date: "01 Dec 2025",
        rates: [
          {
            code: "USD",
            rate: 45,
            country: "Australia",
            currency: "dollar",
            amount: 1,
          },
        ],
      },
    });

    renderWithProvider(<RateExchanger />);

    // pick first match if there are duplicates
    const usdElements = screen.getAllByText(/^USD$/);
    expect(usdElements[0]).toBeInTheDocument();
  });
});
