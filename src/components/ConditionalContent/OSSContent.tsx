import { ReactNode } from "react";
import { useDocVersionContext } from "../../context/DocVersionContext";

function OSSContent({ children }: { children: ReactNode }) {
  const { enableVersion } = useDocVersionContext();

  if (!enableVersion) {
    return null;
  }

  return <>{children}</>;
}

export default OSSContent;
