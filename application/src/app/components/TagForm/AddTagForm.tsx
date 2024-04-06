import React, { FC } from "react";
import { API_TAG_URL } from "src/common/constants/urls";
import { useMutate } from "src/common/hooks/useMutate";
import TagForm from "./TagForm";

export const AddTagForm: FC<{}> = () => {
  const { mutate, loading } = useMutate(API_TAG_URL, "POST");

  return <TagForm mutate={mutate} />;
};

export default AddTagForm;
