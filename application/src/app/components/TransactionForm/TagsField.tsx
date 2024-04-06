import { Autocomplete, TextField } from "@mui/material";
import { isEmpty } from "lodash";
import React, { FC } from "react";
import { UseFormReturn } from "react-hook-form";
import { useFetchTags } from "src/app/hooks/useFetchTags";
import { FormFieldsNames } from "./TransactionForm";

type TagIdToName = Record<number, string>;

export const TagsField: FC<{
  form: UseFormReturn<FormFieldsNames>;
}> = ({ form }) => {
  const {
    register,
    getValues,
    setValue,
    formState: { errors },
  } = form;

  const { tags } = useFetchTags();
  const inputProps = register("tags");

  const options = tags.map((t) => t.id);

  const tagIdToName = tags.reduce(
    (tempOptions, tag) => ({ ...tempOptions, [tag.id]: tag.name }),
    {} as TagIdToName
  );

  return (
    <>
      {!isEmpty(tags) && !isEmpty(options) && !isEmpty(tagIdToName) && (
        <Autocomplete
          multiple
          id="tags"
          options={options}
          getOptionLabel={(option) => tagIdToName[option]}
          defaultValue={getValues("tags")}
          onChange={(e, v) => setValue("tags", v)}
          renderInput={(params) => (
            <TextField {...params} label="Tags" placeholder="Tags" />
          )}
        />
      )}
    </>
  );
};
