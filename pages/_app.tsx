import React, { ReactElement, ElementType } from "react";

function MyApp({
  Component,
  pageProps,
}: {
  Component: ElementType;
  pageProps: any;
}): ReactElement {
  return <Component {...pageProps} />;
}

export default MyApp;
