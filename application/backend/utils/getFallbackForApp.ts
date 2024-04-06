import { getEntityForUserInSSR } from "backend/auth/getEntityForUserInSSR";
import { getCategories } from "backend/repository/category";
import { getIcon } from "backend/repository/icon";
import { getSubcategoryForCategory } from "backend/repository/subcategory";
import { getTransactions } from "backend/repository/transaction";
import { GetServerSidePropsContext } from "next";
import { ParsedUrlQuery } from "querystring";
import {
  API_CATEGORY_URL,
  API_FIND_SUBCATEGORY_BY_CATEGORY_URL,
  API_ICON_URL,
  API_TRANSACTION_URL,
} from "src/common/constants/urls";

export const getFallbackForApp = async <T extends ParsedUrlQuery>(
  context: GetServerSidePropsContext<T>
) => {
  const categories = await getEntityForUserInSSR(context, getCategories);
  const categoryFromParams = context.params?.category;
  const subcategories = await getEntityForUserInSSR(
    context,
    getSubcategoryForCategory,
    categoryFromParams
  );
  const transactions = await getEntityForUserInSSR(context, getTransactions);
  console.log(transactions);
  const icons = await getIcon();

  return {
    [API_CATEGORY_URL]: categories,
    [API_ICON_URL]: icons,
    [`${API_FIND_SUBCATEGORY_BY_CATEGORY_URL}${categoryFromParams}`]:
      subcategories,
    // [API_TRANSACTION_URL]: transactions,  // TODO: fix `object` ("[object Decimal]") cannot be serialized as JSON
    [API_TRANSACTION_URL]: [],
  };
};
