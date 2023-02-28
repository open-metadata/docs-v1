import Banner from "../components/common/Banner/Banner";
import { Callout } from "../components/Callout";
import Divider from "../components/common/Divider/Divider";
import InlineCallout from "../components/common/InlineCallout/InlineCallout";
import InlineCalloutContainer from "../components/common/InlineCallout/InlineCalloutContainer";
import Note from "../components/common/Note/Note";
import YouTube from "../components/common/Youtube/Youtube";
import CodeBlock from "../components/CodePreview/CodeBlock/CodeBlock";
import CodeInfo from "../components/CodePreview/CodeInfo/CodeInfo";
import CodeInfoContainer from "../components/CodePreview/CodeInfoContainer/CodeInfoContainer";
import CodePreview from "../components/CodePreview/CodePreview";
import Code from "../components/common/Code/Code";
import { Heading } from "../components/Heading/Heading";
import Image from "../components/common/Image/Image";
import StepsContainer from "../components/Steps/StepsContainer/StepsContainer";
import Step from "../components/Steps/Step/Step";
import StepDescription from "../components/Steps/Step/StepDescription/StepDescription";
import StepVisualInfo from "../components/Steps/Step/StepVisualInfo/StepVisualInfo";
import ExtraContent from "../components/ExtraContent/ExtraContent";
import Tile from "../components/common/Tiles/Tile/Tile";
import CustomAnchorNode from "../components/common/CustomAnchorNode/CustomAnchorNode";
import TilesContainer from "../components/common/Tiles/TilesContainer/TilesContainer";
import InlineCode from "../components/common/Code/InlineCode";

import * as allTags from "../markdoc/tags";
import * as allNodes from "../markdoc/nodes";
import * as allFunctions from "../markdoc/functions";
import { Config, ConfigFunction, NodeType, Schema } from "@markdoc/markdoc";

const tags = allTags as unknown as Record<string, Schema>;
const nodes = allNodes as unknown as Partial<Record<NodeType, Schema>>;
const functions = allFunctions as unknown as Record<string, ConfigFunction>;

export const components = {
  Banner,
  Callout,
  Divider,
  InlineCallout,
  InlineCalloutContainer,
  Note,
  YouTube,
  CodeBlock,
  CodeInfo,
  CodeInfoContainer,
  CodePreview,
  Code,
  Heading,
  Image,
  Step,
  StepsContainer,
  StepDescription,
  StepVisualInfo,
  ExtraContent,
  Tile,
  TilesContainer,
  InlineCode,
  CustomAnchorNode,
};

export const configs: Config = {
  tags,
  nodes,
  functions,
};
