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
        <h1 className={className} data-pagefind-weight="10" {...otherProps}>
          {children}
        </h1>
      );

    case 2:
      return (
        <h2 className={className} data-pagefind-weight="3.5" {...otherProps}>
          {children}
        </h2>
      );

    case 3:
      return (
        <h3 className={className} data-pagefind-weight="3" {...otherProps}>
          {children}
        </h3>
      );

    case 4:
      return (
        <h4 className={className} data-pagefind-weight="2.5" {...otherProps}>
          {children}
        </h4>
      );

    case 5:
      return (
        <h5 className={className} data-pagefind-weight="2" {...otherProps}>
          {children}
        </h5>
      );

    default:
      return (
        <h6 className={className} data-pagefind-weight="1.5" {...otherProps}>
          {children}
        </h6>
      );
      
  }
}
