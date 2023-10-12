import { Flex, Box, FormLabel, Select, Button, Text, FormControl, Input, Heading } from "@chakra-ui/react";
import axios from "axios";
import React, { useState } from "react";

import { MyBadgesList, MyBadgesListSp } from "@/components/ui/table/MybadgeList";
import { IfBadgeInfo } from "@/types/BadgeInfo";
import { badgeIssuerSelector } from "@prisma/client";

export const BadgeList = ({ issuerList }: { issuerList: badgeIssuerSelector[] }) => {
  const [isNeedSSO, setisNeedSSO] = useState(false);
  const [moodleUrl, setMoodleUrl] = useState("");
  const [isNeedMoodleLogin, setisNeedMoodleLogin] = useState(false);

  const [badgeList, setBadgeList] = useState<IfBadgeInfo[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const getMyBadges = async () => {
    const username = "testtest";
    const password = "1456";
    setIsLoading(true);

    if (!isNeedSSO) {
      setisNeedMoodleLogin(true);
      return;
    }

    const res = await axios.post("http://localhost:3000/api/temp/dummyBadge", {
      username,
      password,
    });
    console.log("res", res.data);

    const badgeData = res.data.badgeList;
    setIsLoading(false);
    setBadgeList(badgeData);
  };

  const handleChangeIssuer = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const isSsoSignin = issuerList.filter((x) => x.badgeIssuerSelectorId.toString() === e.target.value)[0];
    setisNeedSSO(isSsoSignin.ssoEnable);
  };

  if (isNeedMoodleLogin) {
    return (
      <Box w={{ base: "full", sm: "md" }} mt={4}>
        <Heading textAlign={"center"} fontWeight={600} fontSize={"xl"} lineHeight={"110%"}>
          Moodleに登録されている
          <br />
          ユーザー名とパスワードを入力してください
        </Heading>

        <FormControl>
          <Box mt={12}>
            <FormLabel htmlFor="username">ユーザー名</FormLabel>
            <Input
              id="username"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </Box>
          <Box mt={8}>
            <FormLabel htmlFor="password">パスワード</FormLabel>
            <Input
              id="password"
              placeholder="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Box>
          <Box mt={8}>
            <Button
              mt={4}
              w={"full"}
              colorScheme="green"
              onClick={() => {
                setisNeedMoodleLogin(false);
                getMyBadges();
              }}
            >
              バッジ一覧取得
            </Button>
          </Box>
        </FormControl>
      </Box>
    );
  } else {
    return (
      <>
        {/** desktop */}
        <Flex
          display={{ base: "none", sm: "flex" }}
          w="full"
          justify={"space-between"}
          direction={"row"}
          alignItems={"flex-end"}
        >
          <Box mt={4}>
            <FormLabel mb={2} fontSize={"md"}>
              発行者選択
            </FormLabel>
            <Select w={64} onChange={(e) => handleChangeIssuer(e)}>
              {issuerList.map((item) => {
                const key = item.badgeIssuerSelectorId;
                return (
                  <option key={key} value={key}>
                    {item.badgeIssuerSelectorName}
                  </option>
                );
              })}
            </Select>
          </Box>
          <Box>
            <Button colorScheme={"blue"} type="button" onClick={() => getMyBadges()} isLoading={isLoading}>
              <Text fontSize={"md"}>バッジリスト取得</Text>
            </Button>
          </Box>
        </Flex>

        {/** smart phone */}
        <Flex
          display={{ base: "flex", sm: "none" }}
          w="full"
          justify={"space-between"}
          direction={"column"}
          alignItems={"center"}
        >
          <Box w={"full"} mt={8}>
            <FormLabel mb={2} fontSize={"sm"}>
              発行者選択
            </FormLabel>
            <Select onChange={(e) => handleChangeIssuer(e)}>
              {issuerList.map((item) => {
                const key = item.badgeIssuerSelectorId;
                return (
                  <option key={key} value={key}>
                    {item.badgeIssuerSelectorName}
                  </option>
                );
              })}
            </Select>
          </Box>
          <Box w={"full"} mt={8}>
            <Button w={"full"} colorScheme={"blue"} type="button" onClick={() => getMyBadges()} isLoading={isLoading}>
              <Text fontSize={"sm"}>バッジリスト取得</Text>
            </Button>
          </Box>
        </Flex>

        <Flex w="full" align={"center"} direction={"column"}>
          <Box display={{ sm: "block", base: "none" }}>{MyBadgesList(badgeList)}</Box>
          <Box display={{ sm: "none", base: "block" }}>{MyBadgesListSp(badgeList)}</Box>
        </Flex>
      </>
    );
  }
};
