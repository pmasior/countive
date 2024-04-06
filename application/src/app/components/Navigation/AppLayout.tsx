import React, { FC, ReactNode, useState } from "react";
import styles from "./AppNavigation.module.css";
import AppNavigationBar from "./AppNavigationBar";
import AppNavigationDrawer from "./AppNavigationDrawer";

const AppLayout: FC<{ children: ReactNode }> = ({ children }) => {
  const [openDrawerOnMobile, setOpenDrawerOnMobile] = useState<boolean>(false);

  const handleDrawerToggleOnClick = () => {
    setOpenDrawerOnMobile(!openDrawerOnMobile);
  };

  return (
    <div className={styles.appLayout}>
      <div className={styles.header}>
        <AppNavigationBar
          handleDrawerToggleOnClick={handleDrawerToggleOnClick}
        />
        <AppNavigationDrawer
          openDrawerOnMobile={openDrawerOnMobile}
          handleDrawerToggleOnClick={handleDrawerToggleOnClick}
        />
      </div>
      <main className={styles.main}>{children}</main>
    </div>
  );
};

export default AppLayout;
