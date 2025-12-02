import { parseCnbTxt, type Data } from "@/functions/parseCnbTxt";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export function useRates() {
  return useQuery({
    queryKey: ["cnb-rates"],
    queryFn: async (): Promise<Data> => {
      const res = await axios.get(
        "/cnb/en/financial-markets/foreign-exchange-market/central-bank-exchange-rate-fixing/central-bank-exchange-rate-fixing/daily.txt",
        {
          responseType: "text",
          headers: { "Cache-Control": "no-cache" },
          params: { t: Date.now() },
        }
      );

      if (
        res.data.startsWith("<!DOCTYPE html>") ||
        res.data.includes("<html")
      ) {
        throw new Error("CNB TXT not found, got HTML instead");
      }

      return parseCnbTxt(res.data);
    },
    staleTime: 1000 * 60 * 60 * 24,
    refetchInterval: 1000 * 60 * 60 * 24,
  });
}
