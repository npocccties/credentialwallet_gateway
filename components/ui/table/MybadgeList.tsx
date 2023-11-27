import { CheckIcon } from "@chakra-ui/icons";
import { TableContainer, Table, Thead, Tr, Th, Tbody, Td, Link, Box, Text } from "@chakra-ui/react";
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
    return (
      <TableContainer>
        <Table variant="striped" colorScheme="green" sx={{ tableLayout: "fixed" }}>
          <Thead>
            <Tr bg="green.300">
              <Th p={2} w={70} textAlign={"center"}>
                取得済
              </Th>
              <Th minW="200" p={2}>
                バッジ名
              </Th>
              <Th minW="200" p={2}>
                バッジ詳細
              </Th>
              <Th w={120} p={4}>
                発行日
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            {badgeList?.map((badge, index: number) => {
              const dateIssued = convertUNIXorISOstrToJST(badge.dateissued);
              return (
                <Tr key={index} textAlign="left">
                  <Td p={2} textAlign={"center"}>
                    {badge.vcConverted && <CheckIcon />}
                  </Td>
                  <Td sx={{ whiteSpace: "pre-wrap" }} p={2}>
                    {badge.vcConverted ? (
                      <Text>{badge.name}</Text>
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
                  <Td sx={{ whiteSpace: "pre-wrap" }} p={2}>
                    <Text fontSize={"sm"}>{badge.description}</Text>
                  </Td>
                  <Td p={4}>{JSTdateToDisplay(dateIssued)}</Td>
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
    return (
      <TableContainer>
        <Table variant="striped" colorScheme="green" sx={{ tableLayout: "fixed" }}>
          <Thead>
            <Tr bg="green.300">
              <Th p={2} w={50} textAlign={"center"}>
                取得済
              </Th>
              <Th w={160}>バッジ名</Th>
              <Th w={120}>発行日</Th>
            </Tr>
          </Thead>
          <Tbody>
            {badgeList?.map((badge, index: number) => {
              const dateIssued = convertUNIXorISOstrToJST(badge.dateissued);
              return (
                <Tr key={index} textAlign="left">
                  <Td p={2} textAlign={"center"}>
                    {badge.vcConverted && <CheckIcon />}
                  </Td>
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
