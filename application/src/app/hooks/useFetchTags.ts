import { Tag } from ".prisma/client";
import { API_TAG_URL } from "src/common/constants/urls";
import { useFetchSWR } from "src/common/hooks/useFetchSWR";

export const useFetchTag = (id: number) => {
  const fetchReturn = useFetchSWR<Tag>(`${API_TAG_URL}/${id}`);
  return { tag: fetchReturn.data, ...fetchReturn };
};

export const useFetchTags = () => {
  const fetchReturn = useFetchSWR<Tag[]>(API_TAG_URL);
  return { tags: fetchReturn.data || [], ...fetchReturn };
};
