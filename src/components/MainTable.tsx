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
  Button,
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

  const sellAsset = async (assetName: string) => {
    const assetBody = {
      asset_name: assetName,
    };
    await fetch(`http://localhost:8000/api/asset`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(assetBody),
    });

    location.assign("/");
  };

  const portfolio: UserPortfolio = snakeToCamel(props.portfolio);

  return (
    <TableContainer>
      <Table variant="simple" colorScheme="gray" borderWidth="1px">
        <TableCaption>Portfolio</TableCaption>
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
            <Th borderWidth="1px">Sell</Th>
          </Tr>
        </Thead>
        <Tbody>
          {portfolio.userAssets.map((ast: UserAsset) => {
            return (
              <Tr key={`${ast.asset.name}_row`}>
                <Td borderWidth="1px" key={ast.asset.name}>
                  {ast.asset.name}
                </Td>
                <Td borderWidth="1px" key={ast.asset.ticker}>
                  {ast.asset.ticker}
                </Td>
                <Td borderWidth="1px" key={ast.asset.price} isNumeric>
                  {ast.asset.price}
                </Td>
                <Td borderWidth="1px" isNumeric key={ast.currentValue}>
                  {ast.currentValue}
                </Td>
                <Td key={`${ast.asset.name}_key`}>
                  <Button
                    key={`${ast.asset.name}_button`}
                    variant="solid"
                    colorScheme="red"
                    onClick={() => sellAsset(ast.asset.name)}
                  >
                    Sell
                  </Button>
                </Td>
              </Tr>
            );
          })}
        </Tbody>
      </Table>
    </TableContainer>
  );
}
