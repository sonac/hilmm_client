import { Box, Flex } from "@chakra-ui/react";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import Body from "./components/Body";

import useSWR from "swr";
import { snakeToCamel } from "./utils/camelize";

const emailFetcher = async () => {
  const r = await fetch(`http://0.0.0.0:8000/api/validate`, {
    method: "GET",
    credentials: "include",
  });

  if (r.status != 200) {
    return undefined;
  }

  return await r.json();
};

function App() {
  const { data, error, isLoading } = useSWR("email", emailFetcher);
  const isAuthenticated = !(data === null || data === undefined);

  return (
    <Flex minH="100vh">
      <Sidebar username={isAuthenticated ? data.email : null} />
      <Box flex="1">
        <Header />
        <Body user={snakeToCamel(data)} />
      </Box>
    </Flex>
  );
}

export default App;
