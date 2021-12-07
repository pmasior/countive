import { TextField } from "@mui/material";
import { useRouter } from "next/router";
import { SubmitHandler, useForm } from "react-hook-form";
import FormFields from "src/auth/components/Form/FormFields";
import styles from "./SearchField.module.css";

type FormFields = { condensedTransaction: string };

export const SearchField = () => {
  const router = useRouter();
  const { register, handleSubmit } = useForm<FormFields>();

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    router.push(
      `${router.asPath}/addCondensedTransaction/${encodeURI(
        data.condensedTransaction
      )}`
    );
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <TextField
        inputProps={register("condensedTransaction")}
        InputProps={{ className: styles.searchField }}
      />
    </form>
  );
};
