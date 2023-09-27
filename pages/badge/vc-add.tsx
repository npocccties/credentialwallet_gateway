import { Layout } from "@/components/Layout";
import { Metatag } from "@/components/Metatag";
import { Box } from "@chakra-ui/react";
import React from "react";

export const VcAdd = () => {
  return (
    <Layout align="center" textAlign="center" maxW="2xl">
      <Metatag title="Get Open Badge from Moodle" description="Moodle" />
      <Box></Box>
    </Layout>
  );
};
