import { WarningIcon } from "@chakra-ui/icons";
import { Box, Button, HStack, Text, VStack } from "@chakra-ui/react";
import { NextPageContext } from "next";
import { useRouter } from "next/router";

import { Layout } from "@/components/Layout";
import { Metatag } from "@/components/Metatag";
import { SERVICE_DESCRITION, SERVICE_NAME } from "@/configs";

function ErrorPage({ statusCode, errorMessage }) {
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  return (
    <Layout maxW="2xl">
      <Metatag title={SERVICE_NAME} description={SERVICE_DESCRITION} />
      <VStack justifyContent={"center"} gap={16} mt={8}>
        <WarningIcon w={16} h={16} color={"red.500"} />
        <Text fontSize={"xl"}>{statusCode} Not Found</Text>
        <Text fontSize={"md"}>{errorMessage}</Text>

        <HStack>
          <Box>
            <Button colorScheme={"gray"} onClick={handleBack}>
              前のページに戻る
            </Button>
          </Box>
        </HStack>
      </VStack>
    </Layout>
  );
}

ErrorPage.getInitialProps = ({ res, err }: NextPageContext) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  const errorMessage = err ? err.message : "お探しのページは見つかりませんでした。";

  return { statusCode, errorMessage };
};

export default ErrorPage;
