import { Box, Flex, Grid, GridItem, Image, Text } from "@chakra-ui/react";
import React from "react";

import { formatDateToJST } from "@/lib/date";
import { DisplayBadgeVc } from "@/types/api/credential";

type Props = {
  badgeVc: DisplayBadgeVc;
};

export const BadgeVcCard = ({ badgeVc }: Props) => {
  // const { card } = storedVC.manifest.display;

  const vcPayload = badgeVc.vcDataPayload && JSON.parse(badgeVc.vcDataPayload);
  const image = vcPayload?.vc?.credentialSubject.photo;
  return (
    <Grid
      border={"2px"}
      borderColor={"gray.200"}
      rounded="2xl"
      templateColumns={"repeat(3, 1fr)"}
      p={{ base: 3, sm: 6 }}
    >
      <GridItem display={"grid"} placeItems={"center"} rowSpan={3} p={{ base: 1, sm: 2 }}>
        <Image fit={"cover"} src={"data:image/png;base64," + image} alt={"test"} />
      </GridItem>
      <GridItem px="2" py="1" alignItems="center" margin={"0"} colSpan={2}>
        <Text fontSize={{ sm: "xl", base: "md" }} fontWeight={"bold"}>
          {badgeVc.badgeName}
        </Text>
      </GridItem>

      {/** desktop */}
      <GridItem display={{ base: "none", sm: "block" }} px="2" py="1" alignItems="center" colSpan={2}>
        <Flex direction={"row"} alignItems={"center"}>
          <Text fontSize={"xs"}>発行者</Text>
          <Text fontSize={"sm"} ml={2}>
            {badgeVc.badgeIssuerName}
          </Text>
          <Text mx={2}>/</Text>
          <Text fontSize={"xs"}>発行日</Text>
          <Text fontSize={"sm"} ml={2}>
            {formatDateToJST(badgeVc.badgeIssuedon)}
          </Text>
        </Flex>
      </GridItem>
      <GridItem display={{ base: "none", sm: "block" }} px="2" py="1" alignItems="center" colSpan={2}>
        <Grid templateColumns={"100px 1fr"} alignItems={"flex-start"} mr={4}>
          <Box mb={0}>
            <Text fontSize={"xs"}>バッジ提出状況</Text>
          </Box>
          <Flex ml={4} direction={"column"}>
            {badgeVc.submissions.length === 0 ? (
              <Box w={"100%"} mb={1} borderBottom={"1px"} borderColor={"gray.200"}>
                <Text color={"red"} fontSize={"sm"}>
                  未提出
                </Text>
              </Box>
            ) : (
              badgeVc.submissions.map((item, index) => {
                return (
                  <Box key={index} w={"100%"} mb={1} borderBottom={"1px"} borderColor={"gray.200"}>
                    <SubmissionsList submitedAt={item.submitedAt} customerName={item.customerName} />
                  </Box>
                );
              })
            )}
          </Flex>
        </Grid>
      </GridItem>

      {/** smart phone */}
      <GridItem display={{ base: "block", sm: "none" }} px="2" py="1" alignItems="center" colSpan={2}>
        <Flex direction={"row"} alignItems={"flex-start"} gap={4} justifyContent={"space-between"}>
          <Flex direction={"column"}>
            <Text fontSize={"9px"}>発行者</Text>
            <Text fontSize={"12px"} ml={1}>
              {badgeVc.badgeIssuerName}
            </Text>
          </Flex>
          <Flex direction={"column"}>
            <Text fontSize={"9px"}>発行日</Text>
            <Text fontSize={"12px"} ml={1}>
              {formatDateToJST(badgeVc.badgeIssuedon)}
            </Text>
          </Flex>
        </Flex>
      </GridItem>
      <GridItem display={{ base: "block", sm: "none" }} px="2" py="1" alignItems="center" colSpan={2}>
        <Flex direction={"column"} mr={0}>
          <Box mb={1}>
            <Text fontSize={"9px"}>バッジ提出状況</Text>
          </Box>
          <Flex ml={{ base: 1, sm: 4 }} direction={"column"}>
            {badgeVc.submissions.length === 0 ? (
              <Box w={"100%"} mb={1} borderBottom={"1px"} borderColor={"gray.200"}>
                <Text color={"red"} fontSize={"xs"}>
                  未提出
                </Text>
              </Box>
            ) : (
              badgeVc.submissions.map((item, index) => {
                return (
                  <Box key={index} w={"100%"} mb={1} borderBottom={"1px"} borderColor={"gray.200"}>
                    <SubmissionsList submitedAt={item.submitedAt} customerName={item.customerName} />
                  </Box>
                );
              })
            )}
          </Flex>
        </Flex>
      </GridItem>
    </Grid>
  );
};

const SubmissionsList = ({ submitedAt, customerName }: { submitedAt: string; customerName: string }) => {
  return (
    <Flex direction={"row"} justifyContent={"space-between"} gap={2}>
      <Box>
        <Text fontSize={"xs"}>{formatDateToJST(submitedAt)}</Text>
      </Box>
      <Box>
        <Text fontSize={"xs"}>{customerName}</Text>
      </Box>
    </Flex>
  );
};
