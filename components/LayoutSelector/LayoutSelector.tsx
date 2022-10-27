import React, { ReactNode } from "react";
import PageLayout1 from "../Layout/PageLayout1/PageLayout1";
import PageLayout2 from "../Layout/PageLayout2/PageLayout2";

interface Props {
  collapsedNav: boolean;
  children: ReactNode;
}

export default function LayoutSelector({ collapsedNav, children }: Props) {
  return collapsedNav ? (
    <PageLayout2>{children}</PageLayout2>
  ) : (
    <PageLayout1>{children}</PageLayout1>
  );
}
