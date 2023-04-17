import React from "react";
import { ReactComponent as CheckIcon } from "../../../images/icons/check.svg";
import { ReactComponent as CrossIcon } from "../../../images/icons/cross.svg";

function Icon({ iconName }: { iconName: string }) {
  let IconComponent: SvgComponent;

  switch (iconName) {
    case "check":
      IconComponent = CheckIcon;
      break;
    case "cross":
      IconComponent = CrossIcon;
      break;
    default:
      return <></>;
  }

  return <IconComponent />;
}

export default Icon;
