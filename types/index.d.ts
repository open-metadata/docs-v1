import { ResultData } from "../components/Search/Results/Results.interface";

interface PageFindOptions {
  element?: string;
  bundlePath?: string;
  baseUrl?: string;
  bundlePath?: string;
  excerptLength?: number;
  highlightParam?: string;
  indexWeight?: number;
  debounceTimeoutMs?: number;
  mergeFilter?: { resource?: string };
  showImages?: boolean;
}

declare global {
  interface Window {
    initial: any;
    pageFind: {
      options?: (PageFindOptions) => Promise<void>;
      search: (text: string) => Promise<{
        results: {
          id: string;
          data: () => Promise<ResultData | void>;
        }[];
      }>;
    };
  }
}
