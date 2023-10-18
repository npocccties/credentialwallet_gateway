import { Box, VStack, FormLabel, Select, Input, Flex, Button, Text, Image } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";

import { pagePath } from "@/constants";
import { imageTemp } from "@/templates/imageTemp";

export const SubmissionBadge = () => {
  const router = useRouter();
  return (
    <>
      <Box mt={4}>
        <Image w={48} h={48} fit={"cover"} src={"data:image/png;base64," + imageTemp} alt={"test"} />
      </Box>
      <Box textAlign={"left"}>
        <Text fontSize={"md"}>提出先の自治体と、対象の自治体から発行された emailアドレスを入力してください。</Text>
        <Text fontSize={"md"} mt={1}>
          入力されたemailアドレス宛に確認コードを記載したメールが送信されます。
        </Text>
      </Box>
      <VStack w={"full"} alignItems={"flex-start"} gap={8}>
        <Box w={"full"}>
          <FormLabel mb={2}>バッジ提出先選択</FormLabel>
          <Select>
            <option value={"option1"}>大阪市教育委員会</option>
            <option value={"option2"}>大阪府教育委員会</option>
            <option value={"option3"}>堺市教育委員会</option>
          </Select>
        </Box>
        <Box w={"full"}>
          <FormLabel mb={2}>提出先登録email</FormLabel>
          <Input type={"text"} />
        </Box>
        <Box w={"full"}>
          <Flex justifyContent={"space-between"}>
            <Button
              colorScheme={"gray"}
              w={120}
              onClick={() => router.push(`${pagePath.wallet.detail}/${router.query.badge_vc_id}`)}
            >
              戻る
            </Button>
            {/** TODO: キャビネット送信処理を実行 リンクは仮置き */}
            <Button colorScheme={"blue"} w={120} onClick={() => router.push(`${pagePath.submission.confirm}/xxx`)}>
              送信
            </Button>
          </Flex>
        </Box>
      </VStack>
    </>
  );
};
