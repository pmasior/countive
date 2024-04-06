import { NextApiRequest, NextApiResponse } from "next";

import { getIcon } from "backend/repository/icon";

export const handle = async (req: NextApiRequest, res: NextApiResponse) => {
  const result = await getIcon();
  res.json(result);
};

export default handle;
