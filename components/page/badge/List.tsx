import { Flex, Box, FormLabel, Select } from "@chakra-ui/react";
import { LmsList } from "@prisma/client";
import React, { Dispatch, SetStateAction, useState } from "react";

import { Loading } from "@/components/Loading";
import { MoodleLoginForm } from "@/components/model/moodle/MoodleLoginform";
import { MyBadgesList, MyBadgesListSp } from "@/components/ui/table/MybadgeList";
import { badgeListActions, badgeListGetters } from "@/share/store/badgeList/main";
import { badgeMetaDataActions } from "@/share/store/badgeMetaData/main";
import { selectBadgeActions, selectBadgeGetters } from "@/share/store/selectBadge/main";

export const BadgeList = ({
  lmsList,
  setIsBadgeSelect,
}: {
  lmsList: LmsList[];
  setIsBadgeSelect: Dispatch<SetStateAction<boolean>>;
}) => {
  const badgeList = badgeListGetters.useBadgeList();
  const selectBadge = selectBadgeGetters.useSelectBadgeData();
  const { fetchBadgeList } = badgeListActions.useFetchBadgeList();
  const { clearBadgeList } = badgeListActions.useClearBadgeList();
  const { fetchBadgeMetaData } = badgeMetaDataActions.useFetchBadgeMetaData();
  const { setSelectBadge } = selectBadgeActions.useSetSelectBadge();

  const [selectLmsId, setSelectLmsId] = useState(selectBadge.lmsId.toString());
  const [isNeedMoodleLogin, setIsNeedMoodleLogin] = useState(false);

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchMoodleMyBadges = async (username: string, password: string) => {
    setIsLoading(true);
    await fetchBadgeList({ username, password, lmsId: Number(selectLmsId) });
    setIsLoading(false);
  };

  const handleChangeIssuer = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectLmsId(e.target.value);
    if (e.target.value === "") {
      clearBadgeList();
      return;
    }

    setIsLoading(true);

    const selectIssuer = lmsList.filter((x) => x.lmsId.toString() === e.target.value)[0];
    const { lmsId, ssoEnabled } = selectIssuer;

    if (!ssoEnabled) {
      setIsNeedMoodleLogin(true);
      setIsLoading(false);
      return;
    }

    // TODO: 仮実装 Orthrosから取得を想定
    const username = "user2";

    await fetchBadgeList({ username, lmsId });

    setIsLoading(false);
  };

  const handleBadgeSelect = async (uniquehash: string, email: string) => {
    const { lmsId, lmsName, lmsUrl } = lmsList.find((x) => x.lmsId.toString() === selectLmsId);

    await fetchBadgeMetaData({ uniquehash, lmsUrl });
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
              学習サービス名選択
            </FormLabel>
            <Select w={72} value={selectLmsId} onChange={(e) => handleChangeIssuer(e)}>
              <option value=""></option>
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
              学習サービス名選択
            </FormLabel>
            <Select value={selectLmsId} onChange={(e) => handleChangeIssuer(e)}>
              <option value=""></option>
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
        </Flex>

        <Flex w="full" align={"center"} direction={"column"}>
          {isLoading ? (
            <Loading message="バッジリスト読込中" />
          ) : (
            <>
              <Box display={{ sm: "block", base: "none" }}>
                {<MyBadgesList badgeList={badgeList} handleBadgeSelect={handleBadgeSelect} />}
              </Box>
              <Box display={{ sm: "none", base: "block" }}>
                {<MyBadgesListSp badgeList={badgeList} handleBadgeSelect={handleBadgeSelect} />}
              </Box>
            </>
          )}
        </Flex>
      </>
    );
  }
};
