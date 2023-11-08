import { Box, Button, Center, Divider, Flex, Text, useDisclosure } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { useRef } from "react";

import { BasicDialog } from "@/components/ui/dialog/BasicDialog";
import { pagePath } from "@/constants";
import { orthrosUserGetters } from "@/share/store/loginUser/Orthros/main";
import { useAddWalletApi } from "@/share/usecases/wallet/useAddWalletApi";

export const AddWallet = () => {
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef<HTMLButtonElement>(null);

  const { eppn, displayName } = orthrosUserGetters.useOrthrosUserData();

  const handleClickButton = async () => {
    await useAddWalletApi({ orthrosId: eppn });

    onOpen();
  };
  return (
    <Flex direction={"column"} px={{ base: 4, sm: 0 }}>
      <Center>
        <Text as="h1" fontSize={{ base: "2xl", sm: "3xl" }} mt={{ base: 8, sm: 4 }}>
          ウォレット作成
        </Text>
      </Center>
      <Box mt={{ base: 8, sm: 16 }}>
        <Text as="h2" fontSize={{ base: "xl", sm: "2xl" }}>
          Orthros ID
        </Text>
        <Box mt={4} px={8}>
          <Text fontSize={{ base: "md", sm: "xl" }}>{eppn}</Text>
        </Box>
        <Divider />
      </Box>
      <Box mt={{ base: 8, sm: 16 }}>
        <Text as="h2" fontSize={{ base: "xl", sm: "2xl" }}>
          氏名
        </Text>
        <Box mt={4} px={8}>
          <Text fontSize={{ base: "md", sm: "xl" }}>{displayName}</Text>
        </Box>
        <Divider />
      </Box>
      <Box mt={16}>
        <Center>
          <Button colorScheme={"blue"} size={"md"}>
            <Text fontSize={"sm"} onClick={() => handleClickButton()}>
              ウォレットを作成する
            </Text>
          </Button>
        </Center>
      </Box>
      <BasicDialog
        title="ウォレットの作成が完了しました！"
        okButtonrText="ウォレットへ"
        okButtonColor="blue"
        isOpen={isOpen}
        onClose={onClose}
        cancelRef={cancelRef}
        handleOkClick={() => router.push(pagePath.wallet.list)}
      />
    </Flex>
  );
};
