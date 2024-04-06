import { getEntityForUserInApi } from "backend/auth/getEntityForUserInApi";
import {
  removeSettlementAccount,
  updateSettlementAccount,
} from "backend/repository/settlementAccount";
import { NextApiRequest, NextApiResponse } from "next";

export const handle = async (req: NextApiRequest, res: NextApiResponse) => {
  const id = parseInt(req.query.id.toString());

  switch (req.method) {
    case "PUT": {
      return getEntityForUserInApi(req, res, updateSettlementAccount, req.body);
    }
    case "DELETE": {
      return getEntityForUserInApi(req, res, removeSettlementAccount, id);
    }
    default: {
      res.status(405).end();
    }
  }
};

export default handle;
