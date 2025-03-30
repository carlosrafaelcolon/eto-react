/** @jsxImportSource @emotion/react */
import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import { ErrorBoundary } from "./eto-components";
import { css } from "@emotion/react";
const IndexPage = lazy(() => import("./pages/IndexPage"));
const CollectionPage = lazy(() => import("./pages/CollectionPage"));
const styles = {
  errorBoundary: css`
    background-color: var(--red-lighter);
    grid-column: 1 / -1;
    padding: 4rem 2rem;

    & > div {
      max-width: 600px;
      margin: 0 auto;
    }
  `,
  suspenseFallback: css`
    text-align: center;
    vertical-align: top;
  `,
};
const RoutesWrapper = () => (
  <Suspense
    fallback={
      <div css={styles.suspenseFallback}>
        <CircularProgress />
      </div>
    }
  >
    <ErrorBoundary css={styles.errorBoundary}>
      <Routes>
        <Route index path="/" element={<IndexPage />} />
        <Route path="/list" element={<CollectionPage />} />
      </Routes>
    </ErrorBoundary>
  </Suspense>
);

export default RoutesWrapper;
