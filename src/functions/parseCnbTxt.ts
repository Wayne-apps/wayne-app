export interface Rate {
  country: string;
  currency: string;
  amount: number;
  code: string;
  rate: number;
}

export interface Data {
  date: string;
  rates: Rate[];
}

export function parseCnbTxt(txt: string): Data {
  const lines = txt.trim().split("\n");

  const dateLine = lines[0].trim();
  const date = dateLine.split("#")[0].trim();

  const rows = lines.slice(2);

  const rates = rows.map((line) => {
    const [country, currency, amount, code, rate] = line.split("|");

    return {
      country,
      currency,
      amount: Number(amount),
      code,
      rate: Number(rate),
    };
  });

  return { date, rates };
}
