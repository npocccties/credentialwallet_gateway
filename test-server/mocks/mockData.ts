export const mockAddWallet = {
  walletId: 1,
  orthrosId: "xxxxxx-yyyyyyyy-@niii.co.jp",
  createdAt: new Date(),
};

export const mockWalletId = {
  walletId: 1,
};

export const mockBadgeVcList = [
  {
    badgeVcId: 21,
    badgeName: "地域や保護者との連携 (v1.0)",
    badgeIssuerName: "愛知教育大学",
    badgeIssuedon: "2023-10-27T12:10:39+09:00",
    badgeExpires: null,
    vcDataPayload:
      '{"vc":{"@context":["https://www.w3.org/2018/credentials/v1"],"type":["VerifiableCredential","OpenBadgeV2"],"credentialSubject":{"photo":"iVBORw0KGgoVuYmFkZ2VzL3YyIiwidHlwZSI6IkFzc2VydGlvbiIsImlkIjoiaHR0cHM6Ly9kZXYtbG1zLm9rdS5jY2N0aWVzLm9yZy9iYWRnZXMvYXNzZXJ0aW9uLnBocD9iPWY0YzBlNTBlY2ViN2MyNzgxZTBkMGFiZWE0MDBjYzZlYzQ3ZDMzMzQmb2J2ZXJzaW9uPTIifd3UI68AAAAASUVORK5CYII=","email":"user3@example.com","verificationURL":"https://dev-lms.oku.cccties.org/badges/assertion.php?b=f4c0e50eceb7c2781e0d0abea400cc6ec47d3334&obversion=2","issued":"2023-10-27T12:10:39+09:00"},"credentialStatus":{"id":"urn:uuid:2debee5c-2e7c-47d0-8748-62c0503a3dc8?bit-index=47","type":"RevocationList2021Status","statusListIndex":47,"statusListCredential":"did:web:did.cccties.org?service=IdentityHub&queries=W3sibWV0aG9kIjoiQ29sbGVjdGlvbnNRdWVyeSIsInNjaGVtYSI6Imh0dHBzOi8vdzNpZC5vcmcvdmMtc3RhdHVzLWxpc3QtMjAyMS92MSIsIm9iamVjdElkIjoiMmRlYmVlNWMtMmU3Yy00N2QwLTg3NDgtNjJjMDUwM2EzZGM4In1d"}},"jti":"urn:pic:aab1a493730740b5a1a040edd5e7a896","iss":"did:web:did.cccties.org","sub":"did:ion:EiDAIoNhjIHnuI_GTJqJfV6OWjsm1wCN71QETor_3w9NcA:eyJkZWx0YSI6eyJwYXRjaGVzIjpbeyJhY3Rpb24iOiJyZXBsYWNlIiwiZG9jdW1lbnQiOnsicHVibGljS2V5cyI6W3siaWQiOiJzaWduaW5nS2V5IiwicHVibGljS2V5SndrIjp7ImNydiI6InNlY3AyNTZrMSIsImt0eSI6IkVDIiwieCI6InRqS0RvY05XV29hamZNdTVmdmtUMXhIZWtsS3lmX3JRVkFicXpiUTYxX2MiLCJ5IjoiVmVqdHcydTdpVWZaN0ptZ196bmx6TF8xSVh1Ny1sQWh0LXAxYVBMbjVRMCJ9LCJwdXJwb3NlcyI6WyJhdXRoZW50aWNhdGlvbiJdLCJ0eXBlIjoiRWNkc2FTZWNwMjU2azFWZXJpZmljYXRpb25LZXkyMDE5In1dfX1dLCJ1cGRhdGVDb21taXRtZW50IjoiRWlEXzNUOEJkWUJYYVZCazRmQWYxRXdGQVlrUEtvUFVaR1FyeWsxc3duOGNxdyJ9LCJzdWZmaXhEYXRhIjp7ImRlbHRhSGFzaCI6IkVpRFU3N0pyZ0FhU3Zmcld0VDFXZFdvTlhzR2ZISGtfdmU5TU9PX1lYRU9lUWciLCJyZWNvdmVyeUNvbW1pdG1lbnQiOiJFaURfM1Q4QmRZQlhhVkJrNGZBZjFFd0ZBWWtQS29QVVpHUXJ5azFzd244Y3F3In19","iat":1699858326,"exp":1702450326}',
    submissions: [],
  },
];

export const mockSubmissionsAll = {
  totalSubmissionBadges: 0,
  detailSubmissions: [],
};
