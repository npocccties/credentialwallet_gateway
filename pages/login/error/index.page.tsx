import { WarningIcon } from "@chakra-ui/icons";
import { VStack, HStack, Box, Button, Text } from "@chakra-ui/react";
import React from "react";

import { Layout } from "@/components/Layout";
import { Metatag } from "@/components/Metatag";
import { SERVICE_DESCRITION, SERVICE_NAME } from "@/configs";

const index = () => {
  const loginPageUrl = process.env.NEXT_PUBLIC_LOGIN_PAGE_URL;

  return (
    <Layout maxW="2xl">
      <Metatag title={SERVICE_NAME} description={SERVICE_DESCRITION} />
      <VStack justifyContent={"center"} gap={16} mt={8}>
        <WarningIcon w={16} h={16} color={"red.500"} />
        <Text fontSize={"xl"}>不正なログイン情報</Text>
        <Text fontSize={"md"}>ログイン情報が不正です。再度ログインしてください。</Text>

        <HStack>
          <Box>
            <Button as={"a"} colorScheme={"gray"} href={loginPageUrl}>
              ログイン画面へ
            </Button>
          </Box>
        </HStack>
      </VStack>
    </Layout>
  );
};

export default index;
