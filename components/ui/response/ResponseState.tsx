import { Box, Button, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { ReactNode } from "react";

import { pagePath } from "@/constants";

export const ResponseState = ({ icon, status, message }: { icon: ReactNode; status: string; message: string }) => {
  const router = useRouter();
  return (
    <>
      <Box>
        <Box mb={4}>{icon}</Box>
        <Text>{status}</Text>
      </Box>
      <Box>
        <Text fontSize={"lg"}>{message}</Text>
      </Box>
      <Box>
        <Button colorScheme={"blue"} onClick={() => router.push(pagePath.mywallet.list)}>
          マイウォレットに戻る
        </Button>
      </Box>
    </>
  );
};
