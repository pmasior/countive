import { NextApiRequest, NextApiResponse } from "next";

import { getEntityForUserInApi } from "backend/auth/getEntityForUserInApi";
import { createCategory, getCategories } from "backend/repository/category";

export const handle = async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case "GET": {
      return getEntityForUserInApi(req, res, getCategories);
    }
    case "POST": {
      return getEntityForUserInApi(req, res, createCategory, req.body);
    }
    default: {
      res.status(405).end();
    }
  }
};

export default handle;
