import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from '@chakra-ui/react'

export default function MainTable() {
  return (
    <TableContainer>
  <Table variant='simple' colorScheme='gray' borderWidth="1px">
    <TableCaption>Imperial to metric conversion factors</TableCaption>
    <Thead>
      <Tr>
        <Th borderWidth="1px">To convert</Th>
        <Th borderWidth="1px">into</Th>
        <Th borderWidth="1px" isNumeric>multiply by</Th>
      </Tr>
    </Thead>
    <Tbody>
      <Tr>
        <Td borderWidth="1px">inches</Td>
        <Td borderWidth="1px">millimetres (mm)</Td>
        <Td borderWidth="1px" isNumeric>25.4</Td>
      </Tr>
      <Tr>
        <Td borderWidth="1px">feet</Td>
        <Td borderWidth="1px">centimetres (cm)</Td>
        <Td borderWidth="1px" isNumeric>30.48</Td>
      </Tr>
      <Tr>
        <Td borderWidth="1px">yards</Td>
        <Td borderWidth="1px">metres (m)</Td>
        <Td borderWidth="1px" isNumeric>0.91444</Td>
      </Tr>
    </Tbody>
    <Tfoot>
      <Tr>
        <Th borderWidth="1px">To convert</Th>
        <Th borderWidth="1px">into</Th>
        <Th  borderWidth="1px" isNumeric>multiply by</Th>
      </Tr>
    </Tfoot>
  </Table>
</TableContainer>
  )
}