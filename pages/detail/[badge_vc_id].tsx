import { Layout } from "@/components/Layout";
import axios from "axios";
import React, { useEffect, useState } from "react";

import { CredentialDetail } from "@/components/page/detail/CredentialDetail";
import { BadgeVcs } from "@/types/temp";
import { useRouter } from "next/router";
import { badgeDetailActions } from "@/share/store/badgeDetail/main";

const CredentialDetailPage = () => {
  const router = useRouter();
  const vcID = router.query.badge_vc_id;
  const { fetchBadgeDetail } = badgeDetailActions.useFetchBadgeDetail();
  fetchBadgeDetail(vcID as string);

  return (
    <Layout maxW="xl">
      <CredentialDetail />
    </Layout>
  );
};

export default CredentialDetailPage;
