import { Box, Flex, Grid, GridItem, Image, Text } from "@chakra-ui/react";
import React from "react";
import { StoredVC } from "../../../lib/repository/vc";

type Props = {
  image: string;
  name: string;
  category: string;
  issuer: string;
  issuedate: string;
};

export const BadgeVcCard = ({ image, name, category, issuer, issuedate }: Props) => {
  // const { card } = storedVC.manifest.display;

  return (
    <Grid
      bg={"ffffff"}
      border={"2px"}
      borderColor={"gray.100"}
      rounded="2xl"
      templateRows={"repeat(3)"}
      templateColumns={"repeat(3, 1fr)"}
      p={"6"}
    >
      <GridItem alignItems="center" rowSpan={3}>
        <Image h="24" w="24" fit={"cover"} src={image} alt={"test"} />
      </GridItem>
      <GridItem px="2" py="1" alignItems="center" margin={"0"} colSpan={2}>
        <Text fontSize="xl" fontWeight={"bold"}>
          {name}
        </Text>
      </GridItem>

      <GridItem px="2" py="1" alignItems="center" colSpan={2}>
        <Box bg={"gray.200"} border={"1px"} borderColor={"gray.100"} rounded={"2xl"} p={1} w={"fit-content"}>
          <Text style={{ fontSize: "8px" }}>{category}</Text>
        </Box>
      </GridItem>

      <GridItem p="2" alignItems="center" colSpan={2}>
        <Flex direction={"row"} alignItems={"center"}>
          <Text fontSize={"xs"}>発行者</Text>
          <Text fontSize={"md"} ml={2}>
            {issuer}
          </Text>
          <Text ml={2} mr={2}>
            /
          </Text>
          <Text fontSize={"xs"}>発行日</Text>
          <Text fontSize={"md"} ml={2}>
            {issuedate}
          </Text>
        </Flex>
      </GridItem>
    </Grid>
  );
};
