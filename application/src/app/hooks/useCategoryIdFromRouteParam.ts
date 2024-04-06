import { useFetchCategories } from "./useFetchCategories";
import { useRouteParam } from "./useRouteParam";

export const useCategoryIdFromRouteParam = () => {
  const categoryInsensitiveName = useRouteParam("category");
  const { categories } = useFetchCategories();

  if (categories && categoryInsensitiveName) {
    const category = categories.find(
      (c) => c.name.toLowerCase() === categoryInsensitiveName
    );
    return category?.id;
  }
};
