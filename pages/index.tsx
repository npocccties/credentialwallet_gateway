import React, { useState } from "react";
import type { GetServerSideProps, NextPage } from "next";
import { Box, Button, Flex, Grid, IconButton } from "@chakra-ui/react";

import { Layout } from "../components/Layout";
import { Metatag } from "../components/Metatag";
import { SERVICE_NAME, SERVICE_DESCRITION } from "../configs";
import { useRouter } from "next/router";
import { BadgeVcCard } from "../components/ui/card/BadgeVcCard";
import { useForm } from "react-hook-form";
import { SearchForm } from "../components/ui/SearchForm";
import { SearchFormItem } from "../types/temp";
import { ArrowLeftIcon, ArrowRightIcon, ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import { Pagination } from "../components/ui/Pagination";
import axios from "axios";
import { DisplayBadgeCount } from "../components/ui/card/DisplayBadgeCount";

type Props = {
  data: {
    image: string;
    name: string;
    category: string;
    issuer: string;
    issuedate: string;
  }[];
  totalPages: number;
  currentPage: number;
};

const Home: NextPage<Props> = (props) => {
  console.log(props);
  const [badgeVcList, setBadgeVcList] = useState(props.data);
  const [currentPage, setCurrentPage] = useState(props.currentPage);
  // sconst currentPage = 9;
  // const [totalPages, setTotalPages] = useState(props.totalPages);
  const [totalPages, setTotalPages] = useState(props.totalPages);

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
    <Layout maxW="xl">
      <Metatag title={SERVICE_NAME} description={SERVICE_DESCRITION} />
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
    </Layout>
  );
};

export default Home;

export const getServerSideProps: GetServerSideProps = async () => {
  const data = await fetch("http://localhost:3000/api/temp/badgeVcList");
  const props = data.json();
  console.log("data", data);

  return { props: props };
};
