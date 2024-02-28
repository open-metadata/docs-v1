import { ReactComponent as CheckIcon } from "../../../images/icons/check.svg";
import { ReactComponent as CrossIcon } from "../../../images/icons/cross.svg";

function Icon({ iconName }: { iconName: string }) {
  let IconComponent: SvgComponent;
  let iconColor = "currentColor";

  switch (iconName) {
    case "check":
      IconComponent = CheckIcon;
      break;
    case "cross":
      IconComponent = CrossIcon;
      iconColor = "#CB2431";
      break;
    default:
      return <></>;
  }

  return <IconComponent height={16} color={iconColor} />;
}

export default Icon;
