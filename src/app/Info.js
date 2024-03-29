import {
  Box,
  Button,
  Card,
  CardBody,
  Divider,
  Heading,
  Input,
  Stack,
  StackDivider,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";

export default function AccDetails({ functions, credArr }) {
  const [data, setData] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      const connectionData = await functions.connectionInfo();
      setData(connectionData);
    };

    fetchData();
  }, [functions]);

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
                <Input
                  variant="filled"
                  value={data ? data.account : ""}
                  readOnly
                />
              </Box>
              <Box>
                <Heading size="xs" textTransform="uppercase">
                  Contract Address
                </Heading>
                <Input
                  variant="filled"
                  value={data ? data.contractAddress : ""}
                  readOnly
                />
              </Box>
              <Box>
                <Heading size="xs" textTransform="uppercase">
                  Chain ID
                </Heading>
                <Input
                  variant="filled"
                  value={data ? Number(BigInt(data.chainId)) : ""}
                  readOnly
                />
              </Box>
              <Box>
                <Heading size="xs" textTransform="uppercase">
                  Balance
                </Heading>
                <Input
                  variant="filled"
                  value={
                    data
                      ? Number(BigInt(data.balance)) * 0.000000000000000001
                      : ""
                  }
                  readOnly
                />
              </Box>
              <Box>
                <Heading size="xs" textTransform="uppercase">
                  Transaction Count
                </Heading>
                <Input
                  variant="filled"
                  value={data ? Number(BigInt(data.count)) : ""}
                  readOnly
                />
              </Box>
            </Stack>
          </CardBody>
        </Card>
      </Box>
    </Box>
  );
}
