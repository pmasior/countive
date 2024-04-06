import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import Icon from "@mui/material/Icon";
import Typography from "@mui/material/Typography";
import { useRouter } from "next/router";
import React, { FC } from "react";
import { APP_CATEGORY_URL } from "src/common/constants/urls";
import { changePathname } from "src/common/utils/url";

export type SubcategorySummary = {
  id: number;
  name: string;
  amount: string;
  remainAmount: string;
  currency: string;
  icon: string;
  color?: string;
};

const SubcategoryCard: FC<SubcategorySummary> = ({
  id,
  name,
  amount,
  remainAmount,
  currency,
  icon,
  color = "initial",
}) => {
  const router = useRouter();

  const borderColor = "rgba(0, 0, 0, 0.12)";

  const redirectToAddTransaction = () =>
    changePathname(router, APP_CATEGORY_URL, {
      addTransaction: true,
      addTransactionSubcategoryId: id,
    });

  const redirectToSubcategory = () =>
    changePathname(router, APP_CATEGORY_URL, {
      subcategory: name.toLowerCase(),
    });

  return (
    <ButtonGroup orientation="vertical" fullWidth={true}>
      <Button
        sx={{ borderColor: borderColor }}
        onClick={redirectToAddTransaction}
      >
        <Icon style={{ color: color, fontSize: 96 }}>{icon}</Icon>
      </Button>
      <Button sx={{ borderColor: borderColor }} onClick={redirectToSubcategory}>
        <Box>
          <Typography component="div" variant="body2" color={color}>
            {name}
          </Typography>
          {remainAmount && (
            <Typography component="div" variant="body2" color="text.primary">
              <strong>
                {remainAmount} {currency}
              </strong>
            </Typography>
          )}
          <Typography component="div" variant="body2" color="text.primary">
            {amount} {currency}
          </Typography>
        </Box>
      </Button>
    </ButtonGroup>
  );
};

export default SubcategoryCard;
