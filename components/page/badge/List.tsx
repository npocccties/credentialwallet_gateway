import { Flex, Box, FormLabel, Select, Button, Text, FormControl, Input, Heading } from "@chakra-ui/react";
import axios from "axios";
import React, { useState } from "react";

import { MyBadgesList, MyBadgesListSp } from "@/components/ui/table/MybadgeList";
import { IfBadgeInfo } from "@/types/BadgeInfo";

export const BadgeList = () => {
  // ログインが必要か否か。発行者ドロップダウンに持つ想定
  const isNeedLogin = false;

  const [badgeList, setBadgeList] = useState<IfBadgeInfo[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isNeedMoodleLogin, setisNeedMoodleLogin] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const getMyBadges = async () => {
    const username = "testtest";
    const password = "1456";
    setIsLoading(true);

    if (isNeedLogin) {
      setisNeedMoodleLogin(isNeedLogin);
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
            <Select w={64}>
              <option value={"option1"}>大阪市教育委員会</option>
              <option value={"option2"}>大阪府教育委員会</option>
              <option value={"option3"}>堺市教育委員会</option>
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
            <Select>
              <option value={"option1"}>大阪市教育委員会</option>
              <option value={"option2"}>大阪府教育委員会</option>
              <option value={"option3"}>堺市教育委員会</option>
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
