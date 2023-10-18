import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Box,
  Button,
  Flex,
  useDisclosure,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { useRef } from "react";

import { BadgeVcCard } from "@/components/ui/card/BadgeVcCard";
import { pagePath } from "@/constants";
import { CredentialDetailData } from "@/types/api/credential/detail";
import { vcDetailActions } from "@/share/store/credentialDetail/main";
import { VcDetailTabPanel } from "@/components/ui/tabPanel/VcDetailTabPanel";

export const CredentialDetail: React.FC<CredentialDetailData> = ({
  vcDetailData,
  knowledgeBadges,
  submissionsHistories,
  badgeExportData,
}) => {
  const router = useRouter();
  const cancelRef = useRef();
  const isDeleteDisabled = vcDetailData.submissions.length !== 0;

  const { deleteCredential } = vcDetailActions.useDeleteCredential();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const fileName = `${vcDetailData.badgeName}.json`;
  const blobData = new Blob([JSON.stringify(badgeExportData)], {
    type: "text/json",
  });
  const downloadUrl = URL.createObjectURL(blobData);

  return (
    <>
      {vcDetailData && (
        <Box>
          <Box mb="3">
            <BadgeVcCard badgeVc={vcDetailData} />
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
          <VcDetailTabPanel
            vcDetailData={vcDetailData}
            knowledgeBadges={knowledgeBadges}
            submissionsHistories={submissionsHistories}
          />
          <Flex justifyContent={"space-between"}>
            <Button colorScheme="red" w={160} disabled={isDeleteDisabled} onClick={onOpen}>
              削除
            </Button>
            <Button as="a" colorScheme="blue" w={160} href={downloadUrl} download={fileName}>
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
                      deleteCredential(vcDetailData.badgeVcId);
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
