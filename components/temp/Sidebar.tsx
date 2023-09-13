import React from "react";

import { Flex, Box, BoxProps, CloseButton, FlexProps } from "@chakra-ui/react";

const LinkItems: Array<{ name: string }> = [
  { name: "マイウォレット" },
  { name: "バッジ登録" },
  { name: "分析" },
]

interface SidebarProps extends BoxProps {
  onClose: () => void
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
      <Flex h="20" alignItems="center" mx="8" justifyContent="flex-end">
        <CloseButton onClick={onClose} />
      </Flex>
      {LinkItems.map((link) => (
        <NavItem key={link.name}>
          {link.name}
        </NavItem>
      ))}
    </Box>
  )
}

interface NavItemProps extends FlexProps {
  children: React.ReactNode
}

const NavItem = ({ children, ...rest }: NavItemProps) => {
  return (
    <Box
      as="a"
      href="#"
      style={{ textDecoration: "none" }}
      _focus={{ boxShadow: "none" }}
    >
      <Flex
        align="center"
        p="2"
        mx="2"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        _hover={{
          bg: "gray.400",
          color: "white",
        }}
        {...rest}
      >
        {children}
      </Flex>
    </Box>
  )
}