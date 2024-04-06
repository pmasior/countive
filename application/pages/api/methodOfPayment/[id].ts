import { getEntityForUserInApi } from "backend/auth/getEntityForUserInApi";
import {
  removeMethodOfPayment,
  updateMethodOfPayment,
} from "backend/repository/methodOfPayment";
import { NextApiRequest, NextApiResponse } from "next";

export const handle = async (req: NextApiRequest, res: NextApiResponse) => {
  const id = parseInt(req.query.id.toString());

  switch (req.method) {
    case "PUT": {
      return getEntityForUserInApi(req, res, updateMethodOfPayment, req.body);
    }
    case "DELETE": {
      return getEntityForUserInApi(req, res, removeMethodOfPayment, id);
    }
    default: {
      res.status(405).end();
    }
  }
};

export default handle;
