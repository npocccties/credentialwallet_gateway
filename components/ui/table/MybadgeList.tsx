import { CheckIcon } from "@chakra-ui/icons";
import { TableContainer, Table, Thead, Tr, Th, Tbody, Td, Link, Box } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { memo } from "react";

import { convertUNIXorISOstrToJST, JSTdateToDisplay } from "@/lib/date";
import { IfBadgeInfo } from "@/types/BadgeInfo";

const MyBadgesList = memo(
  ({
    badgeList,
    handleBadgeSelect,
  }: {
    badgeList: IfBadgeInfo[];
    handleBadgeSelect: (uniquehash: string, email: string) => void;
  }) => {
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
              const dateIssued = convertUNIXorISOstrToJST(badge.dateissued);
              return (
                <Tr key={index} textAlign="left">
                  <Td>{badge.vcConverted && <CheckIcon />}</Td>
                  <Td sx={{ whiteSpace: "pre-wrap" }}>
                    {badge.vcConverted ? (
                      <Box>{badge.name}</Box>
                    ) : (
                      <Link
                        color="teal.500"
                        onClick={() => {
                          handleBadgeSelect(badge.uniquehash, badge.email);
                        }}
                      >
                        {badge.name}
                      </Link>
                    )}
                  </Td>
                  <Td sx={{ whiteSpace: "pre-wrap" }}>{badge.description}</Td>
                  <Td>{JSTdateToDisplay(dateIssued)} </Td>
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </TableContainer>
    );
  },
);

const MyBadgesListSp = memo(
  ({
    badgeList,
    handleBadgeSelect,
  }: {
    badgeList: IfBadgeInfo[];
    handleBadgeSelect: (uniquehash: string, email: string) => void;
  }) => {
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
              const dateIssued = convertUNIXorISOstrToJST(badge.dateissued);
              return (
                <Tr key={index} textAlign="left">
                  <Td>{badge.vcConverted && <CheckIcon />}</Td>
                  <Td sx={{ whiteSpace: "pre-wrap" }}>
                    {badge.vcConverted ? (
                      <Box>{badge.name}</Box>
                    ) : (
                      <Link
                        color="teal.500"
                        onClick={() => {
                          handleBadgeSelect(badge.uniquehash, badge.email);
                        }}
                      >
                        {badge.name}
                      </Link>
                    )}
                  </Td>
                  <Td>{JSTdateToDisplay(dateIssued)} </Td>
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </TableContainer>
    );
  },
);

export { MyBadgesList, MyBadgesListSp };
