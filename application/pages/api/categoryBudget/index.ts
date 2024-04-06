import { NextApiRequest, NextApiResponse } from "next";

import { getEntityForUserInApi } from "backend/auth/getEntityForUserInApi";
import {
  createCategoryBudget,
  getCategoryBudgets,
} from "backend/repository/categoryBudget";

export const handle = async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case "GET": {
      return getEntityForUserInApi(req, res, getCategoryBudgets);
    }
    case "POST": {
      return getEntityForUserInApi(req, res, createCategoryBudget, req.body);
    }
    default: {
      res.status(405).end();
    }
  }
};

export default handle;
