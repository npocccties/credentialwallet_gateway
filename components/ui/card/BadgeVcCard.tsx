import { Box, Flex, Grid, GridItem, Image, Text } from "@chakra-ui/react";
import React from "react";

import { formatDateToJST } from "@/lib/date";
import { imageTemp } from "@/templates/imageTemp";

type Props = {
  image: string;
  name: string;
  issuer: string;
  issuedate: string;
};

export const BadgeVcCard = ({ image, name, issuer, issuedate }: Props) => {
  // const { card } = storedVC.manifest.display;

  // 仮作成データ
  const submissionBadge = [
    {
      name: "大阪市",
      date: issuedate,
    },
    {
      name: "大阪府",
      date: issuedate,
    },
    {
      name: "堺市教育大学あああ",
      date: issuedate,
    },
  ];

  return (
    <Grid
      border={"2px"}
      borderColor={"gray.200"}
      rounded="2xl"
      templateColumns={"repeat(3, 1fr)"}
      p={{ base: 3, sm: 6 }}
    >
      <GridItem display={"grid"} placeItems={"center"} rowSpan={3} p={{ base: 1, sm: 2 }}>
        <Image fit={"cover"} src={"data:image/png;base64," + imageTemp} alt={"test"} />
      </GridItem>
      <GridItem px="2" py="1" alignItems="center" margin={"0"} colSpan={2}>
        <Text fontSize={{ sm: "xl", base: "md" }} fontWeight={"bold"}>
          {name}
        </Text>
      </GridItem>

      {/** desktop */}
      <GridItem display={{ base: "none", sm: "block" }} px="2" py="1" alignItems="center" colSpan={2}>
        <Flex direction={"row"} alignItems={"center"}>
          <Text fontSize={{ base: "9px", sm: "xs" }}>発行者</Text>
          <Text fontSize={{ base: "12px", sm: "sm" }} ml={{ base: 1, sm: 2 }}>
            {issuer}
          </Text>
          <Text mx={{ base: 1, sm: 2 }}>/</Text>
          <Text fontSize={{ base: "9px", sm: "xs" }}>発行日</Text>
          <Text fontSize={{ base: "12px", sm: "sm" }} ml={{ base: 1, sm: 2 }}>
            {formatDateToJST(issuedate)}
          </Text>
        </Flex>
      </GridItem>

      {/** smart phone */}
      <GridItem display={{ base: "block", sm: "none" }} px="2" py="1" alignItems="center" colSpan={2}>
        <Flex direction={"row"} alignItems={"flex-start"} gap={4} justifyContent={"space-between"}>
          <Flex direction={"column"}>
            <Text fontSize={{ base: "9px", sm: "xs" }}>発行者</Text>
            <Text fontSize={{ base: "12px", sm: "sm" }} ml={{ base: 1, sm: 2 }}>
              {issuer}
            </Text>
          </Flex>
          <Flex direction={"column"}>
            <Text fontSize={{ base: "9px", sm: "xs" }}>発行日</Text>
            <Text fontSize={{ base: "12px", sm: "sm" }} ml={{ base: 1, sm: 2 }}>
              {formatDateToJST(issuedate)}
            </Text>
          </Flex>
        </Flex>
      </GridItem>

      <GridItem px="2" py="1" alignItems="center" colSpan={2}>
        <Flex direction={{ base: "column", sm: "row" }} alignItems={{ base: "unset", sm: "flex-start" }}>
          <Box mb={{ base: 1, sm: 0 }}>
            <Text fontSize={{ base: "9px", sm: "xs" }}>バッジ提出状況</Text>
          </Box>
          <Flex ml={{ base: 1, sm: 4 }} direction={"column"}>
            {submissionBadge.map((item, index) => {
              return (
                <Box key={index} w={"100%"} mb={1} borderBottom={"1px"} borderColor={"gray.200"}>
                  <Flex direction={"row"} justifyContent={"space-between"} gap={2}>
                    <Box>
                      <Text fontSize={"xs"}>{formatDateToJST(item.date)}</Text>
                    </Box>
                    <Box>
                      <Text fontSize={"xs"}>{item.name}</Text>
                    </Box>
                  </Flex>
                </Box>
              );
            })}
          </Flex>
        </Flex>
      </GridItem>
    </Grid>
  );
};
