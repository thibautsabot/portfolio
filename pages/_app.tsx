import React, { ElementType, ReactElement } from "react";

import Layout from "../src/Layout";

function MyApp({
  Component,
  pageProps,
}: {
  Component: ElementType;
  pageProps: any;
}): ReactElement {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
