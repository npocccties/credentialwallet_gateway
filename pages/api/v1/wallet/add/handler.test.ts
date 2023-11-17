import { NextApiRequest, NextApiResponse } from "next";
import { createRequest, createResponse } from "node-mocks-http";

import handler from "./handler";

import { api } from "@/share/usecases/api";
import { mockAddWallet } from "@/test-server/mocks/mockData";
import { prismaMock } from "@/test-server/mocks/prisma/singleton";

type ApiRequest = NextApiRequest & ReturnType<typeof createRequest>;
type ApiResponse = NextApiResponse & ReturnType<typeof createResponse>;

describe(api.v1.wallet.add, () => {
  test("リクエストが不正な値で400が返る", async () => {
    const mockReq = createRequest<ApiRequest>({
      session: {
        eppn: 33,
      },
    });
    const mockRes = createResponse<ApiResponse>();

    await handler(mockReq, mockRes);
    expect(mockRes.statusCode).toEqual(400);
  });

  test("セッション情報がないため401で返る", async () => {
    const mockReq = createRequest<ApiRequest>({
      session: undefined,
    });
    const mockRes = createResponse<ApiResponse>();

    await handler(mockReq, mockRes);
    expect(mockRes.statusCode).toEqual(401);
  });

  test("ウォレットの作成が成功し200が返る", async () => {
    prismaMock.wallet.create.mockResolvedValue(mockAddWallet);

    const mockReq = createRequest<ApiRequest>({
      session: {
        eppn: "xxxxxx-yyyyyyyy-@niii.co.jp",
      },
    });
    const mockRes = createResponse<ApiResponse>();

    await handler(mockReq, mockRes);
    expect(mockRes.statusCode).toEqual(200);
  });
});
