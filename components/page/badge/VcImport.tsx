import { CheckCircleIcon, WarningIcon } from "@chakra-ui/icons";
import { Box, Flex, Button, Text, Image, VStack, Divider, Stack } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { useState } from "react";

import { Loading } from "@/components/Loading";
import { ResponseState } from "@/components/ui/response/ResponseState";
import { pagePath } from "@/constants";
import { JSTdateToDisplay } from "@/lib/date";
import { badgeMetadataGetters } from "@/share/store/badgeMetaData/main";
import { selectBadgeGetters } from "@/share/store/selectBadge/main";
import { useBadgeImportApi } from "@/share/usecases/badgeImport/useBadgeImportApi";
import { BadgeMetaData } from "@/types/badgeInfo/metaData";

type ResponseStatus = "success" | "failed" | undefined;
type Props = {
  badgeMetaData: BadgeMetaData;
  badgeEmail: string;
};

export const VcImport = () => {
  const router = useRouter();

  const [isVcImport, setIsVcImport] = useState(false);
  const [responseState, setRequestState] = useState<ResponseStatus>(undefined);
  const badgeMetaData = badgeMetadataGetters.useBadgeMetaData();
  const badgeEmail = selectBadgeGetters.useSelectBadgeData().email;

  const handleClickImport = async () => {
    const uniquehash = router.query.uniquehash as string;
    setIsVcImport(true);

    try {
      await useBadgeImportApi({ uniquehash, email: badgeEmail, badgeMetaData });
      setRequestState("success");
    } catch (e) {
      setRequestState("failed");
    }
  };

  if (!isVcImport) {
    return (
      <Box w={"100%"} mt={6} gap={16}>
        <Box textAlign={"left"}>
          <Text fontSize={{ base: "sm", sm: "md" }} textAlign={"center"}>
            このバッジをマイウォレットに取り込みますか？
          </Text>
        </Box>
        {badgeMetaData && (
          <>
            <Box mt={8} display={"flex"} justifyContent={"center"}>
              <Image w={48} h={48} fit={"cover"} src={badgeMetaData.badge.image} alt={"test"} />
            </Box>
            <Stack w={"full"} mt={8} alignItems={"stretch"}>
              <BadgeDataItem name="バッジ名" data={badgeMetaData.badge.name} />
              <BadgeDataItem name="email" data={badgeEmail} />
              <BadgeDataItem name="発行者" data={badgeMetaData.badge.issuer.name} />
              <BadgeDataItem name="発行日" data={JSTdateToDisplay(badgeMetaData.issuedOn.toString())} />
            </Stack>
            <Box w={"full"} mt={8}>
              <Flex justifyContent={"space-between"}>
                <Button colorScheme={"gray"} w={160} onClick={() => router.push(pagePath.badge.list)}>
                  キャンセル
                </Button>
                <Button colorScheme={"blue"} w={160} onClick={() => handleClickImport()}>
                  インポート
                </Button>
              </Flex>
            </Box>
          </>
        )}
      </Box>
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

interface BadgeDataItemProps {
  name: string;
  data: string | Date;
}

const BadgeDataItem: React.FC<BadgeDataItemProps> = ({ name, data }) => {
  return (
    <Box>
      <Text color="gray" mb={4} textAlign={"left"}>
        {name}
      </Text>
      <Text fontSize="lg" my={8} textAlign={"left"}>
        {data}
      </Text>
      <Divider mb={8} />
    </Box>
  );
};
