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
  Select,
} from "@chakra-ui/react";

export default function AddInvestmentModal({ isOpen, onClose }: any) {
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add new investment</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Investment Name</FormLabel>
              <Input placeholder="Stock" />
            </FormControl>
            <FormControl>
              <FormLabel>Ticker</FormLabel>
              <Input placeholder="STCK" />
            </FormControl>
            <FormControl>
              <FormLabel>Amount</FormLabel>
              <Input placeholder="1.0" />
            </FormControl>
            <FormControl>
              <FormLabel>Price</FormLabel>
              <Input placeholder="100.0" />
            </FormControl>
            <FormControl>
              <FormLabel>Currency</FormLabel>
              <Select defaultValue="usd">
                <option value="usd">USD</option>
                <option value="eur">EUR</option>
              </Select>
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3}>
              Save
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
