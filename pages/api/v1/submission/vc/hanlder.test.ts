import { NextApiRequest, NextApiResponse } from "next";
import { createRequest, createResponse } from "node-mocks-http";

import handler from "./handler";

import { api } from "@/share/usecases/api";

type ApiRequest = NextApiRequest & ReturnType<typeof createRequest>;
type ApiResponse = NextApiResponse & ReturnType<typeof createResponse>;

jest.mock("@/server/services/submission.service");

describe(api.v1.badge.metadata, () => {
  test("bodyが空だった場合に400が返る", async () => {
    const mockReq = createRequest<ApiRequest>({
      body: {},
    });
    const mockRes = createResponse<ApiResponse>();

    await handler(mockReq, mockRes);
    expect(mockRes.statusCode).toEqual(400);
  });

  test("cabinetへのapiリクエストが完了し、レスポンスデータと200が返る", async () => {
    const mockReq = createRequest<ApiRequest>({
      body: {
        consumerId: "1",
        badgeVcId: "1",
      },
    });
    const mockRes = createResponse<ApiResponse>();

    await handler(mockReq, mockRes);
    expect(mockRes.statusCode).toEqual(200);
  });
});
