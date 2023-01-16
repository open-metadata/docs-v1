import { startCase } from "lodash";
import Link from "next/link";
import React, { ReactNode } from "react";
import styles from "./Breadcrumb.module.css";

interface Crumb {
  title: string;
  path: string;
  icon?: ReactNode;
}

export default function Breadcrumb({ slug }: { slug: string[] }) {
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
      {breadcrumb.map((crumb, idx) => (
        <React.Fragment key={crumb.path}>
          <Link className="flex align-center" href={crumb.path} legacyBehavior>
            <span className={styles.BreadcumbLink}>
              <span>{crumb.icon}</span>
              <span>{startCase(crumb.title.replace("-", " "))}</span>
            </span>
          </Link>
          {idx < breadcrumb.length - 1 && (
            <span className={styles.Divider}>/</span>
          )}
        </React.Fragment>
      ))}
    </div>
  ) : null;
}
