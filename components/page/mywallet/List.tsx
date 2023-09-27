import React from "react";
import { Box, Button, Flex, Grid, IconButton } from "@chakra-ui/react";

import { useRouter } from "next/router";
import { BadgeVcCard } from "@/components/ui/card/BadgeVcCard";
import { useForm } from "react-hook-form";
import { SearchForm } from "@/components/ui/SearchForm";
import { BadgeVcs, SearchFormItem } from "@/types/temp";
import { Pagination } from "@/components/ui/Pagination";
import { DisplayBadgeCount } from "@/components/ui/card/DisplayBadgeCount";
import { badgeListGetters } from "@/share/store/badgeList/main";

export const MyWaletVCList = () => {
  const { badgeList } = badgeListGetters.useBadgeList();

  // const handleClickPrev = async () => {
  //   console.log("previod");
  //   const res = await fetch(`${baseUrl}/api/temp/badgeVcList`);
  //   const data = await res.json();
  //   setPageState(data);
  // };

  // const handleClickNext = async () => {
  //   console.log("next");
  //   const res = await fetch(`${baseUrl}/api/temp/badgeVcList?page=${totalPages}`);
  //   const data = await res.json();
  //   setPageState(data);
  // };

  // const handleClickMove = async (page: number) => {
  //   console.log("handle", page);
  //   const res = await fetch(`${baseUrl}/api/temp/badgeVcList?page=${page}`);
  //   const data = await res.json();
  //   setPageState(data);
  // };

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<SearchFormItem>();
  const router = useRouter();
  return (
    <>
      <DisplayBadgeCount badgeCount={badgeList.dataCount} />
      <SearchForm register={register} handleSubmit={handleSubmit} isSubmitting={isSubmitting} />
      {badgeList.badgeVcList?.map((item, idx) => {
        const vcPayload = JSON.parse(item.vc_data_payload);
        const image = vcPayload.vc.credentialSubject.photo;
        return (
          <Grid gap={4} key={idx}>
            <Box
              cursor={"pointer"}
              _hover={{ opacity: 0.9, transition: "0.2s" }}
              onClick={() => {
                router.push(`/detail/${item.badge_vc_id}`);
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
      {/* <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        handlePrev={handleClickPrev}
        handleNext={handleClickNext}
        handleMove={handleClickMove}
      /> */}
    </>
  );
};
