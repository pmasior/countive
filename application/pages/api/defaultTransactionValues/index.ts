import { NextApiRequest, NextApiResponse } from "next";

import { getEntityForUserInApi } from "backend/auth/getEntityForUserInApi";
import { getDefaultTransactionValues } from "backend/repository/defaultTransactionValues";

export const handle = async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case "GET": {
      return getEntityForUserInApi(req, res, getDefaultTransactionValues);
    }
    case "POST": {
      // TODO:
      return;
    }
    default: {
      res.status(405).end();
    }
  }
};

export default handle;
