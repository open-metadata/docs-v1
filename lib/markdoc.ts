import { Config, ConfigFunction, NodeType, Schema } from "@markdoc/markdoc";
import APIDescription from "../components/APIInfoContainer/APIDescription/APIDescription";
import APIInfoContainer from "../components/APIInfoContainer/APIInfoContainer";
import APIVisualInfo from "../components/APIInfoContainer/APIVisualInfo/APIVisualInfo";
import APIPageContainer from "../components/APIPageContainer/APIPageContainer";
import CodeBlock from "../components/CodePreview/CodeBlock/CodeBlock";
import CodeInfo from "../components/CodePreview/CodeInfo/CodeInfo";
import CodeInfoContainer from "../components/CodePreview/CodeInfoContainer/CodeInfoContainer";
import CodePreview from "../components/CodePreview/CodePreview";
import CodeWithLanguageSelector from "../components/CodeWithLanguageSelector/CodeWithLanguageSelector";
import Code from "../components/common/Code/Code";
import InlineCode from "../components/common/Code/InlineCode";
import CustomAnchorNode from "../components/common/CustomAnchorNode/CustomAnchorNode";
import Divider from "../components/common/Divider/Divider";
import Icon from "../components/common/Icon/Icon";
import Image from "../components/common/Image/Image";
import InlineCallout from "../components/common/InlineCallout/InlineCallout";
import InlineCalloutContainer from "../components/common/InlineCallout/InlineCalloutContainer";
import Note from "../components/common/Note/Note";
import Paragraph from "../components/common/Paragraph/Paragraph";
import MultiTablesWrapper from "../components/common/Table/MultiTablesWrapper";
import Table from "../components/common/Table/Table";
import Tile from "../components/common/Tiles/Tile/Tile";
import TilesContainer from "../components/common/Tiles/TilesContainer/TilesContainer";
import YouTube from "../components/common/Youtube/Youtube";
import CollateContent from "../components/ConditionalContent/CollateContent";
import OSSContent from "../components/ConditionalContent/OSSContent";
import ConnectorDetailsHeader from "../components/ConnectorDetailsHeader/ConnectorDetailsHeader";
import ConnectorInfoCard from "../components/ConnectorInfoCard/ConnectorInfoCard";
import ConnectorsListContainer from "../components/ConnectorsListContainer/ConnectorsListContainer";
import ExtraContent from "../components/ExtraContent/ExtraContent";
import { Heading } from "../components/Heading/Heading";
import Roadmap from "../components/Roadmap/Roadmap";
import Step from "../components/Steps/Step/Step";
import StepDescription from "../components/Steps/Step/StepDescription/StepDescription";
import StepVisualInfo from "../components/Steps/Step/StepVisualInfo/StepVisualInfo";
import StepsContainer from "../components/Steps/StepsContainer/StepsContainer";
import * as allFunctions from "../markdoc/functions";
import * as allNodes from "../markdoc/nodes";
import * as allTags from "../markdoc/tags";

const tags = allTags as unknown as Record<string, Schema>;
const nodes = allNodes as unknown as Partial<Record<NodeType, Schema>>;
const functions = allFunctions as unknown as Record<string, ConfigFunction>;

export const components = {
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
  Paragraph,
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
  Table,
  Icon,
  MultiTablesWrapper,
  APIPageContainer,
  APIInfoContainer,
  APIDescription,
  APIVisualInfo,
  CodeWithLanguageSelector,
  ConnectorInfoCard,
  ConnectorsListContainer,
  ConnectorDetailsHeader,
  Roadmap,
  CollateContent,
  OSSContent,
};

export const configs: Config = {
  tags,
  nodes,
  functions,
};
