import { NavigatorUserAgent } from "../enums/Search.enum";

export class NavigatorHelper {
  static isMacOs() {
    return navigator.userAgent.indexOf(NavigatorUserAgent.MAC) !== -1;
  }

  static isWindows() {
    return navigator.userAgent.indexOf(NavigatorUserAgent.WINDOWS) !== -1;
  }

  static isLinuxOs() {
    return navigator.userAgent.indexOf(NavigatorUserAgent.LINUX) !== -1;
  }

  static isAndroidOs() {
    return navigator.userAgent.indexOf(NavigatorUserAgent.ANDROID) !== -1;
  }

  static isIos() {
    return navigator.userAgent.indexOf(NavigatorUserAgent.IOS) !== -1;
  }
}

export const isCommandKeyPress = (event: KeyboardEvent): boolean => {
  if (NavigatorHelper.isMacOs()) {
    return event.metaKey;
  } else if (!NavigatorHelper.isMacOs()) {
    return event.ctrlKey;
  }

  return false;
};
