import React, { useState } from "react";
import { Box, Button, Flex, Grid, IconButton } from "@chakra-ui/react";

import { useRouter } from "next/router";
import { BadgeVcCard } from "@/components/ui/card/BadgeVcCard";
import { useForm } from "react-hook-form";
import { SearchForm } from "@/components/ui/SearchForm";
import { SearchFormItem } from "@/types/temp";
import { Pagination } from "@/components/ui/Pagination";
import { DisplayBadgeCount } from "@/components/ui/card/DisplayBadgeCount";

type Props = {
  data: {
    image: string;
    name: string;
    category: string;
    issuer: string;
    issuedate: string;
  }[];
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
      {badgeVcList?.map((item, idx) => (
        <Grid gap={4} key={idx}>
          <Box
            cursor={"pointer"}
            _hover={{ opacity: 0.9, transition: "0.2s" }}
            onClick={() => {
              router.push("/temp/detail");
            }}
          >
            <BadgeVcCard
              image={item.image}
              name={item.name}
              category={item.category}
              issuer={item.issuer}
              issuedate={item.issuedate}
            />
          </Box>
        </Grid>
      ))}
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
