import React, { useEffect } from "react";

import { SearchForm } from "@/components/model/credential/CredentialSearchForm";
import { DisplayBadgeCount } from "@/components/ui/card/DisplayBadgeCount";
import { VcList } from "@/components/ui/VcList";
import { credentialListActions } from "@/share/store/credentialList/main";

export const WaletVCList = () => {
  const { fetchCredentialList } = credentialListActions.useFetchCredentialList();
  useEffect(() => {
    fetchCredentialList();
  }, []);

  return (
    <>
      <DisplayBadgeCount />
      <SearchForm />
      <VcList />
    </>
  );
};
