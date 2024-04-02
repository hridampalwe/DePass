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
import { useEffect, useState } from "react";

import { UsePopover } from "./utilComponents";
import { filter } from "smart-array-filter";
import getColorValues from "./colorValues";

export default function IdentityContent({ functions, credArr }) {
  const colorValues = getColorValues();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [credentials, setCredentials] = useState(null);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const toast = useToast();
  const handleInputChange = (event) => {
    setCredentials({ ...credentials, [event.target.name]: event.target.value });
  };
  const handleSearchChange = (event) => setSearch(event.target.value);

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

  useEffect(() => {
    if (!credArr) {
      setLoading(true);
    } else {
      setLoading(false);
    }
  }, [credArr?.length]);

  async function getIdentitiesCredentials() {
    setLoading(true);
    await functions.getSitesCredentials("Identities");

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
        "Identities"
      );
      if (credId !== -1) {
        credentials.id = credId;
        credArr.push(credentials);
      }
    }
    setLoading(false);
    onClose();
  }

  async function handleDeleteChange(identity) {
    setLoading(true);
    let status = await functions.handleDeleteCredentials(identity.id);
    if (status) {
      credArr.splice(
        credArr.findIndex((a) => a.id === identity.id),
        1
      );
    }
    setLoading(false);
  }

  function handleAddChange() {
    setCredentials({});
    onOpen();
  }

  async function handleRefreshChange() {
    await getIdentitiesCredentials();
  }

  async function handleLogoutChange() {
    functions.handleLogout();
  }

  async function handleEditChange(identity) {
    setCredentials(identity);
    onOpen();
  }

  function IdentityAddDrawerContent() {
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
              Identity Name
            </Text>
            <Input
              type="text"
              name="title"
              size="lg"
              value={credentials?.title || ""}
              placeholder={`Enter the Identity Name`}
              onChange={handleInputChange}
            />
            <Text
              style={{ fontWeight: "bold" }}
              pt="10px"
              px="10px"
              fontSize="lg"
            >
              First Name
            </Text>
            <Input
              type="text"
              name="firstName"
              size="lg"
              placeholder="Enter the First Name"
              value={credentials?.firstName || ""}
              onChange={handleInputChange}
            />
            <Text
              style={{ fontWeight: "bold" }}
              pt="10px"
              px="10px"
              fontSize="lg"
            >
              Last Name
            </Text>
            <Input
              type="text"
              name="lastName"
              size="lg"
              value={credentials?.lastName || ""}
              placeholder="Enter the Last Name"
              onChange={handleInputChange}
            />
            <Text
              style={{ fontWeight: "bold" }}
              pt="10px"
              px="10px"
              fontSize="lg"
            >
              Age
            </Text>
            <Input
              type="text"
              name="age"
              size="lg"
              placeholder="Enter the age"
              value={credentials?.age || ""}
              onChange={handleInputChange}
            />
            <Text
              style={{ fontWeight: "bold" }}
              pt="10px"
              px="10px"
              fontSize="lg"
            >
              Date of Birth
            </Text>
            <Input
              type="text"
              name="dob"
              size="lg"
              value={credentials?.dob || ""}
              placeholder="Enter the Date of Birth"
              onChange={handleInputChange}
            />
            <Text
              style={{ fontWeight: "bold" }}
              pt="10px"
              px="10px"
              fontSize="lg"
            >
              Contact No.
            </Text>
            <Input
              type="text"
              name="contact"
              size="lg"
              value={credentials?.contact || ""}
              placeholder="Enter the Contact No."
              onChange={handleInputChange}
            />
            <Text
              style={{ fontWeight: "bold" }}
              pt="10px"
              px="10px"
              fontSize="lg"
            >
              E-mail Address
            </Text>
            <Input
              type="text"
              name="email"
              size="lg"
              value={credentials?.email || ""}
              placeholder="Enter the E-mail ID"
              onChange={handleInputChange}
            />
            <Text
              style={{ fontWeight: "bold" }}
              pt="10px"
              px="10px"
              fontSize="lg"
            >
              {credentials?.title || ""} Number
            </Text>
            <Input
              type="text"
              name="number"
              size="lg"
              value={credentials?.number || ""}
              placeholder={`Enter the ${credentials?.title || ""} Number`}
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
          {IdentityAddDrawerContent()}
        </DrawerContent>
      </Drawer>
      <Heading size="2xl">Identities</Heading>
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
              onChange={handleSearchChange}
              size="lg"
              variant="filled"
              borderColor="rgba(0, 0, 0, 0.1)"
              borderWidth="2px"
              placeholder="Search Filter"
            />
            <Button
              rightIcon={<FaPlus />}
              colorScheme={"gray"}
              size="lg"
              variant="solid"
              onClick={handleAddChange}
            >
              Add Identity
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
            Welcome to our secure identity repository - your digital guardian
            for safeguarding personal information.
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
            <Accordion maxWidth="100%" allowToggle>
              {credArr &&
                filter(credArr, {
                  keywords: search,
                })?.map((identity) => (
                  <AccordionItem border="0px" key={identity.id}>
                    <h2>
                      <AccordionButton p="20px">
                        <Heading textAlign="left" flex="1" size="md">
                          {identity.title}
                        </Heading>
                        <AccordionIcon />
                      </AccordionButton>
                    </h2>
                    <AccordionPanel pb={4}>
                      <Card bg={colorValues.valueCardBg} maxW="700px">
                        <CardBody>
                          <Stack spacing="20px">
                            <HStack>
                              <Box>
                                <Heading size="xs" textTransform="uppercase">
                                  First Name
                                </Heading>
                                <Input
                                  variant="filled"
                                  value={identity.firstName}
                                  readOnly
                                  size="lg"
                                  onClick={(e) => copyToClipboard(e)}
                                />
                              </Box>
                              <Box>
                                <Heading size="xs" textTransform="uppercase">
                                  lastName
                                </Heading>
                                <Input
                                  variant="filled"
                                  size="lg"
                                  value={identity.lastName}
                                  readOnly
                                  onClick={(e) => copyToClipboard(e)}
                                />
                              </Box>
                            </HStack>
                            <HStack>
                              <Box>
                                <Heading size="xs" textTransform="uppercase">
                                  Age
                                </Heading>
                                <Input
                                  variant="filled"
                                  size="lg"
                                  value={identity.age}
                                  readOnly
                                  onClick={(e) => copyToClipboard(e)}
                                />
                              </Box>
                              <Box>
                                <Heading size="xs" textTransform="uppercase">
                                  Date of Birth
                                </Heading>
                                <Input
                                  value={identity.dob}
                                  readOnly
                                  size="lg"
                                  onClick={(e) => copyToClipboard(e)}
                                  variant="filled"
                                  type="text"
                                />
                              </Box>
                            </HStack>
                            <Box>
                              <Heading size="xs" textTransform="uppercase">
                                Contact No.
                              </Heading>
                              <Input
                                variant="filled"
                                value={identity.contact}
                                readOnly
                                size="lg"
                                onClick={(e) => copyToClipboard(e)}
                              />
                            </Box>
                            <Box>
                              <Heading size="xs" textTransform="uppercase">
                                Email Address
                              </Heading>
                              <Input
                                variant="filled"
                                size="lg"
                                value={identity.email}
                                readOnly
                                onClick={(e) => copyToClipboard(e)}
                              />
                            </Box>
                            <Box>
                              <Heading size="xs" textTransform="uppercase">
                                {identity.title} number
                              </Heading>
                              <Input
                                variant="filled"
                                value={identity.number}
                                readOnly
                                size="lg"
                                onClick={(e) => copyToClipboard(e)}
                              />
                            </Box>
                            <HStack justifyContent={"right"} width="100%">
                              <Button
                                type="primary"
                                onClick={() => handleEditChange(identity)}
                                leftIcon={<FaPenToSquare />}
                              >
                                Edit
                              </Button>
                              <UsePopover
                                onClickFunction={() =>
                                  handleDeleteChange(identity)
                                }
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
