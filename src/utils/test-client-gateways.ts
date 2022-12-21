import { createServer, RequestListener } from "http";
import { NextApiHandler } from "next";
import { apiResolver } from "next/dist/server/api-utils/node";
import request from "supertest";

export const testClient = (handler: NextApiHandler) => {
  const listener: RequestListener = (req, res) => {
    let query: { id: string } | null = null;
    const regex = /\/gateways\/([^\/]+)/;
    const match = req.url?.match(regex);
    if (match) {
      query = { id: match[1] };
    }
    return apiResolver(
      req,
      res,
      query,
      handler,
      {
        previewModeEncryptionKey: "",
        previewModeId: "",
        previewModeSigningKey: "",
      },
      false
    );
  };

  return request(createServer(listener));
};