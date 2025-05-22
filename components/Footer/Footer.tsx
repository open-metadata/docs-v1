import classNames from "classnames";
import React from "react";
import styles from "./Footer.module.css";
import {
  footerIconItemsData,
  footerItemsData,
} from "../../constants/footer.constants";
import ParamLink from "../ParamLink";

export default function Footer() {
  return (
    <footer className={classNames(styles.Container, "footer")}>
      <hr className={styles.Separator} />
      <section className={styles.InnerContainer}>
        <nav className={styles.Navigation}>
          {footerItemsData.map((item) => (
            <ParamLink
              className={styles.Link}
              link={item.href}
              key={item.href}
              target={item.target}
            >
              {item.name}
            </ParamLink>
          ))}
        </nav>
        <section className={styles.SocialNetworks}>
          {footerIconItemsData.map((item) => (
            <ParamLink
              className={styles.Link}
              link={item.href}
              key={item.href}
              target="_blank"
              aria-label={item.href}
            >
              {item.icon}
            </ParamLink>
          ))}
        </section>
      </section>
    </footer>
  );
}
