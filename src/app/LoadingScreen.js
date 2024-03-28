import { Box, Skeleton, Stack } from "@chakra-ui/react";

export default function LoadingScreen() {
  return (
    <Box>
      <Stack mt="100px">
        <Skeleton isLoaded={false} height="40px" />
        <Skeleton isLoaded={false} height="100px" />
        <Skeleton isLoaded={false} height="100px" />
      </Stack>
    </Box>
  );
}
