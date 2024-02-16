import { ResultData } from "../components/Search/ResultItem/ResultItem.interface";

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
      preload: (text: string) => void;
      search?: (text: string) => Promise<{
        results: {
          id: string;
          data: () => Promise<ResultData | void>;
        }[];
      }>;
    };
  }
}
