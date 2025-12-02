import ReactCountryFlag from "react-country-flag";
import type { RateQuery } from "../RateExchanger/RateExchanger";
import { Span } from "@chakra-ui/react";

interface Props {
  rateQuery: RateQuery;
}

const RateResult = ({ rateQuery }: Props) => {
  if (!rateQuery.rate) return null;
  const result = rateQuery.rate.rate * rateQuery.value;
  return (
    <div>
      <Span>{result.toFixed(2)}</Span>
      <ReactCountryFlag
        countryCode="CZ"
        svg
        style={{ width: "1em", height: "1em", marginLeft: "0.5em" }}
      />
      CZK
    </div>
  );
};

export default RateResult;
