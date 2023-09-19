import { Box, Button, Flex, Spacer, useDisclosure } from "@chakra-ui/react";
import AuthModal from "./AuthModal";

interface SidebarProps {
  username?: string;
}

export default function Sidebar(props: SidebarProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const logout = async () => {
    await fetch("http://localhost:8000/api/signout", {
      method: "GET",
      credentials: "include",
    });
    location.assign("/");
  };

  return (
    <Box w="20vw" bg="gray.200" p={4}>
      <Flex direction="column" h="100%">
        <Spacer />
        {props.username ? (
          <>
            Hello, {props.username?.replaceAll('"', "")}!
            <Button onClick={logout}>Logout</Button>
          </>
        ) : (
          <Button
            colorScheme="teal"
            variant="outline"
            mb="2vh"
            onClick={onOpen}
          >
            Login
          </Button>
        )}
        <AuthModal isOpen={isOpen} onClose={onClose} />
      </Flex>
    </Box>
  );
}
