import { Layout } from "@/components/Layout";
import { Metatag } from "@/components/Metatag";
import { Confirm } from "@/components/page/submission/Confirm";

const SubmittionConfirmPage = () => {
  return (
    <Layout align="center" textAlign="center" maxW="sm">
      <Metatag title="submission badge" description="バッジ提出" />
      <Confirm />
    </Layout>
  );
};

export default SubmittionConfirmPage;
