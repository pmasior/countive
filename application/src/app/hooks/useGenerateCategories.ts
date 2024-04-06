import { Category } from "@prisma/client";
import { mapCategoriesToNested } from "../utils/entitiesMapper/mapCategories";
import { useFetchCategories } from "./useFetchCategories";
import { useFetchIcons } from "./useFetchIcons";

type Filter = {
  id?: number;
};

export const useGenerateCategories = (filter?: Filter) => {
  const { categories } = useFetchCategories();
  const { icons } = useFetchIcons();

  let filtered: Category[] = categories;

  if (categories && filter) {
    if (filter.id) {
      filtered = filtered.filter((t) => t.id === filter.id);
    }
  }

  return categories && icons
    ? mapCategoriesToNested({ categories: filtered, icons })
    : [];
};
