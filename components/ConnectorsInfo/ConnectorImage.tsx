const DEFAULT_IMAGE = "./images/connectors/default-service-icon.png";

interface ConnectorImageProps {
  src: string;
  alt: string;
  className?: string;
}

export default function ConnectorImage({
  src,
  alt,
  className = "",
}: Readonly<ConnectorImageProps>) {
  const replaceImgWithError = (e) => {
    e.target.onerror = null;
    e.target.src = DEFAULT_IMAGE;
  };

  return (
    <img
      className={className}
      onError={replaceImgWithError}
      alt={alt}
      src={src}
    />
  );
}
