import {
  Modal,
  ModalContent,
  ModalOverlay,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  FormControl,
  FormLabel,
  Input,
  ModalFooter,
  Button,
  Grid,
  GridItem,
  Link,
} from "@chakra-ui/react";
import { useState } from "react";

export default function AuthModal({ isOpen, onClose }: any) {
  const [authType, setAuthType] = useState("Login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const switchAuthType = () =>
    authType === "Login" ? setAuthType("Register") : setAuthType("Login");

  const auth = async () => {
    const authData = {
      email: email,
      pwd: password,
    };

    const endpoint = authType === "Login" ? "signin" : "signup";

    const resp = await fetch(`/api/${endpoint}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(authData),
    });

    console.log(await resp.json());

    location.assign("/");
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Authorization</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Username</FormLabel>
              <Input
                placeholder="username@email.com"
                onChange={(e) => setEmail(e.target.value)}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Password</FormLabel>
              <Input
                placeholder="password"
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={async (k) => {
                  if (k.key == "Enter") await auth();
                }}
              />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Grid
              templateRows="repeat(2, 1fr)"
              templateColumns="repeat(4, fr)"
              w="100%"
            >
              <GridItem colSpan={2} rowSpan={1} mr="1em">
                <Button colorScheme="blue" w="100%" onClick={auth}>
                  {authType}
                </Button>
              </GridItem>
              <GridItem colSpan={2} rowSpan={1} mb="1em">
                <Button onClick={onClose} w="100%">
                  Cancel
                </Button>
              </GridItem>
              <GridItem w="100%" colSpan={4}>
                Don't have an account yet?{" "}
                <Link color="blue" onClick={switchAuthType}>
                  Register
                </Link>
              </GridItem>
            </Grid>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
