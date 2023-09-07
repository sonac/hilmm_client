import { Box, Button, useDisclosure } from "@chakra-ui/react";
import MainTable from "./MainTable";
import MainChart from "./MainChart";
import AddInvestmentModal from "./AddInvestmentModal";

const data = [
  {
    id: "japan",
    color: "hsl(111, 70%, 50%)",
    data: [
      {
        x: "plane",
        y: 79,
      },
      {
        x: "helicopter",
        y: 105,
      },
      {
        x: "boat",
        y: 281,
      },
      {
        x: "train",
        y: 16,
      },
      {
        x: "subway",
        y: 226,
      },
      {
        x: "bus",
        y: 258,
      },
      {
        x: "car",
        y: 110,
      },
      {
        x: "moto",
        y: 157,
      },
      {
        x: "bicycle",
        y: 165,
      },
      {
        x: "horse",
        y: 250,
      },
      {
        x: "skateboard",
        y: 254,
      },
      {
        x: "others",
        y: 1,
      },
    ],
  },
  {
    id: "france",
    color: "hsl(304, 70%, 50%)",
    data: [
      {
        x: "plane",
        y: 287,
      },
      {
        x: "helicopter",
        y: 290,
      },
      {
        x: "boat",
        y: 133,
      },
      {
        x: "train",
        y: 172,
      },
      {
        x: "subway",
        y: 5,
      },
      {
        x: "bus",
        y: 183,
      },
      {
        x: "car",
        y: 289,
      },
      {
        x: "moto",
        y: 246,
      },
      {
        x: "bicycle",
        y: 106,
      },
      {
        x: "horse",
        y: 173,
      },
      {
        x: "skateboard",
        y: 35,
      },
      {
        x: "others",
        y: 262,
      },
    ],
  },
  {
    id: "us",
    color: "hsl(197, 70%, 50%)",
    data: [
      {
        x: "plane",
        y: 136,
      },
      {
        x: "helicopter",
        y: 39,
      },
      {
        x: "boat",
        y: 72,
      },
      {
        x: "train",
        y: 115,
      },
      {
        x: "subway",
        y: 73,
      },
      {
        x: "bus",
        y: 133,
      },
      {
        x: "car",
        y: 266,
      },
      {
        x: "moto",
        y: 264,
      },
      {
        x: "bicycle",
        y: 104,
      },
      {
        x: "horse",
        y: 226,
      },
      {
        x: "skateboard",
        y: 152,
      },
      {
        x: "others",
        y: 156,
      },
    ],
  },
  {
    id: "germany",
    color: "hsl(275, 70%, 50%)",
    data: [
      {
        x: "plane",
        y: 142,
      },
      {
        x: "helicopter",
        y: 180,
      },
      {
        x: "boat",
        y: 146,
      },
      {
        x: "train",
        y: 163,
      },
      {
        x: "subway",
        y: 28,
      },
      {
        x: "bus",
        y: 249,
      },
      {
        x: "car",
        y: 193,
      },
      {
        x: "moto",
        y: 10,
      },
      {
        x: "bicycle",
        y: 16,
      },
      {
        x: "horse",
        y: 183,
      },
      {
        x: "skateboard",
        y: 199,
      },
      {
        x: "others",
        y: 154,
      },
    ],
  },
  {
    id: "norway",
    color: "hsl(96, 70%, 50%)",
    data: [
      {
        x: "plane",
        y: 91,
      },
      {
        x: "helicopter",
        y: 62,
      },
      {
        x: "boat",
        y: 145,
      },
      {
        x: "train",
        y: 21,
      },
      {
        x: "subway",
        y: 99,
      },
      {
        x: "bus",
        y: 189,
      },
      {
        x: "car",
        y: 279,
      },
      {
        x: "moto",
        y: 47,
      },
      {
        x: "bicycle",
        y: 205,
      },
      {
        x: "horse",
        y: 204,
      },
      {
        x: "skateboard",
        y: 62,
      },
      {
        x: "others",
        y: 104,
      },
    ],
  },
];

export default function Body() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box flex="1" flexDir="column">
      <Button m="1em" onClick={onOpen}>
        Add Investment
      </Button>
      <MainTable />
      <div style={{ height: "400px" }}>
        <MainChart data={data} />
      </div>
      <AddInvestmentModal isOpen={isOpen} onClose={onClose} />
    </Box>
  );
}
