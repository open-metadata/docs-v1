import classNames from "classnames";
import Link from "next/link";
import React from "react";
import styles from "./Footer.module.css";
import {
  footerIconItemsData,
  footerItemsData,
} from "../../constants/footer.constants";

export default function Footer() {
  return (
    <footer className={classNames(styles.Container, "footer")}>
      <hr className={styles.Separator} />
      <section className={styles.InnerContainer}>
        <nav className={styles.Navigation}>
          {footerItemsData.map((item) => (
            <Link
              className={styles.Link}
              href={item.href}
              key={item.href}
              target={item.target}
              rel={item.rel}
            >
              {item.name}
            </Link>
          ))}
        </nav>
        <section className={styles.SocialNetworks}>
          {footerIconItemsData.map((item) => (
            <Link
              href={item.href}
              key={item.href}
              target="_blank"
              aria-label={item.href}
            >
              {item.icon}
            </Link>
          ))}
        </section>
      </section>
    </footer>
  );
}
