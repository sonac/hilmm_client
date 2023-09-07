import { Box, Flex } from "@chakra-ui/react" 
import Sidebar from "./components/Sidebar"
import Header from "./components/Header"
import Body from "./components/Body"

function App() {

  return (
    <Flex minH="100vh">
      <Sidebar />
      <Box flex="1">
        <Header />
        <Body />
      </Box>
    </Flex>
  )
}

export default App
