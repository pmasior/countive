import { Tag } from ".prisma/client";
import { useFetchTags } from "./useFetchTags";

export type TagFilter = {
  id?: number;
};

export const useGenerateTag = (filter?: TagFilter) => {
  const { tags } = useFetchTags();

  let filtered: Tag[] = tags;

  if (tags && filter) {
    if (filter.id) {
      filtered = filtered.filter((c) => c.id === filter.id);
    }
  }

  return tags ? filtered : [];
};
