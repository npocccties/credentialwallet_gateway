import { WarningIcon } from "@chakra-ui/icons";
import { VStack, HStack, Box, Button, Text } from "@chakra-ui/react";
import { GetServerSideProps } from "next";
import React from "react";

import { Layout } from "@/components/Layout";
import { Metatag } from "@/components/Metatag";
import { SERVICE_DESCRITION, SERVICE_NAME } from "@/configs";
import { pagePath } from "@/constants";
import { errors } from "@/constants/error";
import { logStartForPageSSR, logStatus, logEndForPageSSR } from "@/constants/log";
import { loggerInfo, loggerError } from "@/lib/logger";
import { verifyOrthrosJwt } from "@/lib/verifyJwt";
import { useLogoutApi } from "@/share/usecases/logout/useLogoutApi";

const page = pagePath.login.error;

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  loggerInfo(logStartForPageSSR(page));

  const jwt = req.cookies.jwt;

  try {
    const verify = await verifyOrthrosJwt(jwt);

    // 認証情報が正常ならこのページを表示しない
    if (verify) {
      return { notFound: true };
    }

    loggerInfo(`${logStatus.success} ${page}`);
    loggerInfo(logEndForPageSSR(page));

    return { props: {} };
  } catch (e) {
    loggerError(`${logStatus.error} ${page}`, e.message);
    throw new Error(errors.response500.message);
  }
};

const index = () => {
  const loginPageUrl = process.env.NEXT_PUBLIC_LOGIN_PAGE_URL;

  const handleLogout = async () => {
    await useLogoutApi();
    window.location.href = loginPageUrl;
  };
  return (
    <Layout maxW="2xl">
      <Metatag title={SERVICE_NAME} description={SERVICE_DESCRITION} />
      <VStack justifyContent={"center"} gap={16} mt={8}>
        <WarningIcon w={16} h={16} color={"red.500"} />
        <Text fontSize={"xl"}>不正なログイン情報</Text>
        <Text fontSize={"md"}>ログイン情報が不正です。再度ログインしてください。</Text>

        <HStack>
          <Box>
            <Button colorScheme={"gray"} onClick={() => handleLogout()}>
              ログイン画面へ
            </Button>
          </Box>
        </HStack>
      </VStack>
    </Layout>
  );
};

export default index;
