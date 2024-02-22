import classNames from "classnames";
import Link from "next/link";
import {
  footerIconItemsData,
  footerItemsData,
} from "../../constants/footer.constants";
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer
      className={classNames(styles.Container, "footer")}
      id="footer-container"
    >
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
            <Link href={item.href} key={item.href} target="_blank">
              {item.icon}
            </Link>
          ))}
        </section>
      </section>
    </footer>
  );
}
