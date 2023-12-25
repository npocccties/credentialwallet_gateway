import { Box, Center, Grid, GridItem } from "@chakra-ui/react";
import React from "react";

import { credentialListGetters } from "@/share/store/credentialList/main";

export const DisplayBadgeCount = () => {
  const { totalBadgeCount, submissionsAll } = credentialListGetters.useCredentialList();
  return (
    <Box border={"main"} borderRadius={"2xl"} px={{ base: 2, sm: 8 }} py={{ base: 4, sm: 8 }}>
      <Grid templateColumns={"repeat(2, 1fr)"}>
        <GridItem>
          <DisplauCountData prefixText="バッジ" text="保管数" count={totalBadgeCount} />
        </GridItem>
        <GridItem>
          <DisplauCountData prefixText="うち" text="提出済" count={submissionsAll.totalSubmissionBadges} />
        </GridItem>
        <GridItem></GridItem>
      </Grid>
    </Box>
  );
};

const DisplauCountData = ({
  color,
  prefixText,
  text,
  count,
}: {
  color?: string;
  prefixText: string;
  text: string;
  count: number;
}) => {
  return (
    <Center>
      <Box as="span" textAlign={"left"} fontSize={{ base: "12px", sm: "16px" }}>
        {prefixText}
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
