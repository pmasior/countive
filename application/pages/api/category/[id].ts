import { getEntityForUserInApi } from "backend/auth/getEntityForUserInApi";
import { removeCategory, updateCategory } from "backend/repository/category";
import { NextApiRequest, NextApiResponse } from "next";

export const handle = async (req: NextApiRequest, res: NextApiResponse) => {
  const id = parseInt(req.query.id.toString());

  switch (req.method) {
    case "PUT": {
      return getEntityForUserInApi(req, res, updateCategory, req.body);
    }
    case "DELETE": {
      return getEntityForUserInApi(req, res, removeCategory, id);
    }
    default: {
      res.status(405).end();
    }
  }
};

export default handle;
