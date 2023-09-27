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
  Icon,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import moment from "moment";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";

import { useStoredVCs } from "@/hooks/useStoredVCs";
import { decodeJWTToVCData } from "@/lib/utils";
import { PlainCard } from "@/components/ui/card/PlainCard";
import { deleteVC } from "@/lib/repository/vc";
import { BadgeVcCard } from "@/components/ui/card/BadgeVcCard";
import { BadgeVcs } from "@/types/temp";
import axios from "axios";
import { badgeDetailGetters } from "@/share/store/badgeDetail/main";

type Props = {
  badgeVcs: BadgeVcs;
};

export const CredentialDetail: React.FC = () => {
  const router = useRouter();
  const cancelRef = useRef();
  const { badgeVcs, submissions } = badgeDetailGetters.useBadgeDetail();

  const { isOpen, onOpen, onClose } = useDisclosure();
  // const vcPayload = badgeVcs && badgeVcs.vc_data_payload === "" ? undefined : JSON.parse(badgeVcs.vc_data_payload);
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
      {badgeVcs && (
        <Box>
          {/* <Box marginBottom="3">
            <PlainCard badgeVc={badgeVc}></PlainCard>
          </Box> */}
          <Box marginBottom="3">
            <BadgeVcCard
              image={""}
              name={badgeVcs.badge_name}
              issuer={badgeVcs.badge_issuer_name}
              issuedate={badgeVcs.badge_issuedon?.toString()}
            />
          </Box>
          <Box my={12}>
            <Button colorScheme="teal" w="full">
              バッジ提出
            </Button>
          </Box>
          <Tabs size="md" variant="enclosed">
            <TabList>
              <Tab>詳細</Tab>
              <Tab>知識バッジ</Tab>
              <Tab>提出履歴</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <CredentialSubjectItem name="email" data={badgeVcs.badge_email} />
                <CredentialSubjectItem name="発行者" data={badgeVcs.badge_issuer_name} />
                <CredentialSubjectItem name="発行日" data={badgeVcs.badge_issuedon} />
                <Box marginBottom="3">
                  <Text color="gray" mb={4}>
                    コース情報
                  </Text>
                  <Text fontSize="lg" mb={4}>
                    OKUTEPのコース情報を見る
                  </Text>
                  <Divider marginBottom={"3"} />
                </Box>
                {/* <Box marginBottom={"3"}>
                  <Text color="gray">Issuer</Text>
                  <Text fontSize="lg">{decodedVC.iss}</Text>
                </Box>
                <Box marginBottom={"3"}>
                  <Text color="gray">Issue date</Text>
                  <Text fontSize="lg">{moment.unix(decodedVC.iat).format("YYYY/MM/DD HH:mm")}</Text>
                </Box>
                <Box marginBottom={"3"}>
                  <Text color="gray">Expiry date</Text>
                  <Text fontSize="lg">{moment.unix(decodedVC.exp).format("YYYY/MM/DD HH:mm")}</Text>
                </Box> */}
              </TabPanel>
              <TabPanel>
                {/* {badgeVc.vcHistory ? (
                  badgeVc.vcHistory.map((history) => (
                    <Box key={history.timestamp}>
                      <Text fontSize={"sm"}>{moment(history.timestamp).format("YYYY/MM/DD HH:mm")}</Text>
                      <Text>{history.message}</Text>
                    </Box>
                  ))
                ) : ( */}
                <Text>No history</Text>
                {/* )} */}
              </TabPanel>
            </TabPanels>
          </Tabs>
          <Box>
            <Button colorScheme="red" onClick={onOpen}>
              削除
            </Button>
          </Box>
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
                    colorScheme="red"
                    onClick={() => {
                      deleteVC(router.query.vcID as string);
                      router.push("/");
                    }}
                    ml={3}
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
      <Text fontSize="lg" mb={4}>
        {data}
      </Text>
      <Divider marginBottom={"3"} />
    </Box>
  );
};
