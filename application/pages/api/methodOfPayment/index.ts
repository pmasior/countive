import { NextApiRequest, NextApiResponse } from "next";

import { getEntityForUserInApi } from "backend/auth/getEntityForUserInApi";
import {
  createMethodOfPayment,
  getMethodOfPayment,
} from "backend/repository/methodOfPayment";

export const handle = async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case "GET": {
      return getEntityForUserInApi(req, res, getMethodOfPayment);
    }
    case "POST": {
      return getEntityForUserInApi(req, res, createMethodOfPayment, req.body);
      return;
    }
    default: {
      res.status(405).end();
    }
  }
};

export default handle;
