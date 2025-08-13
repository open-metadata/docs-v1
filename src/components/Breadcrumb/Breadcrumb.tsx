import classNames from "classnames";
import { startCase } from "lodash";
import React, { ReactNode } from "react";
import { useDocVersionContext } from "../../context/DocVersionContext";
import styles from "./Breadcrumb.module.css";
import ParamLink from "../ParamLink";
import { getUrl } from "../../utils/CommonUtils";
import { useRouter } from "next/router";

interface Crumb {
  title: string;
  path: string;
  icon?: ReactNode;
}

export default function Breadcrumb({ slug }: { slug: string[] }) {
  const router = useRouter();
  const { enableVersion } = useDocVersionContext();
  const breadcrumb: Crumb[] = [
    {
      title: "Home",
      path: "/",
    },
  ];

  slug &&
    slug.forEach((element, idx) => {
      breadcrumb.push({
        title: element,
        path: `/${slug.slice(0, idx + 1).join("/")}`,
      });
    });

  return slug ? (
    <div className={styles.Container}>
      {breadcrumb.map((crumb, idx) => {
        const hrefString = getUrl({
          url: crumb.path,
          docVersion: router.query.version as string ?? "latest",
          enableVersion,
        });
        return (
          <React.Fragment key={crumb.path}>
            <ParamLink
              className={classNames(styles.LinkItem, "flex align-center")}
              href={hrefString}
            >
              <span className={styles.BreadcumbLink}>
                <span>{crumb.icon}</span>
                <span>{startCase(crumb.title.replace("-", " "))}</span>
              </span>
            </ParamLink>
            {idx < breadcrumb.length - 1 && (
              <span className={styles.Divider}>/</span>
            )}
          </React.Fragment>
        );
      })}
    </div>
  ) : null;
}
