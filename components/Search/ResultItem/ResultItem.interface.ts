export interface ResultData {
  id: string;
  url: string;
  raw_url: string;
  excerpt: string;
  meta: {
    title: string;
  };
}

export interface ResultsProps {
  id: number;
  result: ResultData;
}
