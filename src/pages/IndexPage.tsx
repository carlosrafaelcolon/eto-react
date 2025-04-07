/** @jsxImportSource @emotion/react */
import React, { useEffect, useMemo, useState } from "react";
import { json } from "d3-fetch";
import { AgoraDocument } from "../models/Agora";
import { css } from "@emotion/react";
import TabWrapper from "../components/TabWrapper";

import StreamgraphContainer from "../components/StreamgraphContainer/StreamgraphContainer";
import GroupedBarChartContainer from "../components/GroupedBarChart/GroupedBarChartContainer";

import PieChart from "../components/PieChart";
import Timeline from "../components/Timeline";

import {
  prepareYearlyTopics,
  prepareYearlyActivity,
  prepareGroupedBarChartData,
} from "../util/dataTransforms";
import { CircularProgress } from "@mui/material";
import breakpoints from "../util/breakpoints";

const styles = {
  dashboardGrid: css`
    display: grid;
    gap: 2rem;
    grid-template-columns: 1fr;
  `,
  halfRow: css`
    display: grid;
    grid-template-columns: 1fr;
    gap: 1.5rem;

    ${breakpoints.tablet_regular} {
      grid-template-columns: repeat(2, 1fr);
      gap: 2rem;
    }
  `,
  containerSection: css`
    margin-bottom: 2rem;
    .container-header {
      background-color: var(--bright-blue-medium);
      color: white;
      margin-bottom: 1rem;
      padding: 1rem;

      h2 {
        margin: 0;
        font-size: 1.2rem;
        font-weight: 400;
      }
    }
    .container-content {
      padding: 1rem;
    }
  `,
  containerHeader: css`
    background-color: var(--bright-blue-medium);
    color: white;
    margin-bottom: 1rem;
    padding: 1rem;

    h2 {
      margin: 0;
      font-size: 1.2rem;
      font-weight: 400;
    }
  `,
  containerContent: css`
    padding: 1rem;
  `,
  chartContainer: css`
    margin-bottom: 1.5rem;
  `,
  chartTitle: css`
    text-align: center;
    margin-bottom: 1.5rem;
    font-size: 1.25rem;
    font-weight: 400;
    color: #858181;
  `,
  loaderContainer: css`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
  `
};
const IndexPage = () => {
  const [rawData, setRawData] = useState<AgoraDocument[]>([]);
  useEffect(() => {
    const getData = async () => {
      try {
        const response = (await json("/data/agora_data.json")) as
          | AgoraDocument[]
          | undefined;
        setRawData(response ?? []);
      } catch (error) {
        console.error("Failed to fetch data:", (error as Error).message);
        setRawData([]);
      }
    };
    getData();
  }, []);

  const streamgraphData = useMemo(
    () => ({
      risk_factors: prepareYearlyTopics(rawData, "risk_factors"),
      applications: prepareYearlyTopics(rawData, "applications"),
      harms: prepareYearlyTopics(rawData, "harms"),
    }),
    [rawData]
  );

  const mostRecentActivityData = useMemo(() => {
    const counts: Record<AgoraDocument["most_recent_activity"], number> = {
      Enacted: 0,
      Proposed: 0,
      Defunct: 0,
    };

    for (const doc of rawData) {
      counts[doc.most_recent_activity]++;
    }

    return {
      labels: Object.keys(counts),
      values: Object.values(counts),
    };
  }, [rawData]);

  const timelineData = useMemo(() => {
    const { data, categories } = prepareYearlyActivity(rawData);
    return { data, categories };
  }, [rawData]);
  const groupedBarChartData = useMemo(() => {
    const data = prepareGroupedBarChartData(rawData);

    return data;
  }, [rawData]);

  return (
    <TabWrapper activeTab={0}>
      <div css={styles.dashboardGrid}>
        <section css={styles.containerSection}>
          <div css={styles.containerHeader}>
            <h2>Header test</h2>
          </div>
          <div css={styles.containerContent}>
            {groupedBarChartData.length > 0 ? (
              <GroupedBarChartContainer data={groupedBarChartData}/>
            ) : (
              <div css={styles.loaderContainer}>
                <CircularProgress size={100} />
              </div>
            )}

            <div css={styles.halfRow}>
              <div style={{ background: "pink" }} css={styles.containerContent}>
                <PieChart data={mostRecentActivityData} title="STATUS" />
              </div>
              <div
                style={{ background: "pink", height: "500px" }}
                css={styles.containerContent}
              >
                <div>Pie Chart 2</div>
              </div>
            </div>
          </div>
        </section>
        <section css={styles.containerSection}>
          <div className="container-header">
            <h2>Header test</h2>
          </div>
          <div className="container-content">
            {streamgraphData.risk_factors.length > 0 ? (
              <StreamgraphContainer data={streamgraphData}/>
            ) : (
              <div css={styles.loaderContainer}>
                <CircularProgress size={100} />
              </div>
            )}
          </div>
        </section>
        <section css={styles.containerSection}>
          <div css={styles.containerHeader} className="container-header">
            <h2>Header test</h2>
          </div>
          <div css={styles.containerContent} className="container-content">
            {timelineData.data.length > 0 ? (
              <div css={styles.chartContainer} className="Timeline-container">
                <Timeline
                  data={timelineData.data}
                  categories={timelineData.categories}
                />
              </div>
            ) : (
              <div css={styles.loaderContainer}>
                <CircularProgress size={100} />
              </div>
            )}
          </div>
        </section>
      </div>
    </TabWrapper>
  );
};

export default IndexPage;
