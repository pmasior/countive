import { getEntityForUserInApi } from "backend/auth/getEntityForUserInApi";
import {
  createSubcategoryBudget,
  getSubcategoryBudgets,
} from "backend/repository/subcategoryBudget";
import { NextApiRequest, NextApiResponse } from "next";

export const handle = async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case "GET": {
      return getEntityForUserInApi(req, res, getSubcategoryBudgets);
    }
    case "POST": {
      return getEntityForUserInApi(req, res, createSubcategoryBudget, req.body);
    }
    default: {
      res.status(405).end();
    }
  }
};

export default handle;
