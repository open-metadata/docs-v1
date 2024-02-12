import { ImgHTMLAttributes } from "react";

const DEFAULT_IMAGE = "./images/connectors/default-service-icon.png";

export default function ConnectorImage(
  props: Readonly<ImgHTMLAttributes<HTMLImageElement>>
) {
  const replaceImgWithError = (e) => {
    e.target.onerror = null;
    e.target.src = DEFAULT_IMAGE;
  };

  return <img onError={replaceImgWithError} {...props} />;
}
