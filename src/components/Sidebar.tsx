import { Box, Button, Flex, Spacer, useDisclosure } from "@chakra-ui/react";
import AuthModal from "./AuthModal";

export default function Sidebar() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Box w="20vw" bg="gray.200" p={4}>
      <Flex direction="column" h="100%">
        This is the Sidebar
        <Spacer />
        <Button colorScheme="teal" variant="outline" mb="2vh" onClick={onOpen}>
          Login
        </Button>
        <AuthModal isOpen={isOpen} onClose={onClose} />
      </Flex>
    </Box>
  );
}
