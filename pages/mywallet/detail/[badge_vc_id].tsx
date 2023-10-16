import { useRouter } from "next/router";
import React from "react";

import { Layout } from "@/components/Layout";
import { CredentialDetail } from "@/components/page/detail/CredentialDetail";

const CredentialDetailPage = () => {
  const router = useRouter();
  const vcID = router.query.badge_vc_id;
  // const { fetchBadgeDetail } = credentialDetailActions.useFetchBadgeDetail();
  // fetchBadgeDetail(vcID as string);

  return (
    <Layout maxW="xl">
      <CredentialDetail />
    </Layout>
  );
};

export default CredentialDetailPage;
