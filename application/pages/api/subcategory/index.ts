import { NextApiRequest, NextApiResponse } from "next";

import { getEntityForUserInApi } from "backend/auth/getEntityForUserInApi";
import {
  createSubcategory,
  getSubcategory,
} from "backend/repository/subcategory";

export const handle = async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case "GET": {
      return getEntityForUserInApi(req, res, getSubcategory);
    }
    case "POST": {
      return getEntityForUserInApi(req, res, createSubcategory, req.body);
    }
    default: {
      res.status(405).end();
    }
  }
};

export default handle;
