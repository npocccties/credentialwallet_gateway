import { HamburgerIcon } from "@chakra-ui/icons";
import { Box, Flex, Link, Menu, MenuButton, MenuItem, MenuList, Text } from "@chakra-ui/react";
import NextLink from "next/link";
import React, { memo, useEffect, useState } from "react";
import { FaUserAlt } from "react-icons/fa";

import { getCookieValue } from "@/lib/cookie";
import { getUserInfoFormJwt } from "@/lib/userInfo";

type Props = {
  onOpen: () => void;
  showContents: boolean;
};

export const Header: React.FC<Props> = memo(({ onOpen, showContents = true }) => {
  const [name, setName] = useState("");

  useEffect(() => {
    const jwt = getCookieValue("jwt");

    const { displayName } = getUserInfoFormJwt(jwt);
    setName(displayName);
  }, []);
  return (
    <Box as="header" position={"fixed"} w={"100%"} zIndex={1000}>
      <Flex
        h={"64px"}
        alignItems={"center"}
        justifyContent={"space-between"}
        backgroundColor={"gray.200"}
        p={{ base: 8 }}
      >
        <Box>{showContents && <HamburgerIcon w={6} h={6} cursor={"pointer"} onClick={() => onOpen()} />}</Box>
        <Box
          style={{
            position: "absolute",
            left: "50%",
            transform: "translateX(-50%)",
          }}
        >
          <NextLink href="/">
            <Link fontSize={{ base: "xl", md: "2xl" }} fontWeight={"bold"} style={{ textDecoration: "none" }}>
              バッジウォレット
            </Link>
          </NextLink>
        </Box>
        <Box>
          {showContents && (
            <>
              <Flex gap={"16px"} alignItems={"center"} display={{ base: "none", sm: "flex" }}>
                <FaUserAlt />
                <Text fontSize={"xl"}>{name}</Text>
              </Flex>
              <Flex gap={"16px"} alignItems={"center"} display={{ base: "flex", sm: "none" }}>
                <Menu>
                  <MenuButton cursor={"pointer"} minW={0} transition="all 1s">
                    <FaUserAlt />
                  </MenuButton>
                  <MenuList>
                    <MenuItem>{name}</MenuItem>
                  </MenuList>
                </Menu>
              </Flex>
            </>
          )}
        </Box>
      </Flex>
    </Box>
  );
});
