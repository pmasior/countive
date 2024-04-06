import { Icon } from "@prisma/client";
import { API_ICON_URL } from "src/common/constants/urls";
import { useFetchSWR } from "src/common/hooks/useFetchSWR";

export const useFetchIcons = () => {
  const fetchReturn = useFetchSWR<Icon[]>(API_ICON_URL);
  return { icons: fetchReturn.data || [], ...fetchReturn };
};
