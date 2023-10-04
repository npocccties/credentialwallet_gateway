import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Center,
  Flex,
  Grid,
  GridItem,
  Text,
} from "@chakra-ui/react";
import React from "react";

type Props = {
  badgeCount: number;
  submissionCount: {
    total: number;
    byDestinationList: {
      name: string;
      count: number;
    }[];
  };
};

export const DisplayBadgeCount = ({ badgeCount, submissionCount }: Props) => {
  return (
    <Box
      border={"2px solid"}
      borderColor={"gray.200"}
      borderRadius={"2xl"}
      px={{ base: 2, sm: 8 }}
      py={{ base: 4, sm: 8 }}
    >
      <Grid templateColumns={"repeat(2, 1fr)"}>
        <GridItem>
          <DisplauCountData color="blue" text="取得数" count={badgeCount} />
        </GridItem>
        <GridItem>
          <DisplauCountData color="skyblue" text="提出数" count={submissionCount.total} />
        </GridItem>
        <GridItem></GridItem>
        <GridItem>
          <Center>
            <Accordion allowToggle>
              <AccordionItem border={"none"}>
                <AccordionButton pt={0} pb={0}>
                  <AccordionIcon />
                  <Box as="span" flex={"1"} textAlign={"left"}>
                    <Text fontSize={{ base: "12px", sm: "14px" }}>提出先別一覧</Text>
                  </Box>
                </AccordionButton>
                <AccordionPanel pb={2}>
                  {submissionCount.byDestinationList.map((item, index) => {
                    return (
                      <Flex
                        key={index}
                        direction={"row"}
                        alignItems={"center"}
                        justifyContent={"space-between"}
                        borderBottom={"1px"}
                        borderColor={"gray.200"}
                      >
                        <Text fontSize={"12px"} maxW={{ base: "70px", sm: "100%" }}>
                          {item.name}
                        </Text>
                        <Flex direction={"row"} alignItems={"center"} ml={{ base: 1, sm: 2 }}>
                          <Text fontSize={{ base: "12px", sm: "14px" }} color={"skyblue"}>
                            提出数
                          </Text>
                          <Text fontSize={"16px"} ml={2}>
                            {item.count}
                          </Text>
                        </Flex>
                      </Flex>
                    );
                  })}
                </AccordionPanel>
              </AccordionItem>
            </Accordion>
          </Center>
        </GridItem>
      </Grid>
    </Box>
  );
};

const DisplauCountData = ({ color, text, count }: { color: string; text: string; count: number }) => {
  return (
    <Center>
      <Box as="span" textAlign={"left"} fontSize={{ base: "12px", sm: "16px" }}>
        バッジ
      </Box>
      <Box as="span" fontSize={{ base: "16px", sm: "24px" }} color={color}>
        {text}
      </Box>
      <Box as="span" ml={4} fontSize={"32px"} fontWeight={"bold"}>
        {count}
      </Box>
    </Center>
  );
};
