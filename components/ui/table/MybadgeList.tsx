import { CheckIcon } from "@chakra-ui/icons";
import { TableContainer, Table, Thead, Tr, Th, Tbody, Td, Link } from "@chakra-ui/react";
import { useRouter } from "next/router";

import { pagePath } from "@/constants";
import { IfBadgeInfo } from "@/types/BadgeInfo";

const MyBadgesList = (badgeList: IfBadgeInfo[]) => {
  const router = useRouter();
  return (
    <TableContainer>
      <Table variant="striped" colorScheme="green" sx={{ tableLayout: "fixed" }}>
        <Thead>
          <Tr bg="green.300">
            <Th p={4} w={100}>
              取得済
            </Th>
            <Th minW="200">バッジ名</Th>
            <Th minW="200">バッジ詳細</Th>
            <Th w={120}>発行日</Th>
          </Tr>
        </Thead>
        <Tbody>
          {badgeList?.map((badge, index: number) => {
            const dateTime = new Date(badge.timecreated * 1000);
            return (
              <Tr key={index} textAlign="left">
                {/** TODO: 取得済みであるかをチェック DBに登録されているバッジ名で比較する？ */}
                <Td>{badge.name === "コーステスト" && <CheckIcon />}</Td>
                <Td sx={{ whiteSpace: "pre-wrap" }}>
                  <Link
                    color="teal.500"
                    href="#"
                    onClick={
                      () => router.push(pagePath.badge.vcadd)
                      // convertOpenBadgeToVC4clearInterval(badge)
                    }
                  >
                    {badge.name}
                  </Link>
                </Td>
                <Td sx={{ whiteSpace: "pre-wrap" }}>{badge.description}</Td>
                <Td>
                  {dateTime.getFullYear()}/{dateTime.getMonth() + 1}/{dateTime.getDate()}
                </Td>
              </Tr>
            );
          })}
        </Tbody>
      </Table>
    </TableContainer>
  );
};

const MyBadgesListSp = (badgeList: IfBadgeInfo[]) => {
  const router = useRouter();
  return (
    <TableContainer>
      <Table variant="striped" colorScheme="green" sx={{ tableLayout: "fixed" }}>
        <Thead>
          <Tr bg="green.300">
            <Th p={4}>取得済</Th>
            <Th w={160}>バッジ名</Th>
            <Th w={120}>発行日</Th>
          </Tr>
        </Thead>
        <Tbody>
          {badgeList?.map((badge, index: number) => {
            const dateTime = new Date(badge.timecreated * 1000);
            return (
              <Tr key={index} textAlign="left">
                {/** TODO: 取得済みであるかをチェック DBに登録されているバッジ名で比較する？ */}
                <Td>{badge.name === "コーステスト" && <CheckIcon />}</Td>
                <Td sx={{ whiteSpace: "pre-wrap" }}>
                  <Link
                    color="teal.500"
                    href="#"
                    onClick={
                      () => router.push(pagePath.badge.vcadd)
                      // convertOpenBadgeToVC4clearInterval(badge)
                    }
                  >
                    {badge.name}
                  </Link>
                </Td>
                <Td>
                  {dateTime.getFullYear()}/{dateTime.getMonth() + 1}/{dateTime.getDate()}
                </Td>
              </Tr>
            );
          })}
        </Tbody>
      </Table>
    </TableContainer>
  );
};

export { MyBadgesList, MyBadgesListSp };
