import { parseCnbTxt, type Data } from "./parseCnbTxt";
import { describe, it, expect } from "vitest";

const sampleTxt = `
02 Dec 2025 # some comment
Country|Currency|Amount|Code|Rate
Australia|dollar|1|AUD|45.12
Eurozone|euro|1|EUR|50.34
`;

describe("parseCnbTxt", () => {
  it("parses CNB txt into Data object", () => {
    const result: Data = parseCnbTxt(sampleTxt);

    expect(result.date).toBe("02 Dec 2025");
    expect(result.rates).toHaveLength(2);

    expect(result.rates[0]).toEqual({
      country: "Australia",
      currency: "dollar",
      amount: 1,
      code: "AUD",
      rate: 45.12,
    });

    expect(result.rates[1]).toEqual({
      country: "Eurozone",
      currency: "euro",
      amount: 1,
      code: "EUR",
      rate: 50.34,
    });
  });

  it("trims whitespace correctly", () => {
    const messyTxt =
      " 03 Dec 2025 #comment\nCountry|Currency|Amount|Code|Rate\nUSA|dollar|1|USD|46.78 ";
    const result = parseCnbTxt(messyTxt);

    expect(result.date).toBe("03 Dec 2025");
    expect(result.rates[0].country).toBe("USA");
    expect(result.rates[0].rate).toBe(46.78);
  });
});
