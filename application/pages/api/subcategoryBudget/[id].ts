import { getEntityForUserInApi } from "backend/auth/getEntityForUserInApi";
import {
  removeSubcategoryBudget,
  updateSubcategoryBudget,
} from "backend/repository/subcategoryBudget";
import { NextApiRequest, NextApiResponse } from "next";

export const handle = async (req: NextApiRequest, res: NextApiResponse) => {
  const id = parseInt(req.query.id.toString());

  switch (req.method) {
    case "PUT": {
      return getEntityForUserInApi(req, res, updateSubcategoryBudget, req.body);
    }
    case "DELETE": {
      return getEntityForUserInApi(req, res, removeSubcategoryBudget, id);
    }
    default: {
      res.status(405).end();
    }
  }
};

export default handle;
