import { Tab, Tabs } from "@mui/material";
import { useRouter } from "next/router";
import React, { FC } from "react";
import { useFetchCategories } from "src/app/hooks/useFetchCategories";
import { useRouteParam } from "src/app/hooks/useRouteParam";
import { APP_URL } from "src/common/constants/urls";

export const NavigationTabs: FC<{}> = () => {
  const router = useRouter();
  const categoryInsensitiveName = useRouteParam("category");
  const { categories } = useFetchCategories();

  return (
    <Tabs
      value={categoryInsensitiveName}
      indicatorColor="secondary"
      textColor="inherit"
    >
      {categories?.map((c) => (
        <Tab
          key={`NavigationTabs_${c.name.toLowerCase()}`}
          label={c.name}
          value={c.name.toLowerCase()}
          onClick={() => router.push(`${APP_URL}/${c.name.toLowerCase()}`)}
        ></Tab>
      ))}
    </Tabs>
  );
};
