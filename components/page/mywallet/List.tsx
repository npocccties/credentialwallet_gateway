import React, { useState } from "react";
import { Box, Button, Flex, Grid, IconButton } from "@chakra-ui/react";
import jsonwebtoken from "jsonwebtoken";

import { useRouter } from "next/router";
import { BadgeVcCard } from "@/components/ui/card/BadgeVcCard";
import { useForm } from "react-hook-form";
import { SearchForm } from "@/components/ui/SearchForm";
import { BadgeVcs, SearchFormItem } from "@/types/temp";
import { Pagination } from "@/components/ui/Pagination";
import { DisplayBadgeCount } from "@/components/ui/card/DisplayBadgeCount";
import { decodeJWTToVCData } from "@/lib/utils";

type Props = {
  data: BadgeVcs[];
  totalPagesProps: number;
  currentPageProps: number;
};

export const MyWaletVCList = ({ data, totalPagesProps, currentPageProps }: Props) => {
  const [badgeVcList, setBadgeVcList] = useState(data);
  const [currentPage, setCurrentPage] = useState(currentPageProps);
  const [totalPages, setTotalPages] = useState(totalPagesProps);

  const setPageState = (data: any) => {
    setBadgeVcList(data.badgeVcList);
    setTotalPages(data.totalPages);
    setCurrentPage(data.currentPage);
  };

  const handleClickPrev = async () => {
    console.log("previod");
    const res = await fetch("http://localhost:3000/api/temp/badgeVcList");
    const data = await res.json();
    setPageState(data);
  };

  const handleClickNext = async () => {
    console.log("next");
    const res = await fetch(`http://localhost:3000/api/temp/badgeVcList?page=${totalPages}`);
    const data = await res.json();
    setPageState(data);
  };

  const handleClickMove = async (page: number) => {
    console.log("handle", page);
    const res = await fetch(`http://localhost:3000/api/temp/badgeVcList?page=${page}`);
    const data = await res.json();
    setPageState(data);
  };

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<SearchFormItem>();
  const router = useRouter();
  return (
    <>
      <DisplayBadgeCount />
      <SearchForm register={register} handleSubmit={handleSubmit} isSubmitting={isSubmitting} />
      {badgeVcList?.map((item, idx) => {
        // console.log("jwt payload", item.vc_data_payload, item.vc_data_header);
        // const decodeVc = jsonwebtoken.decode(item.vc_data_header, { complete: true });
        // console.log("decodeVc", decodeVc);
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
                image={""} // TODO: 実装途中
                name={item.badge_name}
                category={item.badge_category}
                issuer={item.badge_issuer_name}
                issuedate={item.badge_issuedon.toString()}
              />
            </Box>
          </Grid>
        );
      })}
      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        handlePrev={handleClickPrev}
        handleNext={handleClickNext}
        handleMove={handleClickMove}
      />
    </>
  );
};
