import { startCase } from "lodash";
import { FaCode } from "react-icons/fa";
import { SiGnubash } from "react-icons/si";
import { VscJson } from "react-icons/vsc";
import { ReactComponent as GoIcon } from "../images/icons/go-lang.svg";
import { ReactComponent as JavaIcon } from "../images/icons/java-lang.svg";
import { ReactComponent as PythonIcon } from "../images/icons/python-lang.svg";
import { ReactComponent as RubyIcon } from "../images/icons/ruby-lang.svg";
import { ReactComponent as YamlIcon } from "../images/icons/yaml-lang.svg";

export const getLanguageIcon = (language: string) => {
  switch (language) {
    case "bash":
      return <SiGnubash size={24} />;
    case "go":
      return <GoIcon />;
    case "java":
      return <JavaIcon />;
    case "python":
      return <PythonIcon />;
    case "ruby":
      return <RubyIcon />;
    case "implict":
      return <YamlIcon />;
    case "authcode":
      return <YamlIcon />;
    case "json":
      return <VscJson size={24} />;
    default:
      return <FaCode size={24} />;
  }
};

export const getLanguageName = (language: string) => {
  if (language === "json") {
    return "JSON";
  } else {
    return startCase(language);
  }
};
