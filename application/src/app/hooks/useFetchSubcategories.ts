import { Subcategory } from "@prisma/client";
import { API_SUBCATEGORY_URL } from "src/common/constants/urls";
import { useFetchSWR } from "src/common/hooks/useFetchSWR";

export const useFetchSubcategories = () => {
  const fetchReturn = useFetchSWR<Subcategory[]>(API_SUBCATEGORY_URL);
  return { subcategories: fetchReturn.data || [], ...fetchReturn };
};
