import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Text,
  Button,
  useDisclosure,
} from "@chakra-ui/react";
import { Asset, UserPortfolio, UserAsset } from "../interfaces/user";
import { snakeToCamel } from "../utils/camelize";
import AddInvestmentModal from "./AddInvestmentModal";
import { useState } from "react";

interface MainTableProps {
  portfolio?: UserPortfolio;
}

export default function MainTable(props: MainTableProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [invName, setInvName] = useState("");
  const [tickerName, setTickerName] = useState("");

  if (!props.portfolio) {
    return <Text>Add some investment to see them below</Text>;
  }

  const sellAsset = async (assetName: string) => {
    const assetBody = {
      asset_name: assetName,
    };
    await fetch(`/api/asset`, {
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
  const totalInvested: number = portfolio.userAssets
    .map((x) => x.invested)
    .reduce((a, b) => a + b);
  const totalAsset: Asset = { name: "Total", ticker: "", price: -1 };
  const totalLine: UserAsset = {
    asset: totalAsset,
    amount: -1,
    currentValue: portfolio.totalValue,
    invested: totalInvested,
  };

  const userAssets = [...portfolio.userAssets, totalLine];

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
            <Th borderWidth="1px" isNumeric>
              Invested
            </Th>
            <Th borderWidth="1px" isNumeric>
              Profit
            </Th>
            <Th borderWidth="1px" w={"5em"}>
              Buy
            </Th>
            <Th borderWidth="1px" w={"5em"}>
              Sell
            </Th>
          </Tr>
        </Thead>
        <Tbody>
          {userAssets.map((ast: UserAsset) => {
            return (
              <Tr key={`${ast.asset.name}_row`}>
                <Td borderWidth="1px" key={ast.asset.name}>
                  {ast.asset.name}
                </Td>
                <Td borderWidth="1px" key={ast.asset.ticker}>
                  {ast.asset.ticker}
                </Td>
                <Td borderWidth="1px" key={ast.asset.price} isNumeric>
                  {ast.asset.price > 0 ? ast.asset.price : ""}
                </Td>
                <Td borderWidth="1px" isNumeric key={ast.currentValue}>
                  {ast.currentValue}
                </Td>
                <Td borderWidth="1px" isNumeric key={ast.invested}>
                  {ast.invested.toFixed(2)}
                </Td>
                <Td
                  borderWidth="1px"
                  isNumeric
                  key={ast.currentValue - ast.invested}
                  color={ast.currentValue - ast.invested > 0 ? "green" : "red"}
                >
                  {(ast.currentValue - ast.invested).toFixed(2)}
                </Td>
                <Td key={`${ast.asset.name}_buy_key`}>
                  <Button
                    key={`${ast.asset.name}_buy_button`}
                    variant="solid"
                    colorScheme="green"
                    onClick={() => {
                      setInvName(ast.asset.name);
                      setTickerName(ast.asset.ticker);
                      onOpen();
                    }}
                  >
                    Buy
                  </Button>
                </Td>
                <Td key={`${ast.asset.name}_key`}>
                  <Button
                    key={`${ast.asset.name}_sell_button`}
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
      <AddInvestmentModal
        isOpen={isOpen}
        onClose={onClose}
        investmentName={invName}
        investmentTickerName={tickerName}
      />
    </TableContainer>
  );
}
