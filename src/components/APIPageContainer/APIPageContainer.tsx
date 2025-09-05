import { ReactNode } from "react";

interface APIPageContainerProps {
  children: ReactNode;
}

function APIPageContainer({ children }: APIPageContainerProps) {
  return <div>{children}</div>;
}

export default APIPageContainer;
