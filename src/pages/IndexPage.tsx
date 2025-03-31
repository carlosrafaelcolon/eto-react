/** @jsxImportSource @emotion/react */
import React, { useEffect, useMemo, useRef, useState } from "react";
import { json } from "d3-fetch";
import { AgoraDocument } from "../models/Agora";
import { css } from "@emotion/react";
import TabWrapper from "../components/TabWrapper";
import Streamgraph from "../components/Streamgraph";
import { prepareYearData } from "../util/dataTransforms";

const styles = {
  dashboardGrid: css`
    display: grid;
    gap: 2rem;
    grid-template-columns: 1fr;
    grid-template-rows: auto;
    padding: 1rem;
  `,

  mixedChartRow: css`
    display: grid;
    grid-template-columns: 1fr 2fr;
    gap: 1.5rem;
  `,

  pieStack: css`
    display: grid;
    gap: 1.5rem;
    grid-template-rows: 1fr 1fr;
  `,


};



const IndexPage = () => {
  const [data, setData] = useState<AgoraDocument[]>([]);
  useEffect(() => {
    const getData = async () => {
      try {
        const response = (await json("/data/agora_data.json")) as
          | AgoraDocument[]
          | undefined;
        setData(response ?? []);
      } catch (error) {
        console.error("Failed to fetch data:", (error as Error).message);
        setData([]);
      }
    };
    getData();
  }, []);

  const transformed = useMemo(() => ({
    risk_factors: prepareYearData(data, "risk_factors"),
    applications: prepareYearData(data, "applications"),
    harms: prepareYearData(data, "harms"),
  }), [data]);
  
  return (
    <TabWrapper activeTab={0}>
      <div css={styles.dashboardGrid}>
        <div style={{ background: "blue", height: "200px" }}>
          <div>timeline</div>
        </div>
  
        <div css={styles.mixedChartRow}>
          <div css={styles.pieStack}>
            <div  style={{background: "pink", height: "200px"}}>Pie Chart 1</div>
            <div style={{background: "pink", height: "200px"}}>Pie Chart 2</div>
          </div>
          <div style={{background: "lightblue", height: "100%"}}>
            <div>Horizontal Bar Chart</div>
          </div>
        </div>
  
        <div>
          <Streamgraph data={transformed["risk_factors"]} />
        </div>
      </div>
    </TabWrapper>
  );
  
};

export default IndexPage;
