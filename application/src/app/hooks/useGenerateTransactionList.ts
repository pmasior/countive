import { Category, Icon, Subcategory, Transaction } from "@prisma/client";
import { useRouter } from "next/router";
import {
  API_CATEGORY_URL,
  API_ICON_URL,
  API_SUBCATEGORY_URL,
  API_TRANSACTION_URL,
} from "src/common/constants/urls";
import { useFetchSWR } from "src/common/hooks/useFetchSWR";
import { findCategoryByInsensitiveName } from "../utils/entityModifier";
import { findRecordById } from "../utils/findRecord";

// TODO: unfinished
export const useGenerateTransaction = () => {
  const router = useRouter();
  const categoryFromParams = router.query.category?.toString();
  const { data: categories } = useFetchSWR<Category[]>(API_CATEGORY_URL);
  const { data: subcategories } =
    useFetchSWR<Subcategory[]>(API_SUBCATEGORY_URL);
  const { data: transactions } =
    useFetchSWR<Transaction[]>(API_TRANSACTION_URL);
  const { data: icons } = useFetchSWR<Icon[]>(API_ICON_URL);

  const generate = () => {
    if (
      categories &&
      categoryFromParams &&
      subcategories &&
      transactions &&
      icons
    ) {
      const transactions2 = transactions.map((t) => {
        const subcategory = findRecordById(subcategories, t.subcategoryId);
        const subcategoryIcon = subcategory?.iconId
          ? findRecordById(icons, subcategory?.iconId)
          : null;

        // const currency = findRecordById(currencies, t.currencyId);

        // const settlementAccount = findRecordById(
        //   settlementAccounts,
        //   t.settlementAccountId
        // );

        // const methodOfPayment = findRecordById(
        //   methodOfPayments,
        //   t.methodOfPaymentId
        // );

        return {
          ...t,
          // currency: {
          //   ...currency
          // },
          subcategory: {
            ...subcategory,
            icon: {
              ...subcategoryIcon,
            },
          },
          // settlementAccount: {
          //   ...settlementAccount,
          // },
          // tags: [],  // TODO:
          // methodOfPayment: {
          //   ...methodOfPayment,
          // },
        };
      });

      const category = findCategoryByInsensitiveName(
        categories,
        categoryFromParams
      );

      const transactionsFilteredByCategory = transactions2.filter(
        (t) => t.subcategory.categoryId === category?.id
      );

      return transactionsFilteredByCategory;
    }
    return [];
  };

  return generate();
};
