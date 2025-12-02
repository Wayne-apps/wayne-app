import { render, screen } from "@testing-library/react";
import RateResult from "./RateResult";
import type { RateQuery } from "../RateExchanger/RateExchanger";
import { vi } from "vitest";
import { Provider } from "../ui/provider";

// Mock ReactCountryFlag to just render countryCode in a span
vi.mock("react-country-flag", () => ({
  default: (props: any) => <span data-testid="flag">{props.countryCode}</span>,
}));

describe("RateResult", () => {
  it("renders nothing if rate is undefined", () => {
    const rateQuery: RateQuery = { rate: undefined as any, value: 10 };
    const { container } = render(<RateResult rateQuery={rateQuery} />);
    expect(container).toBeEmptyDOMElement();
  });

  it("renders correct result and flag for a valid rateQuery", () => {
    const rateQuery: RateQuery = {
      rate: {
        code: "USD",
        rate: 45,
        country: "USA",
        currency: "Dollar",
        amount: 1,
      },
      value: 10,
    };

    render(
      <Provider>
        <RateResult rateQuery={rateQuery} />
      </Provider>
    );

    // The computed result is 45 * 10 = 450.00
    expect(screen.getByText("450.00")).toBeInTheDocument();

    // The CZ flag should be rendered
    expect(screen.getByTestId("flag")).toHaveTextContent("CZ");

    // CZK text should be present
    expect(screen.getByText("CZK")).toBeInTheDocument();
  });
});
