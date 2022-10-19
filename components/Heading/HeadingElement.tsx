import React from "react";

interface Props {
  level: number;
  className: string;
  id: string;
  children: any;
}

export default function HeadingElement({
  level,
  className,
  id,
  children,
}: Props) {
  switch (level) {
    case 1:
      return (
        <h1 className={className} id={id}>
          {children}
        </h1>
      );
    case 2:
      return (
        <h2 className={className} id={id}>
          {children}
        </h2>
      );
    case 3:
      return (
        <h3 className={className} id={id}>
          {children}
        </h3>
      );
    case 4:
      return (
        <h4 className={className} id={id}>
          {children}
        </h4>
      );
    case 5:
      return (
        <h5 className={className} id={id}>
          {children}
        </h5>
      );
    case 6:
      return (
        <h6 className={className} id={id}>
          {children}
        </h6>
      );
    default:
      return (
        <h6 className={className} id={id}>
          {children}
        </h6>
      );
  }
}
