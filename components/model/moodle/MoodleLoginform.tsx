import { Box, Heading, FormControl, FormLabel, Input, Button } from "@chakra-ui/react";
import { Dispatch, SetStateAction, useState } from "react";

export const MoodleLoginForm = ({
  setIsNeedMoodleLogin,
  getMyBadges,
}: {
  setIsNeedMoodleLogin: Dispatch<SetStateAction<boolean>>;
  getMyBadges: (username: string, password: string) => void;
}) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
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
          <Input id="username" placeholder="UserName" value={username} onChange={(e) => setUsername(e.target.value)} />
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
              setIsNeedMoodleLogin(false);
              getMyBadges(username, password);
            }}
          >
            バッジ一覧取得
          </Button>
        </Box>
        <Box mt={4}>
          <Button
            mt={4}
            w={"full"}
            colorScheme="gray"
            onClick={() => {
              setIsNeedMoodleLogin(false);
            }}
          >
            戻る
          </Button>
        </Box>
      </FormControl>
    </Box>
  );
};
