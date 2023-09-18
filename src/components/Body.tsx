import { Box, Button, useDisclosure } from "@chakra-ui/react";
import MainTable from "./MainTable";
import MainChart from "./MainChart";
import AddInvestmentModal from "./AddInvestmentModal";
import { PortfolioState, User } from "../interfaces/user";

interface BodyProps {
  user?: User;
}

interface ChartDataPoint {
  x: Date;
  y: number;
}
interface ChartData {
  id: string;
  data: Array<ChartDataPoint>;
}

const toChartData = (pStates: Array<PortfolioState>): Array<ChartData> => {
  return [
    {
      id: "portfolioData",
      data: pStates.map((ps) => ({
        //@ts-ignore
        x: new Date(parseInt(ps.timestamp["date"]["numberLong"])), // Convert timestamp to a Date object
        y: ps.portfolio.totalValue,
      })),
    },
  ];
};

export default function Body(props: BodyProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  console.log(props.user);

  if (!props.user) {
    return <>Please login to continue</>;
  }

  const ch_data = toChartData(props.user.portfolioStates);

  return (
    <Box flex="1" flexDir="column">
      <Button m="1em" onClick={onOpen}>
        Add Investment
      </Button>
      <MainTable portfolio={props.user.portfolio} />
      <div style={{ height: "400px" }}>
        <MainChart data={ch_data} />
      </div>
      <AddInvestmentModal isOpen={isOpen} onClose={onClose} />
    </Box>
  );
}
