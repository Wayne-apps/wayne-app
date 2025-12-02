import type { Data } from "@/functions/parseCnbTxt";
import { Box, Span, Table } from "@chakra-ui/react";
import { RateFlag } from "../RateFlag/RateFlag";

interface Props {
  rates: Data;
}

const RatesTable = ({ rates }: Props) => {
  return (
    <Box my={5}>
      <h2>{rates?.date}</h2>
      <Table.Root size="sm" showColumnBorder>
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeader>Country</Table.ColumnHeader>
            <Table.ColumnHeader>Currency</Table.ColumnHeader>
            <Table.ColumnHeader>Code</Table.ColumnHeader>
            <Table.ColumnHeader>Rate</Table.ColumnHeader>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {rates?.rates.map((r) => (
            <Table.Row key={r.code}>
              <Table.Cell>
                <RateFlag rate={r} />
                <Span marginStart={2}>{r.country}</Span>
              </Table.Cell>
              <Table.Cell>{r.currency}</Table.Cell>
              <Table.Cell>{r.code}</Table.Cell>
              <Table.Cell>{r.rate}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </Box>
  );
};

export default RatesTable;
