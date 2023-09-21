import React from "react";
import {
  Heading,
  Text,
  FormLabel,
  Flex,
  Input,
  Button,
  FormControl,
  Box,
  List,
  ListItem,
  ListIcon,
  FormErrorMessage,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  HStack,
  VStack,
  Link,
  Spinner,
  Select,
} from "@chakra-ui/react";
import { Layout } from "../../components/Layout";
import { Metatag } from "../../components/Metatag";
import { useRouter } from "next/router";
import { IfBadgeInfo } from "../../types/BadgeInfo";
import { GetServerSideProps } from "next";
import axios from "axios";

const CreateVC = () => {
  //export default function HookForm() {
  const [badgeList, setBadgeList] = React.useState<IfBadgeInfo[]>([]);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const getMyBadges = async () => {
    const username = "testtest";
    const password = "1456";
    setIsLoading(true);
    const res = await axios.post("http://localhost:3000/api/temp/dummyBadge", {
      username,
      password,
    });
    console.log("res", res.data);

    const badgeData = res.data.badgeList;
    setIsLoading(false);
    setBadgeList(badgeData);
  };
  return (
    // <Layout textAlign="center" align="center">
    <Layout align="center" textAlign="center">
      <Metatag title="Get Open Badge from Moodle" description="Moodle" />
      <Heading
        textAlign={"center"}
        fontWeight={600}
        fontSize={{ base: "xl", sm: "2xl", md: "3xl" }}
        lineHeight={"110%"}
      >
        バッジ取り込み
      </Heading>
      <Flex w="full" justify={"space-between"} direction={"row"} alignItems={"flex-end"}>
        <Box>
          <FormLabel mb={2}>発行者選択</FormLabel>
          <Select w={64}>
            <option value={"option1"}>大阪市教育委員会</option>
            <option value={"option2"}>大阪府教育委員会</option>
            <option value={"option3"}>堺市教育委員会</option>
          </Select>
        </Box>
        <Box>
          <Button colorScheme={"blue"} type="button" onClick={() => getMyBadges()} isLoading={isLoading}>
            バッジデータ取得
          </Button>
        </Box>
      </Flex>
      <Flex w="full" align={"center"} direction={"column"}>
        <Box>
          <TableContainer>
            <Table variant="striped" colorScheme="green" size="lg">
              <Thead>
                <Tr bg="green.300">
                  <Th>No.</Th>
                  <Th minW="200">Name</Th>
                  <Th minW="200">description</Th>
                  <Th>createed</Th>
                </Tr>
              </Thead>
              <Tbody>{myBadgesListTr(badgeList as IfBadgeInfo[])}</Tbody>
            </Table>
          </TableContainer>
        </Box>
      </Flex>
    </Layout>
  );
};
export default CreateVC;

const myBadgesListTr = (badgeList: IfBadgeInfo[]) => {
  const memberList = badgeList?.map((badge, index: number) => {
    let dateTime = new Date(badge.timecreated * 1000);
    return (
      <Tr key={index} textAlign="left">
        <Td>{index + 1}</Td>
        <Td>
          <Link
            color="teal.500"
            href="#"
            onClick={
              () => alert("わーーーー")
              // convertOpenBadgeToVC4clearInterval(badge)
            }
          >
            {badge.name}
          </Link>
        </Td>
        <Td>{badge.description}</Td>{" "}
        <Td>
          {" "}
          {dateTime.getFullYear()}/{dateTime.getMonth() + 1}/{dateTime.getDate()}
        </Td>
      </Tr>
    );
  });

  return memberList;
};

// export const getServerSideProps = async ({ context }) => {
//   const username = "testtest";
//   const password = "1456";
//   const res = await axios.post("http://localhost:3000/api/temp/dummyBadge", {
//     username,
//     password,
//   });
//   console.log("res", res.data);

//   const badgeData = res.data.badgeList;
//   return { props: { badgeData } };
// };
