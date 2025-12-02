import type { Rate } from "@/functions/parseCnbTxt";
import ReactCountryFlag from "react-country-flag";

interface Props {
  rate: Rate;
}

export const RateFlag = ({ rate }: Props) => {
  if (!rate) return null;

  const flagMap: { [key: string]: string } = {
    AUD: "AU",
    BRL: "BR",
    BGN: "BG",
    CAD: "CA",
    CNY: "CN",
    DKK: "DK",
    EUR: "EU",
    HKD: "HK",
    HUF: "HU",
    ISK: "IS",
    XDR: "IMF",
    INR: "IN",
    IDR: "ID",
    ILS: "IL",
    JPY: "JP",
    MYR: "MY",
    MXN: "MX",
    NZD: "NZ",
    NOK: "NO",
    PHP: "PH",
    PLN: "PL",
    RON: "RO",
    SGD: "SG",
    ZAR: "ZA",
    KRW: "KR",
    SEK: "SE",
    CHF: "CH",
    THB: "TH",
    TRY: "TR",
    GBP: "GB",
    USD: "US",
  };

  return (
    <ReactCountryFlag
      countryCode={flagMap[rate.code]}
      svg
      style={{ width: "1em", height: "1em" }}
    />
  );
};
