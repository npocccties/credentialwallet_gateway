import { ExternalLinkIcon } from "@chakra-ui/icons";
import { Text, Tabs, TabList, Tab, TabPanels, TabPanel, Box, Divider, Flex, Link, Image } from "@chakra-ui/react";
import React from "react";

import { JSTdatetimeToDisplay, JSTdateToDisplay } from "@/lib/date";
import { VcDetailData, KnowledgeBadges, SubmissionsHistories } from "@/types/api/credential/detail";

type Props = {
  vcDetailData: VcDetailData;
  knowledgeBadges: KnowledgeBadges;
  submissionsHistories: SubmissionsHistories;
};

export const VcDetailTabPanel = ({ vcDetailData, knowledgeBadges, submissionsHistories }: Props) => {
  const { badgeEarnerEmail, badgeIssuerName, badgeIssuedon, courseUrl } = vcDetailData;
  return (
    <Tabs size="md" variant="enclosed">
      <TabList mb={6}>
        <Tab>詳細</Tab>
        <Tab>知識バッジ</Tab>
        <Tab>提出履歴</Tab>
      </TabList>
      <TabPanels>
        <TabPanel>
          <CredentialSubjectItem name="email" data={badgeEarnerEmail} />
          <CredentialSubjectItem name="発行者" data={badgeIssuerName} />
          <CredentialSubjectItem name="発行日" data={JSTdateToDisplay(badgeIssuedon)} />
          <CredentialSubjectItem name="コース情報" data={courseUrl} />
        </TabPanel>
        <TabPanel>
          {knowledgeBadges.map((item, idx) => {
            return <KnowledgeBadgeItem key={idx} name={item.badgeName} image={item.badgeImageUrl} />;
          })}
        </TabPanel>
        <TabPanel>
          {submissionsHistories.map((sub, idx) => {
            return <SubmittionHistoryItem key={idx} name={sub.consumerName} date={sub.submitedAt} />;
          })}
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};

interface CredentialSubjectItemProps {
  name: string;
  data: string | Date;
}

const CredentialSubjectItem: React.FC<CredentialSubjectItemProps> = ({ name, data }) => {
  return (
    <Box>
      <Text color="gray" mb={4}>
        {name}
      </Text>
      {"コース情報" === name ? (
        <Text fontSize="lg" my={8}>
          <Link href={data as string} color={"teal"} isExternal>
            OKUTEPのコース情報を見る <ExternalLinkIcon />
          </Link>
        </Text>
      ) : (
        <Text fontSize="lg" my={8}>
          {data}
        </Text>
      )}
      <Divider mb={8} />
    </Box>
  );
};

interface KnowledgeBadgeItemProps {
  image: string;
  name: string;
}

const KnowledgeBadgeItem: React.FC<KnowledgeBadgeItemProps> = ({ name, image }) => {
  return (
    <>
      <Flex direction={"row"} alignItems={"center"}>
        <Box minW={"128px"}>
          <Image h={{ base: 24, sm: 32 }} w={{ base: 24, sm: 32 }} fit={"cover"} src={image} alt={"test"} />
        </Box>
        <Box ml={{ base: 4, sm: 16 }}>
          <Text fontSize={{ base: "md", sm: "lg" }}>{name}</Text>
        </Box>
      </Flex>
      <Divider mt={4} mb={8} />
    </>
  );
};

interface SubmittionHistoryItemProps {
  name: string;
  date: string;
}

const SubmittionHistoryItem: React.FC<SubmittionHistoryItemProps> = ({ name, date }) => {
  return (
    <Box>
      <Text color="gray">提出日時</Text>
      <Text fontSize="lg" mt={2} mb={8}>
        {JSTdatetimeToDisplay(date)}
      </Text>
      <Text color="gray" mt={4}>
        提出先
      </Text>
      <Text fontSize="lg" mt={2} mb={8}>
        {name}
      </Text>
      <Divider mb={8} />
    </Box>
  );
};
