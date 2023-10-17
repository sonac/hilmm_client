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
import { useState } from "react";

interface InvestmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  investmentName: string;
  investmentTickerName: string;
}

export default function AddInvestmentModal({
  isOpen,
  onClose,
  investmentName = "",
  investmentTickerName = "",
}: InvestmentModalProps) {
  const [invName, setInvName] = useState(investmentName);
  const [tickerName, setTickerName] = useState(investmentTickerName);
  const [amnt, setAmnt] = useState("");
  const [price, setPrice] = useState("");
  const [cur, setCur] = useState("EUR");

  console.log(invName);

  const addInvestment = async () => {
    const assetData = {
      ticker: tickerName,
      name: invName,
      amount: parseFloat(amnt),
      paid: parseFloat(price),
      currency: cur,
    };

    await fetch("/api/asset", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(assetData),
    });

    location.assign("/");
  };

  // Somehow useState(investmentName) doesn't do the trick
  if (investmentName != "" && invName == "") {
    setInvName(investmentName);
    setTickerName(investmentTickerName);
  }

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
              <Input
                value={invName}
                placeholder="Stock"
                onChange={(e) => setInvName(e.target.value)}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Ticker</FormLabel>
              <Input
                value={tickerName}
                placeholder="STCK"
                onChange={(e) => setTickerName(e.target.value)}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Amount</FormLabel>
              <Input
                placeholder="1.0"
                type="number"
                onChange={(e) => setAmnt(e.target.value)}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Price</FormLabel>
              <Input
                placeholder="100.0"
                type="number"
                onChange={(e) => setPrice(e.target.value)}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Currency</FormLabel>
              <Select
                defaultValue="EUR"
                onChange={(e) => setCur(e.target.value)}
              >
                <option value="USD">USD</option>
                <option value="EUR">EUR</option>
              </Select>
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={addInvestment}>
              Save
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
