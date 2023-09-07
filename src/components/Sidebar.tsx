import {Box, Button, Flex, Spacer} from '@chakra-ui/react'

export default function Sidebar() {
  return (
    <Box w="20vw" bg="gray.200" p={4}>
      <Flex direction="column" h="100%">
      This is the Sidebar
      <Spacer />
      <Button colorScheme='teal' variant='outline' mb="2vh">Logout</Button>
      </Flex>
    </Box>
  );
};