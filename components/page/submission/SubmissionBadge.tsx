import { CheckCircleIcon } from "@chakra-ui/icons";
import { Box, VStack, FormLabel, Select, Input, Flex, Button, Text, Image, Checkbox } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import { pagePath, sessionStorageKey } from "@/constants";
import { sendConfirmEmail } from "@/share/api/submission/sendConfirmEmail";
import { SubmissionEntry } from "@/types/api/submission";

type InputForm = {
  consumerId: number;
  email: string;
  sameIdForEmail: boolean;
  externalLinkageId: string;
  confirmLinkageId: string;
};

export const SubmissionBadge = ({ badgeConsumers, vcImage, badgeVcId }: SubmissionEntry) => {
  const router = useRouter();
  const pathParam = router.query.badge_vc_id;
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    watch,
    reset,
    formState: { errors },
  } = useForm<InputForm>({
    defaultValues: {
      consumerId: badgeConsumers[0].consumerId,
    },
  });

  const sameIdForEmail = watch("sameIdForEmail");

  const onSubmit = async (input: InputForm) => {
    if (input.externalLinkageId !== input.confirmLinkageId) {
      alert("外部連携IDが確認フォームの内容と一致しません。");
      return;
    }

    const consumerId = typeof input.consumerId === "string" ? Number(input.consumerId) : input.consumerId;

    const data = await sendConfirmEmail({ email: input.email, consumerId });
    console.log("動作確認用", data.confirmCode);

    const selectConsumer = {
      consumerId: consumerId,
      consumerName: badgeConsumers.find((x) => x.consumerId === Number(input.consumerId)).consumerName,
    };
    const badgeVcData = {
      badgeVcId: badgeVcId,
      vcImage: vcImage,
    };
    const { confirmCode, submissionEmail, externalLinkageId, consumer, badgeVc } = sessionStorageKey;
    sessionStorage.setItem(confirmCode, data.hashConfirmCode);
    sessionStorage.setItem(submissionEmail, input.email);
    sessionStorage.setItem(externalLinkageId, input.externalLinkageId);
    sessionStorage.setItem(consumer, JSON.stringify(selectConsumer));
    sessionStorage.setItem(badgeVc, JSON.stringify(badgeVcData));

    reset();
    setIsSubmitting(true);
  };

  useEffect(() => {
    if (sameIdForEmail) {
      const email = getValues("email");
      setValue("externalLinkageId", email);
      setValue("confirmLinkageId", email);
    } else {
      setValue("externalLinkageId", "");
      setValue("confirmLinkageId", "");
    }
  }, [sameIdForEmail, getValues, setValue]);

  if (isSubmitting) {
    return (
      <VStack justifyContent={"center"} gap={16} mt={8}>
        <Box>
          <Box mb={4}>
            <CheckCircleIcon w={8} h={8} color="green.500" />
          </Box>
          <Text>送信完了</Text>
        </Box>
        <Box>
          <Text fontSize={"lg"}>入力されたemailアドレス宛に</Text>
          <Text fontSize={"lg"}>確認コードを記載したメールが送信されました。</Text>
          <Text fontSize={"lg"}>メールのご確認をお願いします。</Text>
        </Box>
        <Box>
          <Button colorScheme={"blue"} onClick={() => router.push(`${pagePath.submission.confirm}/${pathParam}`)}>
            確認コード入力
          </Button>
        </Box>
      </VStack>
    );
  } else {
    return (
      <>
        <Box mt={4}>
          <Image w={48} h={48} fit={"cover"} src={"data:image/png;base64," + vcImage} alt={"OpenBadgeImage"} />
        </Box>
        <Box textAlign={"left"}>
          <Text fontSize={"md"} mt={1}>
            入力されたemailアドレス宛に確認コードを
          </Text>
          <Text fontSize={"md"} mt={1}>
            記載したメールが送信されます。
          </Text>
        </Box>
        <form style={{ width: "100%" }} onSubmit={handleSubmit(onSubmit)}>
          <VStack w={"full"} alignItems={"flex-start"} gap={6}>
            <Box w={"full"}>
              <FormLabel mb={2}>バッジ提出先選択</FormLabel>
              <Select {...register("consumerId", { required: true })}>
                {badgeConsumers.map((item) => {
                  return (
                    <option key={item.consumerId} value={item.consumerId}>
                      {item.consumerName}
                    </option>
                  );
                })}
              </Select>
            </Box>
            <Box w={"full"}>
              <FormLabel mb={2}>emailアドレス</FormLabel>
              <Input
                placeholder="email@example.com"
                type={"email"}
                {...register("email", { required: "メールアドレスを入力してください" })}
              />
              <Text size="xs" color={"red"} mt={2}>
                {errors.email?.message}
              </Text>
            </Box>
            <Box as="section" w={"full"} border={"1px solid #ddd"} borderRadius={"md"} padding={6}>
              <Box mb={6} textAlign={"left"}>
                <Checkbox size={"lg"} colorScheme={"green"} {...register("sameIdForEmail")}>
                  emailアドレスと同じ
                </Checkbox>
              </Box>
              <Box w={"full"} mb={4}>
                <FormLabel mb={2}>外部連携ID（マイレコID等）</FormLabel>
                <Input
                  type={"externalLinkageId"}
                  {...register("externalLinkageId", { required: "外部連携IDを入力してください。" })}
                />
                <Text size="xs" color={"red"} mt={2}>
                  {errors.externalLinkageId?.message}
                </Text>
              </Box>
              <Box w={"full"}>
                <FormLabel mb={2}>確認のため再度入力してください。</FormLabel>
                <Input
                  type={"confirmLinkageId"}
                  {...register("confirmLinkageId", { required: "確認用フォームは入力必須です。" })}
                />
                <Text size="xs" color={"red"} mt={2}>
                  {errors.confirmLinkageId?.message}
                </Text>
              </Box>
            </Box>
            <Box w={"full"}>
              <Flex justifyContent={"space-between"}>
                <Button
                  colorScheme={"gray"}
                  w={120}
                  onClick={() => router.push(`${pagePath.credential.detail}/${pathParam}`)}
                >
                  戻る
                </Button>
                <Button type="submit" colorScheme={"blue"} w={120}>
                  送信
                </Button>
              </Flex>
            </Box>
          </VStack>
        </form>
      </>
    );
  }
};
