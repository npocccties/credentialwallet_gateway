import { Layout } from "@/components/Layout";
import axios from "axios";
import React, { useEffect, useState } from "react";

import { CredentialDetail } from "@/components/page/detail/CredentialDetail";
import { BadgeVcs } from "@/types/temp";
import { useRouter } from "next/router";

const CredentialDetailPage = () => {
  const router = useRouter();
  const vcID = router.query.badge_vc_id;

  const [badgeVC, setBadgeVc] = useState<BadgeVcs>();

  const fetch = async () => {
    if (vcID) {
      const { data } = await axios.get(`/api/v1/getVcDetail?badge_vc_id=${vcID}`);
      setBadgeVc(data);
    }
  };

  useEffect(() => {
    fetch();
  }, [vcID]);

  console.log(badgeVC);
  return <Layout maxW="xl">{badgeVC && <CredentialDetail badgeVC={badgeVC} />}</Layout>;
};

export default CredentialDetailPage;

// export const getServerSideProps: GetServerSideProps = async (context) => {
//   const { badge_vc_id } = context.query;

//   const { data } = await axios.get(`${process.env.baseURL}/api/v1/getVcDetail?badge_vc_id=${badge_vc_id}`);
//   return { props: data };
// };
