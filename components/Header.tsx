import { HamburgerIcon } from "@chakra-ui/icons";
import { Box, Flex, Link, Menu, MenuButton, MenuItem, MenuList, Text } from "@chakra-ui/react";
import NextLink from "next/link";
import React from "react";
import { FaUserAlt } from "react-icons/fa";

type Props = {
  onOpen: () => void;
};

export const Header: React.FC<Props> = ({ onOpen }) => {
  // TODO: ログインユーザーの情報を取得する
  const userName = "○○太郎";
  return (
    <Box as="header" position={"fixed"} w={"100%"} zIndex={1000}>
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
            バッジウォレット
          </Link>
        </NextLink>
        <Flex gap={"16px"} alignItems={"center"} display={{ base: "none", sm: "flex" }}>
          <FaUserAlt />
          <Text fontSize={"xl"}>{userName}</Text>
        </Flex>
        <Flex gap={"16px"} alignItems={"center"} display={{ base: "flex", sm: "none" }}>
          <Menu>
            <MenuButton cursor={"pointer"} minW={0} transition="all 1s">
              <FaUserAlt />
            </MenuButton>
            <MenuList>
              <MenuItem>{userName}</MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </Flex>
    </Box>
  );
};
