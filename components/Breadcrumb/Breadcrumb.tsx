import { startCase } from "lodash";
import Link from "next/link";
import React, { ReactNode } from "react";
import { useDocVersionContext } from "../../context/DocVersionContext";
import styles from "./Breadcrumb.module.css";

interface Crumb {
  title: string;
  path: string;
  icon?: ReactNode;
}

export default function Breadcrumb({ slug }: { slug: string[] }) {
  const { docVersion } = useDocVersionContext();
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
        path: slug.slice(0, idx + 1).join("/"),
      });
    });

  return slug ? (
    <div className={styles.Container}>
      {breadcrumb.map((crumb, idx) => {
        const hrefString =
          crumb.path !== "/"
            ? `/${docVersion}/${crumb.path}`
            : `/${docVersion}`;
        return (
          <React.Fragment key={crumb.path}>
            <Link className="flex align-center" href={hrefString}>
              <span className={styles.BreadcumbLink}>
                <span>{crumb.icon}</span>
                <span>{startCase(crumb.title.replace("-", " "))}</span>
              </span>
            </Link>
            {idx < breadcrumb.length - 1 && (
              <span className={styles.Divider}>/</span>
            )}
          </React.Fragment>
        );
      })}
    </div>
  ) : null;
}
