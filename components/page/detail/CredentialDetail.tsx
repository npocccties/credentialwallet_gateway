import { ExternalLinkIcon } from "@chakra-ui/icons";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Box,
  Button,
  Divider,
  Flex,
  Link,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  useDisclosure,
  Image,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { useRef } from "react";

import { BadgeVcCard } from "@/components/ui/card/BadgeVcCard";
import { pagePath } from "@/constants";
import { deleteVC } from "@/lib/repository/vc";
import { badgeDetailGetters } from "@/share/store/badgeDetail/main";
import { imageTemp } from "@/templates/imageTemp";

export const CredentialDetail: React.FC = () => {
  const router = useRouter();
  const cancelRef = useRef();
  const { badgeVc, submissions } = badgeDetailGetters.useBadgeDetail();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleExportCsv = () => {
    // TODO: 未実装
    alert("CSVエクスポート");
  };
  // const vcPayload = badgeVc && badgeVc.vc_data_payload === "" ? undefined : JSON.parse(badgeVc.vc_data_payload);
  // const image = vcPayload?.vc.credentialSubject.photo;
  // const vc = vcPayload?.vc;

  // const storedVC = React.useMemo(() => {
  //   return storedVCs;
  // }, [storedVCs]);

  // const decodedVC = React.useMemo(() => {
  //   if (storedVC) {
  //     return decodeJWTToVCData(storedVC.vc);
  //   }
  // }, [storedVC]);

  return (
    <>
      {badgeVc && (
        <Box>
          <Box mb="3">
            <BadgeVcCard
              image={""}
              name={badgeVc.badgeName}
              issuer={badgeVc.badgeIssuerName}
              issuedate={badgeVc.badgeIssuedon?.toString()}
            />
          </Box>
          <Box my={12}>
            <Button
              colorScheme="teal"
              w="full"
              onClick={() => router.push(`${pagePath.submission.enter}/${router.query.badge_vc_id}`)}
            >
              バッジ提出
            </Button>
          </Box>
          <Tabs size="md" variant="enclosed">
            <TabList mb={6}>
              <Tab>詳細</Tab>
              <Tab>知識バッジ</Tab>
              <Tab>提出履歴</Tab>
            </TabList>
            {/** TODO: 取得したデータを表示する */}
            <TabPanels>
              <TabPanel>
                <CredentialSubjectItem name="email" data={badgeVc.badgeEmail} />
                <CredentialSubjectItem name="発行者" data={badgeVc.badgeIssuerName} />
                <CredentialSubjectItem name="発行日" data={badgeVc.badgeIssuedon} />
                <CredentialSubjectItem name="コース情報" data={"http://localhost:3000"} />
              </TabPanel>
              <TabPanel>
                <KnowledgeBadgeItem name="学校安全と危機管理 (v1.0)" image={imageTemp} />
                <KnowledgeBadgeItem name="学校安全と危機管理 (v1.0)" image={imageTemp} />
              </TabPanel>
              <TabPanel>
                <SubmittionHistoryItem name="大阪市教育委員会" date={badgeVc.badgeIssuedon} />
              </TabPanel>
            </TabPanels>
          </Tabs>
          <Flex justifyContent={"space-between"}>
            <Button colorScheme="red" w={160} onClick={onOpen}>
              削除
            </Button>
            <Button colorScheme="blue" w={160} onClick={() => handleExportCsv()}>
              エクスポート
            </Button>
          </Flex>
          <AlertDialog isOpen={isOpen} leastDestructiveRef={cancelRef} onClose={onClose}>
            <AlertDialogOverlay>
              <AlertDialogContent>
                <AlertDialogHeader fontSize="lg" fontWeight="bold">
                  バッジ削除
                </AlertDialogHeader>

                <AlertDialogBody>
                  本当にこのバッジを削除しますか？
                  <br />
                  この操作は取り消せません。
                </AlertDialogBody>

                <AlertDialogFooter>
                  <Button ref={cancelRef} onClick={onClose}>
                    キャンセル
                  </Button>
                  <Button
                    ml={3}
                    colorScheme="red"
                    onClick={() => {
                      deleteVC(router.query.vcID as string);
                      router.push(pagePath.mywallet.list);
                    }}
                  >
                    削除
                  </Button>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialogOverlay>
          </AlertDialog>
        </Box>
      )}
    </>
  );
};

interface CredentialSubjectItemProps {
  name: string;
  data: string | Date;
}

const CredentialSubjectItem: React.FC<CredentialSubjectItemProps> = ({ name, data }) => {
  return (
    <Box>
      <Text color="gray" mb={4}>
        {name}
      </Text>
      {"コース情報" === name ? (
        <Text fontSize="lg" my={8}>
          <Link href={data as string} color={"teal"} isExternal>
            OKUTEPのコース情報を見る <ExternalLinkIcon />
          </Link>
        </Text>
      ) : (
        <Text fontSize="lg" my={8}>
          {data}
        </Text>
      )}
      <Divider mb={8} />
    </Box>
  );
};

interface KnowledgeBadgeItemProps {
  image: string;
  name: string;
}

const KnowledgeBadgeItem: React.FC<KnowledgeBadgeItemProps> = ({ name, image }) => {
  return (
    <>
      <Flex direction={"row"} alignItems={"center"}>
        <Box>
          <Image h={24} w={24} fit={"cover"} src={"data:image/png;base64," + image} alt={"test"} />
        </Box>
        <Box ml={16}>
          <Text fontSize="lg">{name}</Text>
        </Box>
      </Flex>
      <Divider mt={4} mb={8} />
    </>
  );
};

interface SubmittionHistoryItemProps {
  name: string;
  date: Date;
}

const SubmittionHistoryItem: React.FC<SubmittionHistoryItemProps> = ({ name, date }) => {
  return (
    <Box>
      <Text color="gray">提出日時</Text>
      <Text fontSize="lg" mt={2} mb={8}>
        {date}
      </Text>
      <Text color="gray" mt={4}>
        提出先
      </Text>
      <Text fontSize="lg" mt={2} mb={8}>
        {name}
      </Text>
      <Divider mb={8} />
    </Box>
  );
};
