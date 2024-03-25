import React, { useState } from "react";
import {
  Heading,
  Button,
  HStack,
  VStack,
  Box,
  FormControl,
  FormLabel,
  InputGroup,
  InputRightElement,
  Input,
} from "@chakra-ui/react";
import {
  EditIcon,
  Search2Icon,
  DeleteIcon,
  RepeatIcon,
  AddIcon,
  ArrowForwardIcon,
} from "@chakra-ui/icons";

export default function Debitinfo({}) {
  const [formData, setFormData] = useState({
    cardHolderName: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    setFormData({
      cardHolderName: "",
      cardNumber: "",
      expiryDate: "",
      cvv: "",
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <Box width={"84vw"} height={"80vh"} p={"20px"}>
      <Box
        rounded={"10px"}
        p={"10px"}
        bg={
            "linear-gradient(328px at 2.9% 15%, rgb(191, 224, 251) 0%, rgb(232, 233, 251) 25.8%, rgb(252, 239, 250) 50.8%, rgb(234, 251, 251) 77.6%, rgb(240, 251, 244) 100.7%);"
        }
        height={"100%"}
      >
        <VStack alignItems={"flex-start"} height={"100%"} pt={"40px"}>
          {/* <SimpleSidebar /> */}
          <Box
            width={"100%"}
            height={"100%"}
            px={"20px"}
            borderLeft="2px"
            borderLeftColor="gray.200"
          >
            <Heading
              textAlign="center"
              size="xl"
              bgGradient="linear(to-l, #7928CA, #FF0080)"
              bgClip="text"
            >
              Debit Card Information
            </Heading>
            <HStack py="2%" spacing="5px">
              <InputGroup size="md">
                <Input
                  size="md"
                  placeholder="Search stored information for debit card"
                />
                <InputRightElement width="100px">
                  <Button size="md" rightIcon={<Search2Icon />}>
                    Search
                  </Button>
                </InputRightElement>
              </InputGroup>
              <Button
                rightIcon={<AddIcon />}
                colorScheme={"gray"}
                variant="solid"
              >
                Add
              </Button>
              <Button
                rightIcon={<RepeatIcon />}
                colorScheme={"gray"}
                variant="solid"
              >
                Refresh
              </Button>
              <Button
                rightIcon={<ArrowForwardIcon />}
                colorScheme={"red"}
                variant="outline"
              >
                Logout
              </Button>
            </HStack>
            <Box
              p={4}
              shadow="md"
              borderWidth="1px"
              borderRadius="md"
              size="100%"
            >
              <form onSubmit={handleSubmit}>
                <VStack spacing={4}>
                  <FormControl isRequired>
                    <FormLabel>Card Holder's Name</FormLabel>
                    <Input
                      type="text"
                      placeholder="Enter Card Holder's Name"
                      name="cardHolderName"
                      value={formData.cardHolderName}
                      onChange={handleChange}
                    />
                  </FormControl>
                  <FormControl isRequired>
                    <FormLabel>Card Number</FormLabel>
                    <Input
                      type="number"
                      placeholder="Enter card number"
                      name="cardNumber"
                      value={formData.cardNumber}
                      onChange={handleChange}
                    />
                  </FormControl>
                  <FormControl isRequired>
                    <FormLabel>Expiry Date</FormLabel>
                    <Input
                      type="text"
                      placeholder="MM/YY"
                      name="expiryDate"
                      value={formData.expiryDate}
                      onChange={handleChange}
                    />
                  </FormControl>
                  <FormControl isRequired>
                    <FormLabel>CVV</FormLabel>
                    <Input
                      type="number"
                      placeholder="CVV"
                      name="cvv"
                      value={formData.cvv}
                      onChange={handleChange}
                    />
                  </FormControl>
                  <Button colorScheme="blue" type="submit">
                    Save
                  </Button>
                </VStack>
              </form>
            </Box>
          </Box>
        </VStack>
      </Box>
    </Box>
  );
}
