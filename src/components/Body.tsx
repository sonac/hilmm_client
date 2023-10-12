import { Box, Button, useDisclosure } from "@chakra-ui/react";
import MainTable from "./MainTable";
import MainChart from "./MainChart";
import AddInvestmentModal from "./AddInvestmentModal";
import { User } from "../interfaces/user";

interface BodyProps {
  user?: User;
}

export default function Body(props: BodyProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  console.log(props.user);

  if (!props.user) {
    return <>Please login to continue</>;
  }

  return (
    <Box flex="1" flexDir="column">
      <Button m="1em" onClick={onOpen}>
        Add Investment
      </Button>
      {!(props.user.portfolio.userAssets.length > 0) ? (
        <></>
      ) : (
        <div>
          <MainTable portfolio={props.user.portfolio} />
          <div style={{ height: "400px" }}>
            <MainChart
              invested={props.user.portfolio.userAssets
                .map((x) => x.invested)
                .reduce((x, y) => x + y)}
            />
          </div>
        </div>
      )}
      <AddInvestmentModal isOpen={isOpen} onClose={onClose} />
    </Box>
  );
}
