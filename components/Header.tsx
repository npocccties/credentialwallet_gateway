import { HamburgerIcon } from "@chakra-ui/icons";
import { Box, Flex, Link, Menu, MenuButton, MenuItem, MenuList, Text } from "@chakra-ui/react";
import NextLink from "next/link";
import React from "react";
import { FaUserAlt } from "react-icons/fa";

import { orthrosUserGetters } from "@/share/store/loginUser/Orthros/main";

type Props = {
  onOpen: () => void;
  showContents: boolean;
};

export const Header: React.FC<Props> = ({ onOpen, showContents = true }) => {
  const { displayName } = orthrosUserGetters.useOrthrosUserData();
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
                <Text fontSize={"xl"}>{displayName}</Text>
              </Flex>
              <Flex gap={"16px"} alignItems={"center"} display={{ base: "flex", sm: "none" }}>
                <Menu>
                  <MenuButton cursor={"pointer"} minW={0} transition="all 1s">
                    <FaUserAlt />
                  </MenuButton>
                  <MenuList>
                    <MenuItem>{displayName}</MenuItem>
                  </MenuList>
                </Menu>
              </Flex>
            </>
          )}
        </Box>
      </Flex>
    </Box>
  );
};
