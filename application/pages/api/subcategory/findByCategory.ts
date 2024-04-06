import { NextApiRequest, NextApiResponse } from "next";

import { getEntityForUserInApi } from "backend/auth/getEntityForUserInApi";
import { getSubcategoryForCategory } from "backend/repository/subcategory";

export const handle = async (req: NextApiRequest, res: NextApiResponse) => {
  const categoryFromParams = req.query.category;
  return getEntityForUserInApi(
    req,
    res,
    getSubcategoryForCategory,
    categoryFromParams
  );
};

export default handle;
