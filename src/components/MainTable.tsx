import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Text,
} from "@chakra-ui/react";
import { UserPortfolio, UserAsset } from "../interfaces/user";
import { snakeToCamel } from "../utils/camelize";

interface MainTableProps {
  portfolio?: UserPortfolio;
}

export default function MainTable(props: MainTableProps) {
  if (!props.portfolio) {
    return <Text>Add some investment to see them below</Text>;
  }

  const portfolio: UserPortfolio = snakeToCamel(props.portfolio);

  return (
    <TableContainer>
      <Table variant="simple" colorScheme="gray" borderWidth="1px">
        <TableCaption>Imperial to metric conversion factors</TableCaption>
        <Thead>
          <Tr>
            <Th borderWidth="1px">Asset Name</Th>
            <Th borderWidth="1px">Asset Ticker</Th>
            <Th borderWidth="1px" isNumeric>
              Current Price
            </Th>
            <Th borderWidth="1px" isNumeric>
              Current Value
            </Th>
          </Tr>
        </Thead>
        <Tbody>
          {portfolio.userAssets.map((ast: UserAsset) => {
            return (
              <Tr>
                <Td borderWidth="1px">{ast.asset.name}</Td>
                <Td borderWidth="1px">{ast.asset.ticker}</Td>
                <Td borderWidth="1px" isNumeric>
                  {ast.asset.price}
                </Td>
                <Td borderWidth="1px" isNumeric>
                  {ast.currentValue}
                </Td>
              </Tr>
            );
          })}
        </Tbody>
      </Table>
    </TableContainer>
  );
}
