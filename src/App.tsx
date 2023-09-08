import { Box, Flex } from "@chakra-ui/react";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import Body from "./components/Body";

import useSWR from "swr";

const emailFetcher = async () => {
  const r = await fetch(`http://localhost:8000/api/validate`, {
    method: "GET",
    credentials: "include",
  });

  if (r.status != 200) {
    return undefined;
  }

  return await r.text();
};

function App() {
  const { data, error, isLoading } = useSWR("email", emailFetcher);

  return (
    <Flex minH="100vh">
      <Sidebar username={data} />
      <Box flex="1">
        <Header />
        <Body />
      </Box>
    </Flex>
  );
}

export default App;
