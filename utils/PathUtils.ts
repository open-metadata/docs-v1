import { isEqual } from "lodash";
import { NextRouter } from "next/router";
import { HOW_TO_GUIDES_PATH } from "../constants/Paths.constants";
import { REGEX_VERSION_MATCH_WITH_SLASH_AT_START } from "../constants/version.constants";

export const checkIsHowToGuidesPaths = (router: NextRouter) => {
  const pathWithoutVersion = router.asPath.replace(
    REGEX_VERSION_MATCH_WITH_SLASH_AT_START,
    ""
  );

  return isEqual(pathWithoutVersion, HOW_TO_GUIDES_PATH);
};
