import { ParagraphProps } from "./Paragraph.interface";

function Paragraph({ searchWeight, children }: ParagraphProps) {
  let otherProps = {};

  if (searchWeight) {
    otherProps = {
      ["data-pagefind-weight"]: searchWeight,
    };
  }
  return <p {...otherProps}>{children}</p>;
}

export default Paragraph;
