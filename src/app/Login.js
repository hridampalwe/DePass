import {
  Box,
  Button,
  Card,
  CardBody,
  Center,
  Flex,
  Heading,
  Image,
  Stack,
  Text,
} from "@chakra-ui/react";
export default function Login({ handleConnectWallet }) {
  return (
    <Flex
      width={"100vw"}
      height={"100vh"}
      alignContent={"center"}
      justifyContent={"center"}
      bgGradient="linear(red.100 0%, orange.100 25%, yellow.100 50%)"
    >
      <Center>
        <Card
          direction={{ base: "column", sm: "row" }}
          overflow="hidden"
          variant="elevated"
          boxShadow="dark-lg"
          p="6"
          rounded="md"
          bg="white"
        >
          <Image
            objectFit="cover"
            maxW={{ base: "100%", sm: "300px" }}
            src="DePass_LOGO.svg"
            alt="DePass Logo"
          />
          <Stack>
            <CardBody py="10">
              <Heading
                // style={{ color: "#A370AF" }}
                //
                size="xl"
                bgGradient="linear(to-l, #7928CA, #FF0080)"
                bgClip="text"
              >
                DePass: Decentralised Password Manager
              </Heading>

              <Text
                py="2"
                pt="4"
                style={{ fontSize: "20px", fontWeight: "bold" }}
              >
                A blockchain based password manager to securely store your
                credentials.
              </Text>
              <Center>
                <Stack pt="5%" direction="row" spacing={4}>
                  <Button
                    // leftIcon={<EmailIcon />}
                    colorScheme="teal"
                    variant="solid"
                    onClick={handleConnectWallet}
                  >
                    Login using MetaMask
                  </Button>
                  <Button
                    // rightIcon={<ArrowForwardIcon />}
                    colorScheme="teal"
                    variant="outline"
                  >
                    Download MetaMask
                  </Button>
                </Stack>
              </Center>
            </CardBody>
            {/* <CardFooter></CardFooter> */}
          </Stack>
        </Card>
      </Center>
    </Flex>
  );
}
