import classNames from "classnames";
import {YouTubeProps} from "./Youtube.interface";
import styles from "./Youtube.module.css";

const YouTube = ({
  className = "",
  videoId,
  start = "",
  end = "",
  height,
  width,
}: YouTubeProps) => {
  return (
    <div className={classNames(styles.Container, className)}>
      <iframe
        loading="lazy"
        allowFullScreen
        src={`https://www.youtube-nocookie.com/embed/${videoId}?rel=0&start=${start}&end=${end}&rel=0`}
        className={styles.Iframe}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        style={{height, width}}
      ></iframe>
    </div>
  );
};

export default YouTube;
