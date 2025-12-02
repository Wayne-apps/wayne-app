import type { Rate } from "@/functions/parseCnbTxt";
import { useRates } from "@/hooks/useRates";
import { Menu, Button, Portal, Text } from "@chakra-ui/react";
import { RateFlag } from "../RateFlag/RateFlag";

interface Props {
  onSelectRate: (rate: Rate) => void;
  selectedRate: Rate;
}

const RateSelector = ({ onSelectRate, selectedRate }: Props) => {
  const { data, error } = useRates();
  if (error || !data) return null;

  return (
    <Menu.Root defaultHighlightedValue={data?.rates[0]?.currency}>
      <Menu.Trigger asChild>
        <Button variant="outline" size="sm">
          <RateFlag rate={selectedRate || data?.rates[0]} />{" "}
          <Text textTransform={"capitalize"}>
            {selectedRate?.code || data?.rates[0]?.code}
          </Text>
        </Button>
      </Menu.Trigger>
      <Portal>
        <Menu.Positioner>
          <Menu.Content>
            {data?.rates.map((rate) => (
              <Menu.Item
                key={rate.code}
                value={rate.code}
                onClick={() => onSelectRate(rate)}
              >
                <RateFlag rate={rate} />
                {`${rate.code} ${rate.country.toUpperCase()}`}
              </Menu.Item>
            ))}
          </Menu.Content>
        </Menu.Positioner>
      </Portal>
    </Menu.Root>
  );
};

export default RateSelector;
