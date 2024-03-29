import {
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

import { ExternalLinkIcon } from "@chakra-ui/icons";
import getColorValues from "./colorValues";

export default function Login({ handleConnectWallet }) {
  const colorValues = getColorValues();

  return (
    <Flex
      width={"100vw"}
      height={"100vh"}
      alignContent={"center"}
      justifyContent={"center"}
      bgGradient={colorValues.gradientLoginUI}
    >
      <Center>
        <Card
          direction={{ base: "column", sm: "row" }}
          overflow="hidden"
          variant="elevated"
          boxShadow="dark-lg"
          p="6"
          rounded="md"
          bg={colorValues.mainCardBg}
        >
          <Image
            objectFit="cover"
            maxW={{ base: "100%", sm: "300px" }}
            src={colorValues.dePass_logo}
            alt="DePass Logo"
          />
          <Stack>
            <CardBody py="10" maxWidth="800px">
              <Heading
                // style={{ color: "#A370AF" }}
                //

                align="center"
                size="xl"
                bgGradient="linear(to-l, #7928CA, #FF0080)"
                bgClip="text"
              >
                DePass: Decentralised Password Manager
              </Heading>

              <Text
                py="2"
                pt="4"
                align="center"
                noOfLines={[1, 2]}
                style={{ fontSize: "18px", fontWeight: 600 }}
              >
                Welcome to DePass: Your decentralized fortress for password
                management, empowering you with control over your credentials
                across distributed networks.
              </Text>
              <Center>
                <Stack width="100%" pt="5%" direction="row" spacing={4}>
                  <Button
                    // leftIcon={<EmailIcon />}
                    size="lg"
                    // colorScheme="teal"
                    bg={colorValues.normalButtonBg}
                    variant="solid"
                    onClick={handleConnectWallet}
                    width="50%"
                  >
                    Login using MetaMask
                  </Button>
                  <Button
                    // rightIcon={<ArrowForwardIcon />}
                    // colorScheme="teal"
                    width="50%"
                    variant="outline"
                    size="lg"
                    as="a"
                    href="https://metamask.io/download/"
                    target="_blank"
                  >
                    Download Metamask <ExternalLinkIcon mx="4px" />
                  </Button>
                </Stack>
              </Center>
            </CardBody>
          </Stack>
        </Card>
      </Center>
    </Flex>
  );
}
