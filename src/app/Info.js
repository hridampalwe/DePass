import {
  Box,
  Button,
  Card,
  CardBody,
  Center,
  Divider,
  HStack,
  Heading,
  Input,
  Stack,
  StackDivider,
  Text,
  VStack,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";

export default function AccDetails({ functions }) {
  const [data, setData] = useState(null);
  useEffect(() => {
    if (data == null) {
      setData(functions.connectionInfo);
    }
  }, [data]);

  return (
    <Box>
      <Heading size="2xl"> About</Heading>
      <Divider border="1px" borderColor="gray.200" />
      <Box rounded="10px" mt="10px">
        <Card maxW="700px">
          <CardBody>
            <Stack divider={<StackDivider />} spacing="20px">
              <Box>
                <Heading size="xs" textTransform="uppercase">
                  Account
                </Heading>
                <Input variant="filled" value={data?.account} readOnly />
              </Box>
              <Box>
                <Heading size="xs" textTransform="uppercase">
                  Contract Address
                </Heading>
                <Input
                  variant="filled"
                  value={data?.contractAddress}
                  readOnly
                />
              </Box>
              <Box>
                <Heading size="xs" textTransform="uppercase">
                  Chain ID
                </Heading>
                <Input variant="filled" value={"1337"} readOnly />
              </Box>
            </Stack>
          </CardBody>
        </Card>
      </Box>
    </Box>
  );
}
