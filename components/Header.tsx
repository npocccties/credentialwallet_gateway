import { HamburgerIcon } from "@chakra-ui/icons";
import { Box, Flex, Link } from "@chakra-ui/react";
import NextLink from "next/link";

import React from "react";

type Props = {
  onOpen: () => void;
};

export const Header: React.FC<Props> = ({ onOpen }) => {
  return (
    <Box>
      <Flex
        h={"64px"}
        alignItems={"center"}
        justifyContent={"space-between"}
        backgroundColor={"gray.200"}
        p={{ base: 8 }}
      >
        <Box>
          <HamburgerIcon w={6} h={6} cursor={"pointer"} onClick={() => onOpen()} />
        </Box>
        <NextLink href="/">
          <Link fontSize={"2xl"} fontWeight={"bold"} style={{ textDecoration: "none" }}>
            BadgeWallet
          </Link>
        </NextLink>
        <Flex gap={"16px"}></Flex>
      </Flex>
    </Box>
  );
};
