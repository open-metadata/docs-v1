import Image from "next/image";
import {ImgHTMLAttributes} from "react";

const DEFAULT_IMAGE = "./images/connectors/default-service-icon.webp";

export default function ConnectorImage(
  props: Readonly<ImgHTMLAttributes<HTMLImageElement>>
) {
  const replaceImgWithError = (e) => {
    e.target.onerror = null;
    e.target.src = DEFAULT_IMAGE;
  };

  return (
    <Image
      width={42}
      height={42}
      className={props.className ?? "w-42 h-42"}
      src={props.src}
      alt={props.alt}
      onError={replaceImgWithError}
    />
  );
}
