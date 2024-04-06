import {} from "./utilComponents";

import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  Card,
  CardBody,
  Center,
  Divider,
  Drawer,
  DrawerContent,
  HStack,
  Heading,
  Input,
  SkeletonText,
  Stack,
  StackDivider,
  Text,
  VStack,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import {
  FaArrowRightFromBracket,
  FaArrowRotateRight,
  FaFloppyDisk,
  FaPenToSquare,
  FaPlus,
  FaTrashCan,
} from "react-icons/fa6";
import {
  PasswordInput,
  PasswordInputDrawer,
  UsePopover,
} from "./utilComponents";
import { useEffect, useState } from "react";

import GetColorValues from "./colorValues";
import { filter } from "smart-array-filter";

export default function CardsContents({ functions, credArr }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [credentials, setCredentials] = useState(null);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState(null);
  const toast = useToast();
  const handleInputChange = (event) => {
    setCredentials({ ...credentials, [event.target.name]: event.target.value });
  };
  const handleSearchChange = (event) => setSearch(event.target.value);
  const colorValues = GetColorValues();

  useEffect(() => {
    if (!credArr) {
      setLoading(true);
    } else {
      setLoading(false);
    }
  }, [credArr?.length]);

  async function getCardsCredentials() {
    setLoading(true);
    await functions.getSitesCredentials("Cards");
    setLoading(false);
  }

  async function handleClickSaveCredentials() {
    setLoading(true);
    if (credentials?.id !== undefined) {
      let status = await functions.handleEditCredentials(credentials);
      if (status) {
        let getCredAtId = credArr.find(
          (element) => element.id === credentials.id
        );
        for (const key in credentials) {
          if (Object.prototype.hasOwnProperty.call(credentials, key)) {
            getCredAtId[key] = credentials[key];
          }
        }
      }
    } else {
      const credId = await functions.handleSaveCredentials(
        credentials,
        "Cards"
      );
      if (credId !== -1) {
        credentials.id = credId;
        credArr.push(credentials);
      }
    }
    setLoading(false);
    onClose();
  }
  async function handleDeleteChange(card) {
    setLoading(true);
    let status = await functions.handleDeleteCredentials(card.id);
    if (status) {
      credArr.splice(
        credArr.findIndex((a) => a.id === card.id),
        1
      );
    }
    setLoading(false);
  }
  function copyToClipboard(e) {
    navigator.clipboard.writeText(e.target.value);
    toast({
      title: "Copied to clipboard",
      status: "success",
      duration: 1000,
      isClosable: true,
      position: "top",
    });
  }

  function handleAddChange() {
    setCredentials({});
    onOpen();
  }

  async function handleRefreshChange() {
    await getCardsCredentials();
  }

  async function handleLogoutChange() {
    functions.handleLogout();
  }

  async function handleEditChange(card) {
    setCredentials(card);
    onOpen();
  }

  function cardsAddDrawerContent() {
    return (
      <Box width="100%" height="100%" padding="20px">
        <VStack width="100%" alignItems="left">
          <Heading pt="10px" pl="5px" size="xl">
            Details
          </Heading>
          <Divider borderColor={colorValues.gray200} />
          <Box bg={colorValues.valueCardBg} rounded="10px" p="20px">
            <Text
              style={{ fontWeight: "bold" }}
              pt="10px"
              px="10px"
              fontSize="lg"
            >
              Card Name
            </Text>
            <Input
              type="text"
              name="cardName"
              placeholder="Enter the Card Name"
              value={credentials?.cardName || ""}
              onChange={handleInputChange}
              size="lg"
            />
            <Text
              style={{ fontWeight: "bold" }}
              pt="10px"
              px="10px"
              fontSize="lg"
            >
              Account Number
            </Text>
            <Input
              size="lg"
              type="text"
              name="accNo"
              value={credentials?.accNo || ""}
              placeholder="Enter the Card Account Number"
              onChange={handleInputChange}
            />
            <Text
              style={{ fontWeight: "bold" }}
              pt="10px"
              px="10px"
              fontSize="lg"
            >
              Expiry
            </Text>
            <Input
              size="lg"
              type="text"
              name="expiry"
              value={credentials?.expiry || ""}
              placeholder="Enter the expiry date on the card"
              onChange={handleInputChange}
            />
            <Text
              style={{ fontWeight: "bold" }}
              pt="10px"
              px="10px"
              fontSize="lg"
            >
              CVV
            </Text>

            <PasswordInputDrawer
              placeholder="Enter the CVV"
              value={credentials?.cvv || ""}
              handleInputChange={handleInputChange}
              keyVal="cvv"
            />
            <Text
              style={{ fontWeight: "bold" }}
              pt="10px"
              px="10px"
              fontSize="lg"
            >
              Account Holder&apos;s Name
            </Text>
            <Input
              type="text"
              name="accholderName"
              size="lg"
              value={credentials?.accholderName || ""}
              placeholder="Enter the expiry date on the card"
              onChange={handleInputChange}
            />
            <Center pt="20px">
              <Button
                // colorScheme="blue"
                isLoading={loading}
                loadingText="Submitting"
                leftIcon={<FaFloppyDisk />}
                onClick={handleClickSaveCredentials}
              >
                Save Credentials
              </Button>
            </Center>
          </Box>
        </VStack>
      </Box>
    );
  }
  return (
    <Box maxW="95%" px="10px">
      <Drawer
        trapFocus="true"
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        size="sm"
      >
        <DrawerContent bg={colorValues.bgGradientMainUI}>
          {cardsAddDrawerContent()}
        </DrawerContent>
      </Drawer>
      <Heading size="2xl">Cards</Heading>
      <Divider borderWidth="1px" borderColor={colorValues.gray200} />
      <Box>
        <VStack
          rounded="10px"
          bg={colorValues.gray200}
          marginTop="20px"
          p="10px"
          spacing="20px"
          marginBottom="10px"
        >
          <HStack width="100%">
            <Input
              size="lg"
              onChange={handleSearchChange}
              placeholder="Search Filter"
              variant="filled"
              borderColor="rgba(0, 0, 0, 0.1)"
              borderWidth="2px"
            />
            <Button
              rightIcon={<FaPlus />}
              size="lg"
              onClick={handleAddChange}
              colorScheme={"gray"}
              variant="solid"
            >
              Add Card
            </Button>
            <Button
              rightIcon={<FaArrowRotateRight />}
              colorScheme={"gray"}
              size="lg"
              variant="solid"
              onClick={handleRefreshChange}
            >
              Refresh
            </Button>
            <UsePopover
              onClickFunction={handleLogoutChange}
              buttonSize="lg"
              buttonText="Logout"
              buttonIcon={<FaArrowRightFromBracket />}
            />
          </HStack>
          <Text mx="5px" fontSize="18px">
            Welcome to your digital cardholder, where every card is securely
            stored and easily accessible.
          </Text>
        </VStack>

        <SkeletonText
          isLoaded={!loading}
          mt="4"
          noOfLines={4}
          spacing="4"
          skeletonHeight="10"
        >
          <Box rounded="10px" bg={colorValues.gray200}>
            <Accordion py="" allowToggle>
              {credArr &&
                filter(credArr, {
                  keywords: search,
                })?.map((card) => (
                  <AccordionItem border="0px" key={card.id}>
                    <h2>
                      <AccordionButton p="20px">
                        <Heading textAlign="left" flex="1" size="md">
                          {card.cardName}
                        </Heading>
                        <AccordionIcon />
                      </AccordionButton>
                    </h2>
                    <AccordionPanel pb={4}>
                      <Card bg={colorValues.valueCardBg} maxW="700px">
                        <CardBody>
                          <Stack divider={<StackDivider />} spacing="20px">
                            <Box>
                              <Heading size="xs" textTransform="uppercase">
                                {" "}
                                Account Number
                              </Heading>
                              <Input
                                variant="filled"
                                value={card.accNo}
                                size="lg"
                                readOnly
                                onClick={(e) => copyToClipboard(e)}
                              />
                            </Box>
                            <HStack>
                              <Box>
                                <Heading size="xs" textTransform="uppercase">
                                  Expiry Date
                                </Heading>
                                <Input
                                  variant="filled"
                                  size="lg"
                                  value={card.expiry}
                                  readOnly
                                  onClick={(e) => copyToClipboard(e)}
                                />
                              </Box>
                              <Box>
                                <Heading size="xs" textTransform="uppercase">
                                  CVV
                                </Heading>
                                <PasswordInput
                                  value={card.cvv}
                                  copyToClipboard={copyToClipboard}
                                />
                              </Box>
                            </HStack>
                            <Box>
                              <Heading size="xs" textTransform="uppercase">
                                Card Holder&apos;s Name
                              </Heading>
                              <Input
                                size="lg"
                                readOnly
                                onClick={(e) => copyToClipboard(e)}
                                variant="filled"
                                value={card.accholderName}
                                textTransform="uppercase"
                              />
                            </Box>
                            <HStack justifyContent={"right"} width="100%">
                              <Button
                                type="primary"
                                onClick={() => handleEditChange(card)}
                                leftIcon={<FaPenToSquare />}
                              >
                                Edit
                              </Button>
                              {/* <Popconfirm
                                title="Are you sure?"
                                onConfirm={() => handleDeleteChange(card)}
                              >
                                <Button
                                  colorScheme={"red"}
                                  type="primary"
                                  leftIcon={<FaTrashCan />}
                                  variant="outline"
                                >
                                  Delete
                                </Button>
                              </Popconfirm> */}
                              <UsePopover
                                onClickFunction={() => handleDeleteChange(card)}
                                buttonText="Delete"
                                buttonSize="md"
                                buttonIcon={<FaTrashCan />}
                              />
                            </HStack>
                          </Stack>
                        </CardBody>
                      </Card>
                    </AccordionPanel>
                  </AccordionItem>
                ))}
            </Accordion>
          </Box>
        </SkeletonText>
      </Box>
    </Box>
  );
}
