import { useRouter } from "next/router";
import React, { useEffect } from "react";

import type { GetServerSidePropsResult, NextPage } from "next";

import { Layout } from "@/components/Layout";
import { Metatag } from "@/components/Metatag";
import { WaletVCList } from "@/components/page/wallet/List";
import { SERVICE_NAME, SERVICE_DESCRITION } from "@/configs";
import { pagePath } from "@/constants";
import prisma from "@/lib/prisma";
import { orthrosUserActions } from "@/share/store/loginUser/Orthros/main";

type Props = {
  eppn: string;
  displayName: string;
  isCreatedWallet: boolean;
};

export async function getServerSideProps(context): Promise<GetServerSidePropsResult<Props>> {
  // const eppn = context.req.headers["eppn"] as string;
  // const displayName = context.req.headers["displayName"] as string;

  const eppn = "gonzaburo@nii.co.jp";
  const displayName = "テスト 三郎";

  if (!eppn || !displayName) {
    // TODO: Orthrosにリダイレクトする？
    throw new Error("ログイン情報が不正です。");
  }

  const createdWallet = await prisma.wallet.findUnique({
    where: {
      orthrosId: eppn,
    },
  });

  const isCreatedWallet = !createdWallet ? false : true;

  return {
    props: {
      eppn,
      displayName,
      isCreatedWallet,
    },
  };
}

const Home: NextPage<Props> = ({ eppn, displayName, isCreatedWallet }) => {
  const router = useRouter();
  const { setOrthrosUser } = orthrosUserActions.useSetOrthrosUser();

  useEffect(() => {
    setOrthrosUser({ eppn, displayName });

    if (!isCreatedWallet) {
      router.push(pagePath.wallet.add);
    }
  }, []);

  return (
    <Layout maxW="xl">
      <Metatag title={SERVICE_NAME} description={SERVICE_DESCRITION} />
      {isCreatedWallet && <WaletVCList />}
    </Layout>
  );
};

export default Home;
