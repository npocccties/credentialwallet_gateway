import { Box, Heading, FormControl, FormLabel, Input } from "@chakra-ui/react";
import { Dispatch, SetStateAction, useState } from "react";

import { PrimaryButton } from "@/components/ui/button/PrimaryButton";
import { SecondaryButton } from "@/components/ui/button/SecondaryButton";
import { badgeListActions } from "@/share/store/badgeList/main";

export const MoodleLoginForm = ({
  setIsNeedMoodleLogin,
  getMyBadges,
}: {
  setIsNeedMoodleLogin: Dispatch<SetStateAction<boolean>>;
  getMyBadges: (username: string, password: string) => void;
}) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { clearBadgeList } = badgeListActions.useClearBadgeList();
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
            placeholder="UserName"
            maxLength={256}
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
            maxLength={256}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Box>
        <Box mt={8}>
          <PrimaryButton
            mt={4}
            w={"full"}
            onClick={() => {
              setIsNeedMoodleLogin(false);
              getMyBadges(username, password);
            }}
          >
            バッジ一覧取得
          </PrimaryButton>
        </Box>
        <Box mt={4}>
          <SecondaryButton
            mt={4}
            w={"full"}
            onClick={() => {
              clearBadgeList();
              setIsNeedMoodleLogin(false);
            }}
          >
            戻る
          </SecondaryButton>
        </Box>
      </FormControl>
    </Box>
  );
};
