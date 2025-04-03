/** @jsxImportSource @emotion/react */
import { useState } from "react";
import { BrowserRouter } from "react-router-dom";
import RoutesWrapper from "./routes";
import { ThemeProvider, CssBaseline, Dialog, Typography } from "@mui/material";

import { AppWrapper, InfoCard, ButtonStyled } from "./eto-components";
import theme from "./themes/eto_theme";
import { css } from "@emotion/react";
import breakpoints from "./util/breakpoints";
import "./App.css";

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
  infoCard: css`
    .description {
      display: flex;
      flex-direction: column;
      padding-right: 25px;
    }
  `,
  orientationButton: css`
    margin: 0 auto;
  `,
  orientationDialog: css`
    .MuiDialog-paper {
      margin: 0.5rem;
      max-width: 860px;
      padding: 0.5rem;

      ${breakpoints.phone_large} {
        margin: 1rem;
        padding: 0.75rem;
      }

      ${breakpoints.tablet_small} {
        margin: 2rem;
        padding: 1.5rem;
      }
    }
  `,
  dialogContent: css`
    width: calc(100vw - 2rem);

    ${breakpoints.phone_large} {
      width: calc(100vw - 3.5rem);
    }

    ${breakpoints.tablet_small} {
      max-width: 812px;
      width: calc(100vw - 7rem);
    }
  `,
  videoWrapper: css`
    padding-bottom: 56.25%;
    position: relative;
    width: 100%;

    iframe {
      border: 0;
      position: absolute;
      height: 100%;
      width: 100%;
    }
  `,
};

interface HeaderInfoProps {
  onClickOrientationButton: () => void;
}

const HeaderInfo = ({ onClickOrientationButton }: HeaderInfoProps) => {
  const lastUpdated = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "2-digit",
  });

  return (
    <>
      <span>
        ETO's Map of Science collects and organizes the world’s research
        literature, revealing key trends, hotspots, and concepts in global
        science and technology.
      </span>
      <Typography component={"div"} variant={"body1"}>
        The Map of Science includes hundreds of millions of scholarly
        publications from around the world, algorithmically organized into over
        85,000 <span style={{ fontWeight: "bold" }}>research clusters</span>.
        Filter clusters by subject, growth, country, organization, or other
        characteristics to pinpoint key trends and topics. The Map runs on
        bibliometric data from{" "}
        <a
          href="https://clarivate.com/products/scientific-and-academic-research/research-discovery-and-workflow-solutions/webofscience-platform/"
          target="_blank"
          rel="noopener"
        >
          Clarivate Web of Science
        </a>{" "}
        and other sources.
      </Typography>
      <ButtonStyled
        css={styles.orientationButton}
        onClick={onClickOrientationButton}
      >
        Watch our quick start video (4 min)
      </ButtonStyled>
      <Typography component={"div"}>
        <strong>Learn more:</strong>{" "}
        <a
          href="https://eto.tech/blog/introducing-latest-map-of-science-enhancements/"
          target="_blank"
          rel="noopener"
        >
          Introducing the latest Map of Science enhancements
        </a>
        <span style={{ padding: "0px 10px" }}>|</span>
        <a
          href="https://eto.tech/blog/hot-topics-research-map-of-science"
          target="_blank"
          rel="noopener"
        >
          Hot topics in five research domains, found fast with ETO's Map of
          Science
        </a>
        <span style={{ padding: "0px 10px" }}>|</span>
        <a
          href="https://eto.tech/blog/?tag=Map%20of%20Science"
          target="_blank"
          rel="noopener"
        >
          All Map of Science blog posts
        </a>
        <p>
          Last updated on <span className="no-percy">{lastUpdated}.</span>
        </p>
      </Typography>
    </>
  );
};

function App() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <AppWrapper>
          <div style={{ maxWidth: "1500px", margin: "0 auto" }}>
            <InfoCard
              css={styles.infoCard}
              description={
                <HeaderInfo onClickOrientationButton={() => setIsOpen(true)} />
              }
              documentationLink="https://eto.tech/tool-docs/mos"
              sidebarContent={
                <div>
                  <p style={{ marginTop: "0px" }}>
                    In the default <strong>map view</strong>, hovering over on a
                    cluster will show basic information about the cluster in the
                    right sidebar. Use the controls in the left-hand sidebar to
                    filter visible clusters according to different variables. To
                    view more information about a cluster, click on it to open
                    its <strong>detail view</strong>.
                  </p>
                  <p>
                    Switch to{" "}
                    <strong>
                      <a href="https://sciencemap.eto.tech/?mode=list">
                        list view
                      </a>
                    </strong>{" "}
                    to view the clusters in the Map in a table. You can add and
                    remove columns, or click on individual rows to access the
                    detail view.{" "}
                    <strong>
                      <a href="https://sciencemap.eto.tech/?mode=summary">
                        Summary view
                      </a>
                    </strong>{" "}
                    displays summary information for all clusters meeting the
                    current set of filters.
                  </p>
                </div>
              }
              sidebarTitle="Quick guide"
              title="Map of Science"
            />
          </div>

          <RoutesWrapper />
        </AppWrapper>
        <Dialog
          css={styles.orientationDialog}
          onClose={() => setIsOpen(false)}
          open={isOpen}
        >
          <div css={styles.dialogContent}>
            <div css={styles.videoWrapper}>
              <iframe
                src="https://www.youtube-nocookie.com/embed/PLCLUonwMdo?si=A_2kU6lRDkk0SPSn&rel=0"
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>
          </div>
        </Dialog>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
