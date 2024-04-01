import {YouTubeProps} from "./Youtube.interface";
import styles from "./Youtube.module.css";
import Head from "next/head";
import LiteYouTubeEmbed from "react-lite-youtube-embed";
import "react-lite-youtube-embed/dist/LiteYouTubeEmbed.css";

const YouTube = ({videoId}: YouTubeProps) => {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <LiteYouTubeEmbed
        webp={true}
        // thumbnail="/blogs/openmetadata-1.3.0-release.webp"
        id={videoId}
        title="YouTube Video Player"
      />
    </>
  );
};

export default YouTube;
