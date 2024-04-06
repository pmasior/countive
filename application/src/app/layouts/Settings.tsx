import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, { FC } from "react";
import { isQueryExist } from "src/common/utils/url";
import AddCategoryBudgetForm from "../components/CategoryBudgetForm/AddCategoryBudgetForm";
import EditCategoryBudgetForm from "../components/CategoryBudgetForm/EditCategoryBudgetForm";
import RemoveCategoryBudgetForm from "../components/CategoryBudgetForm/RemoveCategoryBudgetForm";
import AddCategoryForm from "../components/CategoryForm/AddCategoryForm";
import EditCategoryForm from "../components/CategoryForm/EditCategoryForm";
import RemoveCategoryForm from "../components/CategoryForm/RemoveCategoryForm";
import EditDefaultTransactionValuesForm from "../components/DefaultTransactionValuesForm/EditDefaultTransactionValuesForm";
import AddMethodOfPaymentForm from "../components/MethodOfPaymentForm/AddMethodOfPaymentForm";
import EditMethodOfPaymentForm from "../components/MethodOfPaymentForm/EditMethodOfPaymentForm";
import RemoveMethodOfPaymentForm from "../components/MethodOfPaymentForm/RemoveMethodOfPaymentForm";
import AppLayout from "../components/Navigation/AppLayout";
import SettingsDashboard from "../components/SettingsDashboard/Settings";
import AddSettlementAccountForm from "../components/SettlementAccountForm/AddSettlementAccountForm";
import EditSettlementAccountForm from "../components/SettlementAccountForm/EditSettlementAccountForm";
import RemoveSettlementAccountForm from "../components/SettlementAccountForm/RemoveSettlementAccountForm";
import AddSubcategoryBudgetForm from "../components/SubcategoryBudgetForm/AddSubcategoryBudgetForm";
import EditSubcategoryBudgetForm from "../components/SubcategoryBudgetForm/EditSubcategoryBudgetForm";
import RemoveSubcategoryBudgetForm from "../components/SubcategoryBudgetForm/RemoveSubcategoryBudgetForm";
import AddSubcategoryForm from "../components/SubcategoryForm/AddSubcategoryForm";
import EditSubcategoryForm from "../components/SubcategoryForm/EditSubcategoryForm";
import RemoveSubcategoryForm from "../components/SubcategoryForm/RemoveSubcategoryForm";
import AddTagForm from "../components/TagForm/AddTagForm";
import EditTagForm from "../components/TagForm/EditTagForm";
import RemoveTagForm from "../components/TagForm/RemoveTagForm";

const Settings: FC<{}> = () => {
  useSession({ required: true });
  const router = useRouter();

  return (
    <AppLayout>
      <SettingsDashboard />
      {isQueryExist(router.query?.editDefaultTransactionValues) && (
        <EditDefaultTransactionValuesForm />
      )}
      {isQueryExist(router.query?.addCategory) && <AddCategoryForm />}
      {isQueryExist(router.query?.editCategory) && <EditCategoryForm />}
      {isQueryExist(router.query?.removeCategory) && <RemoveCategoryForm />}
      {isQueryExist(router.query?.addSubcategory) && <AddSubcategoryForm />}
      {isQueryExist(router.query?.editSubcategory) && <EditSubcategoryForm />}
      {isQueryExist(router.query?.removeSubcategory) && (
        <RemoveSubcategoryForm />
      )}
      {isQueryExist(router.query?.addCategoryBudget) && (
        <AddCategoryBudgetForm />
      )}
      {isQueryExist(router.query?.editCategoryBudget) && (
        <EditCategoryBudgetForm />
      )}
      {isQueryExist(router.query?.removeCategoryBudget) && (
        <RemoveCategoryBudgetForm />
      )}
      {isQueryExist(router.query?.addSubcategoryBudget) && (
        <AddSubcategoryBudgetForm />
      )}
      {isQueryExist(router.query?.editSubcategoryBudget) && (
        <EditSubcategoryBudgetForm />
      )}
      {isQueryExist(router.query?.removeSubcategoryBudget) && (
        <RemoveSubcategoryBudgetForm />
      )}
      {isQueryExist(router.query?.addTag) && <AddTagForm />}
      {isQueryExist(router.query?.editTag) && <EditTagForm />}
      {isQueryExist(router.query?.removeTag) && <RemoveTagForm />}
      {isQueryExist(router.query?.addSettlementAccount) && (
        <AddSettlementAccountForm />
      )}
      {isQueryExist(router.query?.editSettlementAccount) && (
        <EditSettlementAccountForm />
      )}
      {isQueryExist(router.query?.removeSettlementAccount) && (
        <RemoveSettlementAccountForm />
      )}
      {isQueryExist(router.query?.addMethodOfPayment) && (
        <AddMethodOfPaymentForm />
      )}
      {isQueryExist(router.query?.editMethodOfPayment) && (
        <EditMethodOfPaymentForm />
      )}
      {isQueryExist(router.query?.removeMethodOfPayment) && (
        <RemoveMethodOfPaymentForm />
      )}
    </AppLayout>
  );
};

export default Settings;
