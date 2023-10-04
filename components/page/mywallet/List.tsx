import React, { useEffect } from "react";
import { useForm } from "react-hook-form";

import { DisplayBadgeCount } from "@/components/ui/card/DisplayBadgeCount";
import { SearchForm } from "@/components/ui/SearchForm";
import { VcList } from "@/components/ui/VcList";
import { SearchFormItem } from "@/types/data";
import { badgeListActions } from "@/share/store/badgeList/main";

export const MyWaletVCList = () => {
  const { fetchBadgeList } = badgeListActions.useFetchBadgeList();
  useEffect(() => {
    fetchBadgeList();
  }, []);

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
  return (
    <>
      <DisplayBadgeCount badgeCount={8} submissionCount={tempdata} />
      <SearchForm register={register} handleSubmit={handleSubmit} isSubmitting={isSubmitting} />
      <VcList />
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

const tempdata = {
  total: 6,
  byDestinationList: [
    { name: "大阪府教育委員会", count: 2 },
    { name: "堺市", count: 4 },
    { name: "大阪市", count: 2 },
  ],
};
