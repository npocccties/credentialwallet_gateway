import { PrismaClient } from "@prisma/client";
import { mockDeep, mockReset, DeepMockProxy } from "jest-mock-extended";

import prisma from "@/lib/prisma";

jest.mock("@/lib/prisma", () => ({
  ...jest.requireActual("@/lib/prisma"), // mock only default export
  __esModule: true,
  default: mockDeep<PrismaClient>(),
}));

beforeEach(() => {
  mockReset(prismaMock);
});

/**
 * used to unit test services
 */
export const prismaMock = prisma as unknown as DeepMockProxy<PrismaClient>;
