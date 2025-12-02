import { render, screen } from "@testing-library/react";
import RatesTable from "./RatesTable";
import { vi } from "vitest";
import { Provider } from "../ui/provider";

// Mock RateFlag
vi.mock("../RateFlag/RateFlag", () => ({
  RateFlag: ({ rate }: any) => <span data-testid="flag">{rate?.code}</span>,
}));

const renderWithChakra = (ui: React.ReactElement) =>
  render(<Provider>{ui}</Provider>);

const mockData = {
  date: "01 Dec 2025",
  rates: [
    {
      code: "USD",
      rate: 45,
      country: "United States",
      currency: "dollar",
      amount: 1,
    },
    { code: "EUR", rate: 50, country: "Europe", currency: "euro", amount: 1 },
  ],
};

describe("RatesTable", () => {
  it("renders table header and date", () => {
    renderWithChakra(<RatesTable rates={mockData} />);

    expect(screen.getByText("01 Dec 2025")).toBeInTheDocument();
    expect(screen.getByText("Country")).toBeInTheDocument();
    expect(screen.getByText("Currency")).toBeInTheDocument();
    expect(screen.getByText("Code")).toBeInTheDocument();
    expect(screen.getByText("Rate")).toBeInTheDocument();
  });

  it("renders all rates correctly", () => {
    renderWithChakra(<RatesTable rates={mockData} />);

    // Check RateFlag rendered
    const flags = screen.getAllByTestId("flag");
    expect(flags).toHaveLength(mockData.rates.length);
    expect(flags[0]).toHaveTextContent("USD");
    expect(flags[1]).toHaveTextContent("EUR");

    // Check table cells
    expect(screen.getByText("United States")).toBeInTheDocument();
    expect(screen.getByText("Europe")).toBeInTheDocument();
    expect(screen.getByText("dollar")).toBeInTheDocument();
    expect(screen.getByText("euro")).toBeInTheDocument();
    expect(screen.getByText("45")).toBeInTheDocument();
    expect(screen.getByText("50")).toBeInTheDocument();
  });
});
