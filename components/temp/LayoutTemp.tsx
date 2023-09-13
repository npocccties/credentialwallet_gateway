import React from "react";
import { Header } from "./HeaderTemp";
import { Footer } from "../Footer";
import { SidebarContent } from "./Sidebar";

import {
  Flex,
  Box,
  Container,
  Stack,
  useDisclosure,
  BoxProps,
  useColorModeValue,
  CloseButton,
  FlexProps,
  Drawer,
  DrawerContent,
  Button,
  DrawerOverlay,
} from "@chakra-ui/react";

export interface LayoutProps {
  children: React.ReactNode;
  maxW?: string;
  textAlign?: "center";
  align?: string;
}

export const Layout: React.VFC<LayoutProps> = ({ children, maxW, textAlign, align }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Flex minHeight={"100vh"} direction={"column"}>
      <Header onOpen={onOpen} />
      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="xs"
      >
        <DrawerOverlay />
        <DrawerContent maxW="240">
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>
      <Box flex={1}>
        <Container maxW={maxW}>
          <Stack textAlign={textAlign} align={align} spacing={{ base: 8, md: 10 }} py={{ base: 20, md: 28 }}>
            {children}
          </Stack>
        </Container>
      </Box>
      <Footer />
    </Flex>
  );
};
