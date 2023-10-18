import { Box, Grid } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";

import { BadgeVcCard } from "@/components/ui/card/BadgeVcCard";
import { pagePath } from "@/constants";
import { credentialListGetters } from "@/share/store/credentialList/main";

export const VcList = () => {
  const { badgeVcList } = credentialListGetters.useCredentialList();
  const router = useRouter();

  return (
    <>
      {badgeVcList?.map((badgeVc, idx) => {
        return (
          <Grid gap={4} key={idx}>
            <Box
              cursor={"pointer"}
              _hover={{ opacity: 0.9, transition: "0.2s" }}
              onClick={() => {
                router.push(`${pagePath.wallet.detail}/${badgeVc.badgeVcId}`);
              }}
            >
              <BadgeVcCard badgeVc={badgeVc} />
            </Box>
          </Grid>
        );
      })}
    </>
  );
};
