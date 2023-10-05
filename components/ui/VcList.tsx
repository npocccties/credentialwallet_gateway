import { Box, Grid } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";

import { BadgeVcCard } from "@/components/ui/card/BadgeVcCard";
import { pagePath } from "@/constants";
import { badgeListGetters } from "@/share/store/badgeList/main";

export const VcList = () => {
  const { badgeList } = badgeListGetters.useBadgeList();
  const router = useRouter();

  return (
    <>
      {badgeList?.badgeVcList?.map((item, idx) => {
        // TODO: BadgeVccardに処理を移動
        const vcPayload = JSON.parse(item.vc_data_payload);
        const image = vcPayload.vc.credentialSubject.photo;
        return (
          <Grid gap={4} key={idx}>
            <Box
              cursor={"pointer"}
              _hover={{ opacity: 0.9, transition: "0.2s" }}
              onClick={() => {
                router.push(`${pagePath.mywallet.detail}/${item.badge_vc_id}`);
              }}
            >
              <BadgeVcCard
                image={image}
                name={item.badge_name}
                issuer={item.badge_issuer_name}
                issuedate={item.badge_issuedon.toString()}
              />
            </Box>
          </Grid>
        );
      })}
    </>
  );
};
