import { StoryLaneProps } from "./StoryLane.interface";
import styles from "./StoryLane.module.css";

const StoryLane = ({ demoId, width = "80%", caption }: StoryLaneProps) => {
  // Construct the Storylane embed URL
  const storyLaneUrl = `https://app.storylane.io/demo/${demoId}`;

  // Fixed 16:9 aspect ratio
  const iframeStyle: React.CSSProperties = {
    width,
    aspectRatio: "16/9",
  };

  return (
    <div className={styles.Container}>
      <iframe
        src={storyLaneUrl}
        className={styles.Iframe}
        loading="lazy"
        allowFullScreen
        style={iframeStyle}
      />
      {caption && <p className={styles.Caption}>{caption}</p>}
    </div>
  );
};

export default StoryLane;
