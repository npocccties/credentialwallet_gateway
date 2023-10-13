import { Flex, Box, FormLabel, Select, Button, Text } from "@chakra-ui/react";
import React, { useState } from "react";

import { badgeIssuerSelector } from "@prisma/client";
import { MoodleLoginForm } from "@/components/model/moodle/MoodleLoginform";
import { badgeListActions, badgeListGetters } from "@/share/store/badgeList/main";
import { MyBadgesList, MyBadgesListSp } from "@/components/ui/table/MybadgeList";

export const BadgeList = ({ issuerList }: { issuerList: badgeIssuerSelector[] }) => {
  const [isNeedSSO, setisNeedSSO] = useState(issuerList[0].ssoEnable);
  const [moodleUrl, setMoodleUrl] = useState(issuerList[0].badgeIssueUrl);
  const [isNeedMoodleLogin, setIsNeedMoodleLogin] = useState(false);

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const badgeList = badgeListGetters.useBadgeList();
  const { fetchBadgeList } = badgeListActions.useFetchBadgeList();

  const fetchMoodleMyBadgesForSSO = async () => {
    const username = "testtest";
    setIsLoading(true);

    if (!isNeedSSO) {
      setIsNeedMoodleLogin(true);
      setIsLoading(false);
      return;
    }

    fetchBadgeList({ username, isNeedSSO, moodleUrl });
    setIsLoading(false);
  };

  const fetchMoodleMyBadges = async (username: string, password: string) => {
    setIsLoading(true);
    fetchBadgeList({ username, password, isNeedSSO, moodleUrl });
    setIsLoading(false);
  };

  const handleChangeIssuer = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectIssuer = issuerList.filter((x) => x.badgeIssuerSelectorId.toString() === e.target.value)[0];
    setisNeedSSO(selectIssuer.ssoEnable);
    setMoodleUrl(selectIssuer.badgeIssueUrl);
  };

  if (isNeedMoodleLogin) {
    return <MoodleLoginForm setIsNeedMoodleLogin={setIsNeedMoodleLogin} getMyBadges={fetchMoodleMyBadges} />;
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
            <Button
              colorScheme={"blue"}
              type="button"
              onClick={() => fetchMoodleMyBadgesForSSO()}
              isLoading={isLoading}
            >
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
            <Button
              w={"full"}
              colorScheme={"blue"}
              type="button"
              onClick={() => fetchMoodleMyBadgesForSSO()}
              isLoading={isLoading}
            >
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
