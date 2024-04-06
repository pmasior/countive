import { NextApiRequest, NextApiResponse } from "next";

import { getCurrency } from "backend/repository/currency";

export const handle = async (req: NextApiRequest, res: NextApiResponse) => {
  const result = await getCurrency();
  res.json(result);
};

export default handle;
