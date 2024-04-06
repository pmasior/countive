import { isUndefined } from "lodash";
import { NextRouter } from "next/router";
import { ParsedUrlQueryInput } from "querystring";

export const changePathname = (
  router: NextRouter,
  pathname: string,
  query: ParsedUrlQueryInput
) =>
  router.push({
    pathname: pathname,
    query: {
      ...router.query,
      ...query,
    },
  });

export const isQueryExist = (query: string | string[] | undefined) =>
  !isUndefined(query);
