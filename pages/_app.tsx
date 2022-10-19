import React from "react";
import Head from "next/head";

import "prismjs";
// Import other Prism themes here
import "../public/globals.css";

import type { AppProps } from "next/app";
import type { MarkdocNextJsPageProps } from "@markdoc/next.js";
import PageLayout1 from "../components/Layout/PageLayout1/PageLayout";
import PageLayout2 from "../components/Layout/PageLayout2/PageLayout2";
import Breadcrumb from "../components/Breadcrumb/Breadcrumb";
import TopNav from "../components/TopNav/TopNav";
import SideNav from "../components/SideNav/SideNav";
import TableOfContents from "../components/TableOfContents/TableOfContents";
import { useRouter } from "next/router";
import classNames from "classnames";
import Footer from "../components/Footer/Footer";
import CategoriesNav from "../components/CategoriesNav/CategoriesNav";

const TITLE = "Markdoc";
const DESCRIPTION = "A powerful, flexible, Markdown-based authoring framework";

function collectHeadings(node, sections = []) {
  if (node) {
    if (node.name === "Heading") {
      const title = node.children[0];

      if (typeof title === "string") {
        sections.push({
          ...node.attributes,
          title,
        });
      }
    }

    if (node.children) {
      for (const child of node.children) {
        collectHeadings(child, sections);
      }
    }
  }

  return sections;
}

export type MyAppProps = MarkdocNextJsPageProps;

export default function MyApp({ Component, pageProps }: AppProps<MyAppProps>) {
  const { markdoc } = pageProps;
  const router = useRouter();
  const isHomePage = router.pathname === "/";

  let title = TITLE;
  let description = DESCRIPTION;
  if (markdoc) {
    if (markdoc.frontmatter.title) {
      title = markdoc.frontmatter.title;
    }
    if (markdoc.frontmatter.description) {
      description = markdoc.frontmatter.description;
    }
  }

  const toc = pageProps.markdoc?.content
    ? collectHeadings(pageProps.markdoc.content)
    : [];

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="referrer" content="strict-origin" />
        <meta name="title" content={title} />
        <meta name="description" content={description} />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <TopNav />
      {pageProps.markdoc?.frontmatter.guide ? (
        <PageLayout2>
          <CategoriesNav />
          {!isHomePage && <SideNav />}
          <main
            className={classNames(
              "flex flex-col",
              isHomePage ? "home-page" : "content"
            )}
          >
            <Breadcrumb slug={pageProps.markdoc?.frontmatter?.slug} />
            <Component {...pageProps} />
          </main>
          <Footer />
        </PageLayout2>
      ) : (
        <PageLayout1>
          <CategoriesNav />
          {!isHomePage && <SideNav />}
          <main
            className={classNames(
              "flex flex-col",
              isHomePage ? "home-page" : "content"
            )}
          >
            <Breadcrumb slug={pageProps.markdoc?.frontmatter?.slug} />
            <Component {...pageProps} />
          </main>
          <TableOfContents toc={toc} />
          <Footer />
        </PageLayout1>
      )}
    </>
  );
}
