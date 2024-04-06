import { Category, Icon, Subcategory } from "@prisma/client";
import { findRecordById } from "../findRecord";

export const mapSubcategoriesToNested = (relatedEntities: {
  subcategories: Subcategory[];
  icons: Icon[];
  categories: Category[];
}) => {
  const { subcategories, icons, categories } = relatedEntities;

  return subcategories.map((s) => ({
    ...s,
    icon: findRecordById(icons, s.iconId),
    category: findRecordById(categories, s.categoryId),
  }));
};
