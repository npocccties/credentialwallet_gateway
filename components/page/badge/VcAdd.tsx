import { CheckCircleIcon, WarningIcon } from "@chakra-ui/icons";
import { Box, Flex, Button, Text, Image, VStack } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { useState } from "react";

import { Loading } from "@/components/Loading";
import { ResponseState } from "@/components/ui/response/ResponseState";
import { pagePath } from "@/constants";
import { imageTemp } from "@/templates/imageTemp";

type ResponseStatus = "success" | "failed" | undefined;

export const VcAdd = () => {
  const router = useRouter();
  const [isVcIntake, setIsVcIntake] = useState(false);
  const [responseState, setRequestState] = useState<ResponseStatus>(undefined);

  const handleClickIntake = () => {
    setIsVcIntake(true);
    setTimeout(() => {
      setRequestState("success");
    }, 3000);
  };

  if (!isVcIntake) {
    return (
      <VStack w={"100%"} mt={6} gap={16}>
        <Box textAlign={"left"}>
          <Text fontSize={{ base: "sm", sm: "md" }} textAlign={"center"}>
            このバッジをマイウォレットに取り込みますか？
          </Text>
        </Box>
        <Box>
          <Image w={48} h={48} fit={"cover"} src={"data:image/png;base64," + imageTemp} alt={"test"} />
        </Box>
        <Box w={"full"}>
          <Flex justifyContent={"space-between"}>
            <Button colorScheme={"gray"} w={160} onClick={() => router.push(pagePath.badge.list)}>
              キャンセル
            </Button>
            <Button colorScheme={"blue"} w={160} onClick={() => handleClickIntake()}>
              取り込み
            </Button>
          </Flex>
        </Box>
      </VStack>
    );
  } else {
    return (
      <VStack justifyContent={"center"} gap={16} mt={8}>
        {!responseState && (
          <>
            <Loading />
            <Text>処理中</Text>
          </>
        )}
        {responseState === "success" && (
          <ResponseState
            icon={<CheckCircleIcon w={8} h={8} color="green.500" />}
            status="success!"
            message="バッジの取り込みが完了しました！"
          />
        )}
        {responseState === "failed" && (
          <ResponseState
            icon={<WarningIcon w={8} h={8} color="red.500" />}
            status="failed!"
            message="バッジの取り込みに失敗しました"
          />
        )}
      </VStack>
    );
  }
};
