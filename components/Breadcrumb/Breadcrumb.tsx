import Link from "next/link";
import React, { ReactNode } from "react";
import styles from "./Breadcrumb.module.css";

interface Crumb {
  title: string;
  path: string;
  icon?: ReactNode;
}

export default function Breadcrumb({ slug }: { slug: string }) {
  const breadcrumb: Crumb[] = [
    {
      title: "Home",
      path: "/",
    },
  ];

  slug &&
    slug
      .slice(1)
      .split("/")
      .forEach((element) => {
        breadcrumb.push({
          title: element,
          path: `${slug.slice(0, slug.indexOf(element) + element.length)}`,
        });
      });

  return slug ? (
    <div className={styles.Container}>
      {breadcrumb.map((crumb, idx) => (
        <React.Fragment key={crumb.path}>
          <Link className="flex align-center" href={crumb.path}>
            <span className={styles.BreadcumbLink}>
              <span>{crumb.icon}</span>
              <span>
                {crumb.title
                  .split("-")
                  .map((i) => i.charAt(0).toUpperCase() + i.slice(1))
                  .join(" ")}
              </span>
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
