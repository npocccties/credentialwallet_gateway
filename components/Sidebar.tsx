import { ExternalLinkIcon } from "@chakra-ui/icons";
import { Flex, Box, BoxProps, CloseButton, FlexProps, Text, Link } from "@chakra-ui/react";
import React from "react";

import { sidebarItems } from "@/constants/sidebar";

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
      {sidebarItems.map((item) => (
        <NavItem key={item.name} name={item.name} link={item.link} external={item.external} />
      ))}
    </Box>
  );
};

interface NavItemProps extends FlexProps {
  name: string;
  link?: string;
  external?: boolean;
}

const NavItem = ({ name, link, external, ...rest }: NavItemProps) => {
  return (
    <Link
      href={link ? link : "#"}
      style={{ textDecoration: "none" }}
      _focus={{ boxShadow: "none" }}
      isExternal={external}
    >
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
        <Text fontSize="md" mr={2}>
          {name}
        </Text>{" "}
        {external && <ExternalLinkIcon />}
      </Flex>
    </Link>
  );
};
