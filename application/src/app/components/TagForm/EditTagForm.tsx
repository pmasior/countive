import React, { FC } from "react";
import { useGenerateTag } from "src/app/hooks/useGenerateTag";
import { useRouteParam } from "src/app/hooks/useRouteParam";
import { API_TAG_URL } from "src/common/constants/urls";
import { useMutate } from "src/common/hooks/useMutate";
import TagForm from "./TagForm";

export const EditTagForm: FC<{}> = () => {
  const tagId = useRouteParam<number>("editTag", "number");

  const tag = useGenerateTag({ id: tagId })[0];
  const { mutate, loading } = useMutate(`${API_TAG_URL}/${tagId}`, "PUT");

  return (
    <>
      {tag && (
        <TagForm
          defaultValues={{
            ...tag,
          }}
          mutate={mutate}
        />
      )}
    </>
  );
};

export default EditTagForm;
