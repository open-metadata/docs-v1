import { ConnectorsListContainerProps } from "./ConnectorsListContainer.interface";
import styles from "./ConnectorsListContainer.module.css";

function ConnectorsListContainer({
  children,
}: Readonly<ConnectorsListContainerProps>) {
  return <div className={styles.Container}>{children}</div>;
}

export default ConnectorsListContainer;
