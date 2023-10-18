import { Box, Button, Center, Divider, Flex, Text } from "@chakra-ui/react";
import React from "react";

type Props = {
  id: string;
  name: string;
};

export const AddWallet = ({ id, name }: Props) => {
  const handleClickButton = () => {
    // TODO: ウォレット作成処理
  };
  return (
    <Flex direction={"column"} px={{ base: 4, sm: 0 }}>
      <Center>
        <Text fontSize={{ base: "2xl", sm: "3xl" }} mt={{ base: 8, sm: 4 }}>
          マイウォレット登録
        </Text>
      </Center>
      <Box mt={{ base: 8, sm: 16 }}>
        <Text fontSize="xl">Orthros ID</Text>
        <Box mt={4} px={8}>
          <Text fontSize="md">{id}</Text>
        </Box>
        <Divider />
      </Box>
      <Box mt={{ base: 8, sm: 16 }}>
        <Text fontSize="xl">氏名</Text>
        <Box mt={4} px={8}>
          <Text fontSize="md">{name}</Text>
        </Box>
        <Divider />
      </Box>
      <Box mt={16}>
        <Center>
          <Button colorScheme={"blue"} size={"md"}>
            <Text fontSize={"sm"} onClick={() => handleClickButton()}>
              マイウォレットを作成する
            </Text>
          </Button>
        </Center>
      </Box>
    </Flex>
  );
};
