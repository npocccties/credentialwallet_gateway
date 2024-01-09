import { HamburgerIcon } from "@chakra-ui/icons";
import { Box, Flex, Link, Menu, MenuButton, MenuItem, MenuList, Text } from "@chakra-ui/react";
import NextLink from "next/link";
import { useRouter } from "next/router";
import React, { memo } from "react";
import { FaUserAlt } from "react-icons/fa";
import { MdLogout } from "react-icons/md";
import { TbHelpSquare, TbDeviceDesktopAnalytics } from "react-icons/tb";

import { pagePath } from "@/constants";

type Props = {
  onOpen: () => void;
  showContents: boolean;
};

const logoutLink = process.env.NEXT_PUBLIC_LOGOUT_LINK as string;
const portfolioLink = process.env.NEXT_PUBLIC_E_PORTFOLIO_LINK as string;
const helpLink = process.env.NEXT_PUBLIC_HELP_LINK as string;

export const Header: React.FC<Props> = memo(({ onOpen, showContents = true }) => {
  const router = useRouter();

  return (
    <Box as="header" position={"fixed"} w={"100%"} zIndex={1000}>
      <Flex
        h={"64px"}
        alignItems={"center"}
        justifyContent={"space-between"}
        backgroundColor={"basic.black"}
        p={{ base: 8 }}
      >
        <Box display={{ base: "block", sm: "none" }}>
          {showContents && (
            <HamburgerIcon color={"basic.white"} w={6} h={6} cursor={"pointer"} onClick={() => onOpen()} />
          )}
        </Box>
        <Box display={{ base: "none", sm: "block" }}>
          <Flex gap={"8px"} alignItems={"center"} color={"basic.white"} display={{ base: "none", sm: "flex" }}>
            <NextLink href="/">
              <Link color={"basic.white"} style={{ textDecoration: "none" }}>
                <Box display={"flex"} flexDirection={"row"} alignItems={"center"} gap={1}>
                  <FaUserAlt />
                  <Text fontSize={"xl"} mr={2}>
                    マイウォレット
                  </Text>
                </Box>
              </Link>
            </NextLink>
            <Link
              fontSize={"xl"}
              href={portfolioLink}
              style={{ textDecoration: "none" }}
              isExternal={true}
              target={"portfolio"}
            >
              <Box display={"flex"} flexDirection={"row"} alignItems={"center"} gap={1}>
                <TbDeviceDesktopAnalytics />
                <Text>分析</Text>
              </Box>
            </Link>
          </Flex>
        </Box>
        <Box
          style={{
            position: "absolute",
            left: "50%",
            transform: "translateX(-50%)",
          }}
        ></Box>
        <Box>
          {showContents && (
            <>
              <Flex gap={"8px"} alignItems={"center"} color={"basic.white"} display={{ base: "none", sm: "flex" }}>
                <Link fontSize={"xl"} href={helpLink} style={{ textDecoration: "none" }}>
                  <Box display={"flex"} flexDirection={"row"} alignItems={"center"} gap={1}>
                    <TbHelpSquare />
                    <Text fontSize={"xl"} mr={2}>
                      ヘルプ
                    </Text>
                  </Box>
                </Link>
                {pagePath.login.error !== router.asPath && (
                  <>
                    <Link fontSize={"xl"} href={logoutLink} style={{ textDecoration: "none" }}>
                      <Box display={"flex"} flexDirection={"row"} alignItems={"center"} gap={1}>
                        <MdLogout size="24" />
                        <Text>ログアウト</Text>
                      </Box>
                    </Link>
                  </>
                )}
              </Flex>
              <Flex gap={"16px"} alignItems={"center"} color={"basic.white"} display={{ base: "flex", sm: "none" }}>
                <Menu>
                  <MenuButton cursor={"pointer"} minW={0} transition="all 1s">
                    <MdLogout size="24" />
                  </MenuButton>
                  <MenuList color={"basic.black"}>
                    {pagePath.login.error !== router.asPath && (
                      <MenuItem>
                        <Link href={logoutLink} style={{ textDecoration: "none" }}>
                          <Text>ログアウト</Text>
                        </Link>
                      </MenuItem>
                    )}
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
