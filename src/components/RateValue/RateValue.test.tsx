import { Provider } from "../ui/provider";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import RateValue from "./RateValue";
import { vi } from "vitest";

const renderWithChakra = (ui: React.ReactElement) =>
  render(<Provider>{ui}</Provider>);

describe("RateValue", () => {
  it("calls onChange when value changes", async () => {
    const onChange = vi.fn();
    renderWithChakra(<RateValue onChange={onChange} />);

    const input = screen.getByRole("spinbutton") as HTMLInputElement;

    const user = userEvent.setup();
    await user.clear(input);
    await user.type(input, "5");

    expect(onChange).toHaveBeenCalledWith(5);
  });
});
