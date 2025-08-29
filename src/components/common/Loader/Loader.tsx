import { ReactComponent as LoaderIcon } from "../../../images/icons/loader.svg";
import styles from "./Loader.module.css";

interface LoaderProps {
  size?: number;
}

function Loader({ size = 16 }: Readonly<LoaderProps>) {
  return (
    <LoaderIcon className={styles.LoadingIcon} width={size} height={size} />
  );
}

export default Loader;
