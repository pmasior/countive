import { GetSessionParams } from "next-auth/react";

import { getEmailForSession } from "./getEmailForSession";

/**
 * Function called in getServerSideProps which get entities from database for logged in user
 * @param context object with request received from client
 * @param getEntity function which get data from database
 * @returns array of entities data
 */
export const getEntityForUserInSSR = async <Type>(
  context: GetSessionParams,
  getEntity: (userEmailForSession: string, ...queryParams: any[]) => Type,
  ...queryParams: any[]
) => {
  const userEmailForSession = await getEmailForSession(context);
  if (userEmailForSession) {
    return await getEntity(userEmailForSession, ...queryParams);
  } else {
    return [];
  }
};
