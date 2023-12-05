import { CheckCircleIcon, WarningIcon } from "@chakra-ui/icons";
import { Box, VStack, FormLabel, Input, Flex, Button, Text, Image, Divider } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { useState } from "react";

import { Loading } from "@/components/Loading";
import { ResponseState } from "@/components/ui/response/ResponseState";
import { pagePath, sessionStorageKey } from "@/constants";
import { postSubmissionVc } from "@/share/api/submission/postSubmissionVc";
import { SubmissionResponseStatus } from "@/types/status";

type ConsumerData = {
  consumerId: number;
  consumerName: string;
};
type BadgeVcData = {
  badgeVcId: number;
  vcImage: string;
};

export const Confirm = () => {
  const router = useRouter();
  const [isSubmission, setIsSubmission] = useState(false);
  const [responseState, setRequestState] = useState<SubmissionResponseStatus>(undefined);

  const submissionEmail = sessionStorage.getItem(sessionStorageKey.submissionEmail);
  const externalLinkageId = sessionStorage.getItem(sessionStorageKey.externalLinkageId);
  const consumerJson = sessionStorage.getItem(sessionStorageKey.consumer);
  const badgeVcJson = sessionStorage.getItem(sessionStorageKey.badgeVc);
  const consumer = JSON.parse(consumerJson) as ConsumerData;
  const badgeVc = JSON.parse(badgeVcJson) as BadgeVcData;

  const handleSubmission = async (codeInput: string) => {
    const hashConfirmCode = sessionStorage.getItem(sessionStorageKey.confirmCode);

    const hashInput = await generateHash(codeInput);
    console.log("input hash", hashInput, hashConfirmCode);

    if (hashConfirmCode !== hashInput) {
      alert("確認コードが一致しません");
      return;
    }

    const { consumerId } = consumer;
    const { badgeVcId } = badgeVc;

    try {
      setIsSubmission(true);
      const data = await postSubmissionVc({ consumerId, email: submissionEmail, badgeVcId, externalLinkageId });

      setRequestState(data.result);
    } catch (e) {
      console.error(e.message);
    }
  };

  async function generateHash(confirmCode: string) {
    const encoder = new TextEncoder();
    const encodedCode = encoder.encode(confirmCode.toString());
    const hashBuffer = await crypto.subtle.digest("SHA-256", encodedCode);

    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map((byte) => byte.toString(16).padStart(2, "0")).join("");

    return hashHex;
  }

  if (!submissionEmail || !consumer || !badgeVc) {
    const returnPath = `${pagePath.submission.enter}/${router.query.badge_vc_id}`;

    return (
      <>
        <Box>
          <Box mb={4}>
            <WarningIcon w={8} h={8} color="red.500" />
          </Box>
          <Text>error!</Text>
        </Box>
        <Box>
          <Text fontSize={"lg"}>セッション情報がありません</Text>
        </Box>
        <Box>
          <Button colorScheme={"gray"} onClick={() => router.push(returnPath)}>
            確認コードを再発行する
          </Button>
        </Box>
      </>
    );
  }

  if (!isSubmission) {
    return (
      <>
        <Box textAlign={"left"}>
          <Text fontSize={"md"}>提出するバッジ</Text>
        </Box>
        <Box mt={4}>
          <Image w={48} h={48} fit={"cover"} src={"data:image/png;base64," + badgeVc.vcImage} alt={"test"} />
        </Box>

        <VStack w={"full"} alignItems={"flex-start"} gap={12}>
          <Box w={"full"} textAlign={"left"}>
            <Text color="gray" mb={4}>
              提出先名
            </Text>
            <Text fontSize="lg" my={6}>
              {consumer.consumerName}
            </Text>
            <Divider mb={2} />
          </Box>

          <Box w={"full"} textAlign={"left"}>
            <Text color="gray" mb={4}>
              提出者Emailアドレス
            </Text>
            <Text fontSize="lg" my={6}>
              {submissionEmail}
            </Text>
            <Divider mb={2} />
          </Box>

          <Box w={"full"} textAlign={"left"}>
            <Text color="gray" mb={4}>
              外部連携ID
            </Text>
            <Text fontSize="lg" my={6}>
              {externalLinkageId}
            </Text>
            <Divider mb={2} />
          </Box>

          <SubmissionCode handeleSubmission={handleSubmission} />
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
        {responseState === "invalid userId" && (
          <ResponseState
            icon={<WarningIcon w={8} h={8} color="red.500" />}
            status="invalid userId!"
            message="登録されていないIDです"
          />
        )}
        {responseState === "verification failure" && (
          <ResponseState
            icon={<WarningIcon w={8} h={8} color="red.500" />}
            status="verification failure!"
            message="バッジの検証に失敗しました"
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

const SubmissionCode = ({ handeleSubmission }: { handeleSubmission: (codeInput: string) => void }) => {
  const router = useRouter();
  const { badge_vc_id } = router.query;
  const [codeInput, setCodeInput] = useState("");
  return (
    <>
      <Box w={"full"}>
        <FormLabel mb={2}>確認コードを入力</FormLabel>
        <Input type={"text"} maxLength={10} onChange={(e) => setCodeInput(e.target.value)} />
      </Box>
      <Box w={"full"}>
        <Flex justifyContent={"space-between"}>
          <Button
            colorScheme={"gray"}
            w={140}
            onClick={() => router.push(`${pagePath.credential.detail}/${badge_vc_id}`)}
          >
            キャンセル
          </Button>
          <Button colorScheme={"blue"} w={140} onClick={() => handeleSubmission(codeInput)}>
            バッジを提出
          </Button>
        </Flex>
      </Box>
    </>
  );
};
