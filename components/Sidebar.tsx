import { Flex, Box, BoxProps, CloseButton, FlexProps, Text } from "@chakra-ui/react";
import React from "react";

const LinkItems: Array<{ name: string; link?: string }> = [
  { name: "マイウォレット", link: "/" },
  { name: "バッジ取り込み", link: "/badge/list" },
  { name: "分析" },
];

interface SidebarProps extends BoxProps {
  onClose: () => void;
}

export const SidebarContent = ({ onClose, ...rest }: SidebarProps) => {
  return (
    <Box
      transition="3s ease"
      bg="gray.200"
      borderRight="1px"
      borderRightColor="gray.300"
      w="100%"
      pos="fixed"
      h="full"
      {...rest}
    >
      <Flex h="20" alignItems="center" p="8" justifyContent="flex-end" borderBottom="1px" borderColor="gray.400">
        <CloseButton onClick={onClose} />
      </Flex>
      {LinkItems.map((item) => (
        <NavItem key={item.name} name={item.name} link={item.link} />
      ))}
    </Box>
  );
};

interface NavItemProps extends FlexProps {
  name: string;
  link?: string;
}

const NavItem = ({ name, link, ...rest }: NavItemProps) => {
  return (
    <Box as="a" href={link ? link : "#"} style={{ textDecoration: "none" }} _focus={{ boxShadow: "none" }}>
      <Flex
        align="center"
        p="6"
        borderBottom="1px"
        borderColor="gray.400"
        role="group"
        cursor="pointer"
        _hover={{
          bg: "gray.400",
          color: "white",
        }}
        {...rest}
      >
        <Text fontSize="md">{name}</Text>
      </Flex>
    </Box>
  );
};
