import classNames from "classnames";
import Image, { ImageProps } from "next/image";
import { useEffect, useMemo, useState } from "react";

const DEFAULT_IMAGE = "/images/connectors/default-service-icon.webp";
interface ConnectorImageProps extends ImageProps {
  width?: number;
  height?: number;
}
export default function ConnectorImage(props: Readonly<ConnectorImageProps>) {
  // Storing the source of the image in a state to prevent the error event from infinite loop
  const [src, setSrc] = useState(props.src);

  const replaceImgWithError = (e) => {
    e.target.onerror = null;
    setSrc(DEFAULT_IMAGE);
  };

  const { className, src: source, ...rest } = useMemo(() => props, [props]);

  useEffect(() => {
    setSrc(source);
  }, [source]);

  return (
    <Image
      width={32}
      height={32}
      className={classNames("w-8 h-8 object-contain", className)}
      onError={replaceImgWithError}
      src={src}
      {...rest}
    />
  );
}
