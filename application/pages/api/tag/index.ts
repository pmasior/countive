import { NextApiRequest, NextApiResponse } from "next";

import { getEntityForUserInApi } from "backend/auth/getEntityForUserInApi";
import { createTag, findTags } from "backend/repository/tag";

export const handle = async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case "GET": {
      return getEntityForUserInApi(req, res, findTags);
    }
    case "POST": {
      return getEntityForUserInApi(req, res, createTag, req.body);
    }
    default: {
      res.status(405).end();
    }
  }
};

export default handle;
