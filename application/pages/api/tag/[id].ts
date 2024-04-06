import { getEntityForUserInApi } from "backend/auth/getEntityForUserInApi";
import { removeTag, updateTag } from "backend/repository/tag";
import { NextApiRequest, NextApiResponse } from "next";

export const handle = async (req: NextApiRequest, res: NextApiResponse) => {
  const id = parseInt(req.query.id.toString());

  switch (req.method) {
    case "PUT": {
      return getEntityForUserInApi(req, res, updateTag, req.body);
    }
    case "DELETE": {
      return getEntityForUserInApi(req, res, removeTag, id);
    }
    default: {
      res.status(405).end();
    }
  }
};

export default handle;
