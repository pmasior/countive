import { useFetchSubcategories } from "./useFetchSubcategories";
import { useRouteParam } from "./useRouteParam";

export const useSubcategoryIdFromRouteParam = () => {
  const subcategoryInsensitiveName = useRouteParam("subcategory");
  const { subcategories } = useFetchSubcategories();

  if (subcategories && subcategoryInsensitiveName) {
    const subcategory = subcategories.find(
      (s) => s.name.toLowerCase() === subcategoryInsensitiveName
    );
    return subcategory?.id;
  }
};
