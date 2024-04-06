import { Category, Icon } from "@prisma/client";
import { findRecordById } from "../findRecord";

export const mapCategoriesToNested = (relatedEntities: {
  categories: Category[];
  icons: Icon[];
}) => {
  const { categories, icons } = relatedEntities;

  return categories.map((c) => ({
    ...c,
    icon: findRecordById(icons, c.iconId),
  }));
};
