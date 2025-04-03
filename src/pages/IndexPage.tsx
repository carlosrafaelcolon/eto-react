/** @jsxImportSource @emotion/react */
import React, { useEffect, useMemo, useRef, useState } from "react";
import { json } from "d3-fetch";
import { AgoraDocument } from "../models/Agora";
import { css } from "@emotion/react";
import TabWrapper from "../components/TabWrapper";
import Streamgraph from "../components/Streamgraph";
import PieChart from "../components/PieChart";
import Timeline from "../components/Timeline";
import GroupedBarChart from "../components/GroupedBarChart";
import {
  prepareYearlyTopics,
  prepareYearlyActivity,
  prepareGroupedBarChartData,
} from "../util/dataTransforms";
import { CircularProgress } from "@mui/material";
import { HelpTooltip } from "../eto-components";
import { Radio, RadioGroup, FormControlLabel } from "@mui/material";
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
  `,
  radioGroup: css`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row;
    gap: 1rem;
    margin-bottom: 1rem;
    margin-top: 1rem;
    .MuiRadio-root.Mui-checked {
      color: var(--purple);
    }
    .MuiFormControlLabel-label {
      font-size: 14px;
    }
  `,
};
const IndexPage = () => {
  const [rawData, setRawData] = useState<AgoraDocument[]>([]);
  const [selectedOption, setSelectedOption] =
    useState<keyof typeof streamgraphData>("risk_factors");

  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedOption(event.target.value as keyof typeof streamgraphData);
  };
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
    console.log(data);
    return data;
  }, [rawData]);

  console.log("rawData", rawData);
  return (
    <TabWrapper activeTab={0}>
      <div css={styles.dashboardGrid}>
        <section css={styles.containerSection}>
          <div css={styles.containerHeader}>
            <h2>Header test</h2>
          </div>
          <div css={styles.containerContent}>
            {groupedBarChartData.length > 0 ? (
              <div
                css={styles.chartContainer}
                className="GroupedBarChart-container"
              >
                <h1 css={styles.chartTitle}>
                  AI Policy Status by Year of Proposal
                </h1>
                <GroupedBarChart
                  data={groupedBarChartData}
                  xLabel="Year Proposed"
                  yLabel="Number of Documents"
                  legend={true}
                  legendPosition="top"
                  colors={{
                    Enacted: "#95ff80",
                    Proposed: "#4c98ff",
                    Defunct: "#ff8095",
                  }}
                />
              </div>
            ) : (
              <div
                css={styles.loaderContainer}
              >
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
          <div css={styles.containerHeader}>
            <h2>Header test</h2>
          </div>
          <div css={styles.containerContent}>
            {streamgraphData.risk_factors.length > 0 ? (
              <div
                css={styles.chartContainer}
                className="Streamgraph-container"
              >
                <RadioGroup
                  value={selectedOption}
                  onChange={handleRadioChange}
                  css={styles.radioGroup}
                >
                  <FormControlLabel
                    value="risk_factors"
                    control={<Radio />}
                    label={
                      <span>
                        Risk Factors Governed{" "}
                        <HelpTooltip
                          text={`Risk Factors Governed refers to the types of risks or risk factors that policies explicitly address to make AI systems more or less risky. Examples include bias, reliability, safety, and security. <a href="https://docs.google.com/document/d/1A9z0EwSr2sOizAEAm4-M8B8YXLoHonnFT57yfi0q7cw/edit?tab=t.0#heading=h.9c8kxeh48q5i" target="_blank" rel="noopener noreferrer">Learn more</a>`}
                        />
                      </span>
                    }
                  />
                  <FormControlLabel
                    value="harms"
                    control={<Radio />}
                    label={
                      <span>
                        Harms Addressed{" "}
                        <HelpTooltip
                          text={`Harms Addressed refers to the real-world consequences of AI use or development that policies aim to prevent, such as harm to health, property, or infrastructure. <a href="https://docs.google.com/document/d/1A9z0EwSr2sOizAEAm4-M8B8YXLoHonnFT57yfi0q7cw/edit?tab=t.0#heading=h.1modprt4477t" target="_blank" rel="noopener noreferrer">Learn more</a>`}
                        />
                      </span>
                    }
                  />
                  <FormControlLabel
                    value="applications"
                    control={<Radio />}
                    label={
                      <span>
                        Applications{" "}
                        <HelpTooltip
                          text={`Applications refer to the real-world domains where AI is explicitly used, such as medicine, transportation, and finance. <a href="https://docs.google.com/document/d/1A9z0EwSr2sOizAEAm4-M8B8YXLoHonnFT57yfi0q7cw/edit?tab=t.0#heading=h.gss87so62q7v" target="_blank" rel="noopener noreferrer">Learn more</a>`}
                        />
                      </span>
                    }
                  />
                </RadioGroup>
                <h1 css={styles.chartTitle}>
                  {selectedOption === "risk_factors"
                    ? "AI Risk Factors Governed Over Time"
                    : selectedOption === "harms"
                    ? "AI-Related Harms Addressed Over Time"
                    : selectedOption === "applications"
                    ? "AI Application Domains Addressed Over Time"
                    : "AI Policy Trends Over Time"}
                </h1>
                <Streamgraph
                  data={streamgraphData[selectedOption]}
                  selectedCategory={selectedOption}
                  xLabel="Most Recent Activity Date"
                  yLabel="Number of Documents"
                />
              </div>
            ) : (
              <div
                css={styles.loaderContainer}
              >
                <CircularProgress size={100} />
              </div>
            )}
          </div>
        </section>
        <section css={styles.containerSection}>
          <div css={styles.containerHeader}>
            <h2>Header test</h2>
          </div>
          <div css={styles.containerContent}>
            {timelineData.data.length > 0 ? (
              <div css={styles.chartContainer} className="Timeline-container">
                <Timeline
                  data={timelineData.data}
                  categories={timelineData.categories}
                />
              </div>
            ) : (
              <div
                css={styles.loaderContainer}
              >
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
