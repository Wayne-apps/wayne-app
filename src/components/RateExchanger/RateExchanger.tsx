import RateSelector from "../RateSelector/RateSelector";
import { useEffect, useState } from "react";
import type { Rate } from "@/functions/parseCnbTxt";
import RateValue from "../RateValue/RateValue";
import RateResult from "../RateResult/RateResult";
import { useRates } from "@/hooks/useRates";
import { Box, AbsoluteCenter, HStack } from "@chakra-ui/react";
import RatesTable from "../RatesTable/RatesTable";

export interface RateQuery {
  rate: Rate;
  value: number;
}

export function RateExchanger() {
  const { data, error } = useRates();
  const [rateQuery, setRateQuery] = useState<RateQuery>({
    value: 1,
    rate: undefined as any,
  });

  useEffect(() => {
    if (data && !rateQuery.rate) {
      setRateQuery((prev) => ({
        ...prev,
        rate: data.rates[0],
      }));
    }
  }, [data]);

  if (!data) return <h2>{error?.message}</h2>;

  return (
    <>
      <Box position="relative" h="100px" bg="bg.muted" borderRadius="md">
        <AbsoluteCenter>
          <Box px="4" py="2" borderRadius="md" color="ButtonBorder">
            <HStack gap={10}>
              <RateSelector
                selectedRate={rateQuery.rate}
                onSelectRate={(rate: Rate) =>
                  setRateQuery({ ...rateQuery, rate })
                }
              />
              <RateValue
                onChange={(value: number) =>
                  setRateQuery({ ...rateQuery, value })
                }
              />
              <RateResult rateQuery={rateQuery} />
            </HStack>
          </Box>
        </AbsoluteCenter>
      </Box>
      <RatesTable rates={data} />
    </>
  );
}
