import { getEntityForUserInApi } from "backend/auth/getEntityForUserInApi";
import {
  removeSubcategory,
  updateSubcategory,
} from "backend/repository/subcategory";
import { NextApiRequest, NextApiResponse } from "next";

export const handle = async (req: NextApiRequest, res: NextApiResponse) => {
  const id = parseInt(req.query.id.toString());

  switch (req.method) {
    case "PUT": {
      return getEntityForUserInApi(req, res, updateSubcategory, req.body);
    }
    case "DELETE": {
      return getEntityForUserInApi(req, res, removeSubcategory, id);
    }
    default: {
      res.status(405).end();
    }
  }
};

export default handle;
