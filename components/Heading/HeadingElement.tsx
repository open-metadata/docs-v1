interface Props {
  level: number;
  className?: string;
  children: any;
}

export default function HeadingElement({
  level,
  className = "",
  children,
  ...otherProps
}: Readonly<Props>) {
  switch (level) {
    case 1:
      return (
        <h1 className={className} {...otherProps}>
          {children}
        </h1>
      );
    case 2:
      return (
        <h2 className={className} {...otherProps}>
          {children}
        </h2>
      );
    case 3:
      return (
        <h3 className={className} {...otherProps}>
          {children}
        </h3>
      );
    case 4:
      return (
        <h4 className={className} {...otherProps}>
          {children}
        </h4>
      );
    case 5:
      return (
        <h5 className={className} {...otherProps}>
          {children}
        </h5>
      );
    case 6:
      return (
        <h6 className={className} {...otherProps}>
          {children}
        </h6>
      );
    default:
      return (
        <h6 className={className} {...otherProps}>
          {children}
        </h6>
      );
  }
}
