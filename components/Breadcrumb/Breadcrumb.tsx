import Link from "next/link";
import React, { ReactNode } from "react";
import styles from "./Breadcrumb.module.css";
import { ReactComponent as HomeIcon } from "../../images/icons/home.svg";

interface Crumb {
  title: string;
  path: string;
  icon?: ReactNode;
}

export default function Breadcrumb({ slug }: { slug: string }) {
  const breadcrumb: Crumb[] = [
    {
      title: "",
      path: "/docs/",
      icon: <HomeIcon className={styles.HomeIcon} />,
    },
  ];

  slug &&
    slug
      .slice(1)
      .split("/")
      .forEach((element) => {
        breadcrumb.push({
          title: element,
          path: `/docs${slug.slice(0, slug.indexOf(element) + element.length)}`,
        });
      });

  return slug ? (
    <div className={styles.Container}>
      {breadcrumb.map((crumb, idx) => (
        <>
          <Link className="flex align-center" href={crumb.path}>
            <span className={styles.BreadcumbLink}>
              <span>{crumb.icon}</span>
              <span>{crumb.title}</span>
            </span>
          </Link>
          {idx < breadcrumb.length - 1 && (
            <span className={styles.Divider}>/</span>
          )}
        </>
      ))}
    </div>
  ) : null;
}
