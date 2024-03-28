import Image from "next/image";
import {ImgHTMLAttributes} from "react";

const DEFAULT_IMAGE = "./images/connectors/default-service-icon.png";

export default function ConnectorImage(
  props: Readonly<ImgHTMLAttributes<HTMLImageElement>>
) {
  const replaceImgWithError = (e) => {
    e.target.onerror = null;
    e.target.src = DEFAULT_IMAGE;
  };

  return (
    <Image
      width={1000}
      height={1000}
      className={props.className}
      src={props.src}
      alt={props.alt}
      onError={replaceImgWithError}
    />
  );
}
