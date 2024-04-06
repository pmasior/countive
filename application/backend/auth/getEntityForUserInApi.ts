import { NextApiRequest, NextApiResponse } from "next";

import { getEmailForSession } from "./getEmailForSession";

/**
 * Function called in API which execute operation in database for logged in user
 * @param req data about request received from client
 * @param res data about response send to client
 * @param getEntity function which get data from database
 */
export const getEntityForUserInApi = async <Type>(
  req: NextApiRequest,
  res: NextApiResponse,
  getEntity: (userEmailForSession: string, ...queryParams: any[]) => Type,
  ...queryParams: any[]
) => {
  const userEmailForSession = await getEmailForSession({ req });
  if (userEmailForSession) {
    let result;
    try {
      result = await getEntity(userEmailForSession, ...queryParams);
    } catch (err) {
      if (err instanceof Error) {
        res.status(403).json({ message: err.message });
      }
    }
    res.json(result);
  } else {
    res.status(401).end();
  }
};
