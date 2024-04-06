import { NextApiRequest, NextApiResponse } from "next";

import { getEntityForUserInApi } from "backend/auth/getEntityForUserInApi";
import {
  getTransaction,
  removeTransaction,
  updateTransaction,
} from "backend/repository/transaction";

export const handle = async (req: NextApiRequest, res: NextApiResponse) => {
  const id = parseInt(req.query.id.toString());

  switch (req.method) {
    case "GET": {
      return getEntityForUserInApi(req, res, getTransaction, id);
    }
    case "PUT": {
      return getEntityForUserInApi(req, res, updateTransaction, req.body);
    }
    case "DELETE": {
      return getEntityForUserInApi(req, res, removeTransaction, id);
    }
    default: {
      res.status(405).end();
    }
  }
};

export default handle;
