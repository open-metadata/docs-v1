export interface ResultData {
  url: string;
  excerpt: string;
  meta: {
    title: string;
  };
}

export interface ResultsProps {
  result: {
    data: () => Promise<ResultData>;
  };
}
