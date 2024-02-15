import classNames from "classnames";
import { isEmpty, isNil } from "lodash";
import Link from "next/link";
import { useEffect, useState } from "react";
import styles from "../Search.module.css";
import { ResultData, ResultsProps } from "./Results.interface";

export default function Results({ result }: ResultsProps) {
  const [data, setData] = useState<ResultData>(null);

  const fetchData = async () => {
    try {
      const data = await result.data();
      setData(data);
    } catch {
      setData(null);
    }
  };

  useEffect(() => {
    fetchData();
  }, [result]);

  if (!data) return null;

  return isNil(data) || isEmpty(data) ? (
    <div>No Results found</div>
  ) : (
    <Link
      className={classNames(styles.HitLink, styles.HitContainer)}
      href={data.url}
    >
      <h3>{data.meta.title}</h3>
      <p dangerouslySetInnerHTML={{ __html: data.excerpt }}></p>
    </Link>
  );
}
