import { getEntityForUserInApi } from "backend/auth/getEntityForUserInApi";
import {
  createSettlementAccount,
  getSettlementAccount,
} from "backend/repository/settlementAccount";
import { NextApiRequest, NextApiResponse } from "next";

export const handle = async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case "GET": {
      return getEntityForUserInApi(req, res, getSettlementAccount);
    }
    case "POST": {
      return getEntityForUserInApi(req, res, createSettlementAccount, req.body);
    }
    default: {
      res.status(405).end();
    }
  }
};

export default handle;
