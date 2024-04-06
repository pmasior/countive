import { NextApiRequest, NextApiResponse } from "next";

import { getEntityForUserInApi } from "backend/auth/getEntityForUserInApi";
import {
  getDefaultTransactionValues,
  updateDefaultTransactionValues,
} from "backend/repository/defaultTransactionValues";

export const handle = async (req: NextApiRequest, res: NextApiResponse) => {
  const id = parseInt(req.query.id.toString());

  switch (req.method) {
    case "GET": {
      return getEntityForUserInApi(req, res, getDefaultTransactionValues, id);
    }
    case "PUT": {
      return getEntityForUserInApi(
        req,
        res,
        updateDefaultTransactionValues,
        req.body
      );
    }
    default: {
      res.status(405).end();
    }
  }
};

export default handle;
