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
import { getUserInfoFormJwt } from "@/lib/userInfo";
import { findWallet } from "@/server/repository/wallet";
import { orthrosUserActions } from "@/share/store/loginUser/Orthros/main";

type Props = {
  displayName: string;
  isCreatedWallet: boolean;
};

export const getServerSideProps = async function ({ req, res }): Promise<GetServerSidePropsResult<Props>> {
  loggerInfo(logStartForPageSSR(pagePath.credential.list));

  // const eppn = "tegsdgdsfasete@nii.co.jp";
  // const eppn = "user3";
  // const displayName = "user3";

  // TODO: 飛んでくるkeyによって変える
  const jwt = req.cookies.jwt;
  console.log("cookies", jwt);
  const { eppn, name: displayName } = getUserInfoFormJwt(jwt);

  loggerInfo("userInfo verify", eppn, displayName);

  try {
    const createdWallet = await findWallet(eppn);

    const isCreatedWallet = !createdWallet ? false : true;

    loggerInfo(`${logStatus.success} ${pagePath.credential.list}`);
    return {
      props: {
        displayName,
        isCreatedWallet,
      },
    };
  } catch (e) {
    loggerError(`${logStatus.error} ${pagePath.credential.list}`, e.message);

    throw new Error(errors.response500.message);
  } finally {
    loggerInfo(logEndForPageSSR(pagePath.credential.list));
  }
};

const Home: NextPage<Props> = ({ displayName, isCreatedWallet }) => {
  const router = useRouter();
  const { setOrthrosUser } = orthrosUserActions.useSetOrthrosUser();

  useEffect(() => {
    setOrthrosUser({ displayName });

    if (!isCreatedWallet) {
      router.push(pagePath.entry);
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
