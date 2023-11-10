import { withIronSessionSsr } from "iron-session/next";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

import type { GetServerSidePropsResult, NextPage } from "next";

import { Layout } from "@/components/Layout";
import { Metatag } from "@/components/Metatag";
import { WaletVCList } from "@/components/page/wallet/List";
import { SERVICE_NAME, SERVICE_DESCRITION } from "@/configs";
import { pagePath } from "@/constants";
import { errors } from "@/constants/error";
import { logEndForPageSSR, logStartForPageSSR, logStatus } from "@/constants/log";
import { loggerError, loggerInfo } from "@/lib/logger";
import prisma from "@/lib/prisma";
import { sessionOptions } from "@/lib/session";
import { orthrosUserActions } from "@/share/store/loginUser/Orthros/main";

type Props = {
  displayName: string;
  isCreatedWallet: boolean;
};

export const getServerSideProps = withIronSessionSsr(async function ({
  req,
  res,
}): Promise<GetServerSidePropsResult<Props>> {
  loggerInfo(logStartForPageSSR(pagePath.wallet.list));
  // const eppn = context.req.headers["eppn"] as string;
  // const displayName = context.req.headers["displayName"] as string;

  // const eppn = "tegsdgdsfasete@nii.co.jp";
  const eppn = "user3";
  const displayName = "user3";

  loggerInfo("req.headers", req.headers);

  if (!eppn || !displayName) {
    // TODO: Orthrosにリダイレクトする？
    loggerError(`${logStatus.error} headers not found!`);
    throw new Error("ログイン情報が不正です。");
  }

  try {
    const createdWallet = await prisma.wallet.findUnique({
      where: {
        orthrosId: eppn,
      },
    });

    const isCreatedWallet = !createdWallet ? false : true;
    req.session.eppn = eppn;
    await req.session.save();

    loggerInfo(`${logStatus.success} ${pagePath.wallet.list}`);
    return {
      props: {
        displayName,
        isCreatedWallet,
      },
    };
  } catch (e) {
    loggerError(`${logStatus.error} ${pagePath.wallet.list}`, e.message);

    throw new Error(errors.response500.message);
  } finally {
    loggerInfo(logEndForPageSSR(pagePath.wallet.list));
  }
}, sessionOptions);

const Home: NextPage<Props> = ({ displayName, isCreatedWallet }) => {
  const router = useRouter();
  const { setOrthrosUser } = orthrosUserActions.useSetOrthrosUser();

  useEffect(() => {
    setOrthrosUser({ displayName });

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
