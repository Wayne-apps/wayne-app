import { NumberInput } from "@chakra-ui/react";

interface Props {
  onChange: (value: number) => void;
}

const RateValue = ({ onChange }: Props) => {
  return (
    <NumberInput.Root
      min={1}
      width="200px"
      defaultValue="1"
      onValueChange={(details) => {
        const num = details.valueAsNumber;
        if (!isNaN(num)) {
          onChange(num);
        }
      }}
    >
      <NumberInput.Control />
      <NumberInput.Input />
    </NumberInput.Root>
  );
};

export default RateValue;
