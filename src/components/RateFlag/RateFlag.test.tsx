import { render, screen } from "@testing-library/react";
import { RateFlag } from "./RateFlag";
import type { Rate } from "@/functions/parseCnbTxt";

describe("RateFlag", () => {
  it("renders nothing when rate is undefined", () => {
    const { container } = render(
      <RateFlag rate={undefined as unknown as Rate} />
    );
    expect(container).toBeEmptyDOMElement();
  });

  it("renders the correct flag image for USD", () => {
    const rate: Rate = {
      code: "USD",
      rate: 1,
      country: "USA",
      currency: "Dollar",
      amount: 1,
    };
    render(<RateFlag rate={rate} />);
    const img = screen.getByRole("img") as HTMLImageElement;
    expect(img.src).toContain("/us.svg");
    expect(img.style.width).toBe("1em");
    expect(img.style.height).toBe("1em");
  });

  it("renders the correct flag image for AUD", () => {
    const rate: Rate = {
      code: "AUD",
      rate: 1,
      country: "Australia",
      currency: "Dollar",
      amount: 1,
    };
    render(<RateFlag rate={rate} />);
    const img = screen.getByRole("img") as HTMLImageElement;
    expect(img.src).toContain("/au.svg");
  });

  it("renders nothing if code is unknown", () => {
    const rate: Rate = {
      code: "ABC",
      rate: 1,
      country: "Unknown",
      currency: "Unknown",
      amount: 1,
    };
    const { container } = render(<RateFlag rate={rate} />);
    expect(container).toBeEmptyDOMElement();
  });
});
