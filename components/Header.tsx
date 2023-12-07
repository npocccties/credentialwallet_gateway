import { HamburgerIcon } from "@chakra-ui/icons";
import { Box, Flex, Link, Menu, MenuButton, MenuItem, MenuList, Text } from "@chakra-ui/react";
import NextLink from "next/link";
import React, { memo, useEffect, useState } from "react";
import { FaUserAlt } from "react-icons/fa";
import { MdLogout } from "react-icons/md";

import { getCookieValue } from "@/lib/cookie";
import { getUserInfoFormJwt } from "@/lib/userInfo";

type Props = {
  onOpen: () => void;
  showContents: boolean;
};

const logoutLink = process.env.NEXT_PUBLIC_LOGOUT_LINK as string;

export const Header: React.FC<Props> = memo(({ onOpen, showContents = true }) => {
  const [name, setName] = useState("");

  useEffect(() => {
    const session_cookie = getCookieValue("session_cookie");

    const { displayName } = getUserInfoFormJwt(session_cookie);
    setName(displayName);
  }, []);
  return (
    <Box as="header" position={"fixed"} w={"100%"} zIndex={1000}>
      <Flex
        h={"64px"}
        alignItems={"center"}
        justifyContent={"space-between"}
        backgroundColor={"basic.black"}
        p={{ base: 8 }}
      >
        <Box>
          {showContents && (
            <HamburgerIcon color={"basic.white"} w={6} h={6} cursor={"pointer"} onClick={() => onOpen()} />
          )}
        </Box>
        <Box
          style={{
            position: "absolute",
            left: "50%",
            transform: "translateX(-50%)",
          }}
        >
          <NextLink href="/">
            <Link
              color={"basic.white"}
              fontSize={{ base: "xl", md: "2xl" }}
              fontWeight={"bold"}
              style={{ textDecoration: "none" }}
            >
              バッジウォレット
            </Link>
          </NextLink>
        </Box>
        <Box>
          {showContents && (
            <>
              <Flex gap={"8px"} alignItems={"center"} color={"basic.white"} display={{ base: "none", sm: "flex" }}>
                <FaUserAlt />
                <Text fontSize={"xl"} mr={2}>
                  {name}
                </Text>
                <MdLogout size="24" />
                <Link fontSize={"xl"} href={logoutLink} style={{ textDecoration: "none" }}>
                  <Text>ログアウト</Text>
                </Link>
              </Flex>
              <Flex gap={"16px"} alignItems={"center"} color={"basic.white"} display={{ base: "flex", sm: "none" }}>
                <Menu>
                  <MenuButton cursor={"pointer"} minW={0} transition="all 1s">
                    <FaUserAlt />
                  </MenuButton>
                  <MenuList color={"basic.black"}>
                    <MenuItem>
                      <Text>{name}</Text>
                    </MenuItem>
                    <MenuItem>
                      <Link href={logoutLink} style={{ textDecoration: "none" }}>
                        <Text>ログアウト</Text>
                      </Link>
                    </MenuItem>
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
