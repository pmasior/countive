import { NextApiRequest, NextApiResponse } from "next";

import { getEntityForUserInApi } from "backend/auth/getEntityForUserInApi";
import {
  createTransaction,
  getTransactions,
} from "backend/repository/transaction";

export const handle = async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case "GET": {
      return getEntityForUserInApi(req, res, getTransactions);
    }
    case "POST": {
      return getEntityForUserInApi(req, res, createTransaction, req.body);
    }
    default: {
      res.status(405).end();
    }
  }
};

export default handle;
