export type BadgeMetaData = {
  "@context": string;
  id: string;
  type: string;
  recipient: Recipient;
  issuedOn: Date;
  expires: Date;
  badge: Badge;
};

type Badge = {
  type: string;
  id: string;
  name: string;
  description: string;
  image: string;
  criteria: Criteria;
  issuer: Issuer;
};

type Criteria = {
  narrative: string;
};

export type Issuer = {
  id: string;
  type: string;
  name: string;
  url: string;
  email: string;
};

type Recipient = {
  type: string;
  identity: string;
};
