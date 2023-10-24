import { Flex, Box, FormLabel, Select, Button, Text } from "@chakra-ui/react";
import { LmsList } from "@prisma/client";
import { useRouter } from "next/router";
import React, { Dispatch, SetStateAction, useState } from "react";

import { MoodleLoginForm } from "@/components/model/moodle/MoodleLoginform";
import { MyBadgesList, MyBadgesListSp } from "@/components/ui/table/MybadgeList";
import { badgeListActions, badgeListGetters } from "@/share/store/badgeList/main";
import { badgeMetaDataActions } from "@/share/store/badgeMetaData/main";
import { selectBadgeActions } from "@/share/store/selectBadge/main";

export const BadgeList = ({
  lmsList,
  setIsBadgeSelect,
}: {
  lmsList: LmsList[];
  setIsBadgeSelect: Dispatch<SetStateAction<boolean>>;
}) => {
  const router = useRouter();
  const [isNeedSSO, setisNeedSSO] = useState(lmsList[0].ssoEnabled);
  const [lmsUrl, setLmsUrl] = useState(lmsList[0].lmsUrl);
  const [isNeedMoodleLogin, setIsNeedMoodleLogin] = useState(false);

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const badgeList = badgeListGetters.useBadgeList();
  const { fetchBadgeList } = badgeListActions.useFetchBadgeList();
  const { fetchBadgeMetaData } = badgeMetaDataActions.useFetchBadgeMetaData();
  const { setSelectBadge } = selectBadgeActions.useSetSelectBadge();

  const fetchMoodleMyBadgesForSSO = async () => {
    // TODO: 仮実装 Orthrosから取得を想定
    const username = "testtest";
    setIsLoading(true);

    if (!isNeedSSO) {
      setIsNeedMoodleLogin(true);
      setIsLoading(false);
      return;
    }

    fetchBadgeList({ username, isNeedSSO, lmsUrl });
    setIsLoading(false);
  };

  const fetchMoodleMyBadges = async (username: string, password: string) => {
    setIsLoading(true);
    fetchBadgeList({ username, password, isNeedSSO, lmsUrl });
    setIsLoading(false);
  };

  const handleChangeIssuer = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectIssuer = lmsList.filter((x) => x.lmsId.toString() === e.target.value)[0];
    setisNeedSSO(selectIssuer.ssoEnabled);
    setLmsUrl(selectIssuer.lmsUrl);
  };

  const handleBadgeSelect = (uniquehash: string, email: string) => {
    const { lmsId, lmsName } = lmsList.find((x) => x.lmsUrl === lmsUrl);

    fetchBadgeMetaData({ uniquehash, lmsUrl });
    setSelectBadge({ email, uniquehash, lmsId, lmsName });
    setIsBadgeSelect(true);
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
              {lmsList.map((item) => {
                const key = item.lmsId;
                return (
                  <option key={key} value={key}>
                    {item.lmsName}
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
              {lmsList.map((item) => {
                const key = item.lmsId;
                return (
                  <option key={key} value={key}>
                    {item.lmsName}
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
          <Box display={{ sm: "block", base: "none" }}>
            {<MyBadgesList badgeList={badgeList} handleBadgeSelect={handleBadgeSelect} />}
          </Box>
          <Box display={{ sm: "none", base: "block" }}>
            {<MyBadgesListSp badgeList={badgeList} handleBadgeSelect={handleBadgeSelect} />}
          </Box>
        </Flex>
      </>
    );
  }
};
