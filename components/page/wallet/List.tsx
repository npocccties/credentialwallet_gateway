import React, { useEffect } from "react";

import { SearchForm } from "@/components/model/credential/CredentialSearchForm";
import { DisplayBadgeCount } from "@/components/ui/card/DisplayBadgeCount";
import { VcList } from "@/components/ui/VcList";
import { credentialListActions } from "@/share/store/credentialList/main";

export const MyWaletVCList = () => {
  const { fetchCredentialList } = credentialListActions.useFetchCredentialList();
  useEffect(() => {
    fetchCredentialList();
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

  return (
    <>
      <DisplayBadgeCount />
      <SearchForm />
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
