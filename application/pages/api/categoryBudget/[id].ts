import { getEntityForUserInApi } from "backend/auth/getEntityForUserInApi";
import {
  removeCategoryBudget,
  updateCategoryBudget,
} from "backend/repository/categoryBudget";
import { NextApiRequest, NextApiResponse } from "next";

export const handle = async (req: NextApiRequest, res: NextApiResponse) => {
  const id = parseInt(req.query.id.toString());

  switch (req.method) {
    case "PUT": {
      return getEntityForUserInApi(req, res, updateCategoryBudget, req.body);
    }
    case "DELETE": {
      return getEntityForUserInApi(req, res, removeCategoryBudget, id);
    }
    default: {
      res.status(405).end();
    }
  }
};

export default handle;
