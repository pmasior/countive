import { useRouter } from "next/router";

export const useRouteParam = <T extends string | number = string>(
  name: string,
  type: "number" | "string" = "string"
): T => {
  const router = useRouter();
  const paramValue = router.query[name]?.toString();

  if (type === "string") {
    return paramValue as T;
  } else if (type === "number" && paramValue) {
    return parseInt(paramValue) as T;
  }
  throw new Error(`Route param ${name} not exist`);
};
