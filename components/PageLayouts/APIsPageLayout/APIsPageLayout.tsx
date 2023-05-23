import React from "react";
import styles from "./APIsPageLayout.module.css";
import APIsPageSideNav from "./APIsPageSideNav/APIsPageSideNav";
import APIsPageContent from "./APIsPageContent/APIsPageContent";

function APIsPageLayout() {
  return (
    <div className={styles.APIsPageContainer}>
      <APIsPageSideNav />
      <APIsPageContent />
    </div>
  );
}

export default APIsPageLayout;
