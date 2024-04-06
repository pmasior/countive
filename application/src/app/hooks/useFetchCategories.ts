import { Category } from ".prisma/client";
import { API_CATEGORY_URL } from "src/common/constants/urls";
import { useFetchSWR } from "src/common/hooks/useFetchSWR";

export const useFetchCategories = () => {
  const fetchReturn = useFetchSWR<Category[]>(API_CATEGORY_URL);
  return { categories: fetchReturn.data || [], ...fetchReturn };
};
