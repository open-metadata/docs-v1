import React from "react";

interface ScarfPixelProps {
  pixelId: string;
}

const ScarfPixel: React.FC<ScarfPixelProps> = ({ pixelId }) => {
  if (!pixelId) {
    return null;
  }

  return (
    <img
      referrerPolicy="no-referrer-when-downgrade"
      src={`https://static.scarf.sh/a.png?x-pxid=${pixelId}`}
      alt=""
      style={{ display: "none" }}
      width="1"
      height="1"
    />
  );
};

export default ScarfPixel;
