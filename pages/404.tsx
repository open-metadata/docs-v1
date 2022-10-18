import React from "react";
import { getMenu } from "../lib/api";

export default function Home({ menu }) {
  return <div>Page404</div>;
}

export async function getStaticProps() {
  return {
    props: {
      menu: getMenu(),
    },
    revalidate: 60,
  };
}
