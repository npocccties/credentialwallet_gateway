import { CheckCircleIcon, WarningIcon } from "@chakra-ui/icons";
import { Box, VStack, FormLabel, Input, Flex, Button, Text, Image } from "@chakra-ui/react";
import React, { useState } from "react";

import { Loading } from "@/components/Loading";
import { ResponseState } from "@/components/ui/response/ResponseState";
import { imageTemp } from "@/templates/imageTemp";

type ResponseStatus = "success" | "invalid adress" | "verification failure" | "other errors" | undefined;

export const Confirm = () => {
  const [isSubmission, setIsSubmission] = useState(false);
  const [responseState, setRequestState] = useState<ResponseStatus>(undefined);

  const handleSubmission = () => {
    setIsSubmission(true);
    setTimeout(() => {
      setRequestState("success");
    }, 3000);
  };

  if (!isSubmission) {
    return (
      <>
        <Box textAlign={"left"}>
          <Text fontSize={"md"}>提出するバッジ</Text>
        </Box>
        <Box mt={4}>
          <Image w={48} h={48} fit={"cover"} src={"data:image/png;base64," + imageTemp} alt={"test"} />
        </Box>
        <VStack w={"full"} alignItems={"flex-start"} gap={12}>
          <Box w={"full"}>
            <FormLabel mb={2}>確認コードを入力</FormLabel>
            <Input type={"text"} />
          </Box>
          <Box w={"full"}>
            <Flex justifyContent={"flex-end"}>
              <Button colorScheme={"blue"} w={160} onClick={() => handleSubmission()}>
                バッジを提出
              </Button>
            </Flex>
          </Box>
        </VStack>
      </>
    );
  } else {
    return (
      <VStack justifyContent={"center"} gap={16} mt={8}>
        {!responseState && (
          <>
            <Loading />
            <Text>送信中</Text>
          </>
        )}
        {responseState === "success" && (
          <ResponseState
            icon={<CheckCircleIcon w={8} h={8} color="green.500" />}
            status="success!"
            message="バッジの提出が完了しました！"
          />
        )}
        {responseState === "invalid adress" && (
          <ResponseState
            icon={<WarningIcon w={8} h={8} color="red.500" />}
            status="invalid adress!"
            message="登録されていないemailアドレスです"
          />
        )}
        {responseState === "verification failure" && (
          <ResponseState
            icon={<WarningIcon w={8} h={8} color="red.500" />}
            status="verification failure!"
            message="検証に失敗しました"
          />
        )}
        {responseState === "other errors" && (
          <ResponseState
            icon={<WarningIcon w={8} h={8} color="red.500" />}
            status="other errors!"
            message="予期せぬエラーが発生しました"
          />
        )}
      </VStack>
    );
  }
};
