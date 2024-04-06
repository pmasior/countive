import { isEmpty } from "lodash";
import React, { FC } from "react";
import { UseFormReturn } from "react-hook-form";
import { useFetchIcons } from "src/app/hooks/useFetchIcons";
import CustomSelectInput from "../Form/CustomSelectInput";
import SelectOptionWithIcon from "../Form/SelectOptionWithIcon";
import { FormFieldsNames } from "./MethodOfPaymentForm";

export const IconField: FC<{ form: UseFormReturn<FormFieldsNames> }> = ({
  form,
}) => {
  const {
    register,
    getValues,
    formState: { errors },
  } = form;

  const { icons } = useFetchIcons();

  const name = "iconId";

  return (
    <>
      {!isEmpty(icons) && (
        <CustomSelectInput
          defaultValue={getValues(name)}
          errorText={errors.iconId?.message}
          inputProps={register(name, {
            required: "Icon is required",
          })}
          label="Icon"
          options={icons.map((s) => ({
            value: s.id,
            label: <SelectOptionWithIcon iconName={s.name} label={s.name} />,
          }))}
        />
      )}
    </>
  );
};
