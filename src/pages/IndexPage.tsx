/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import TabWrapper from "../components/TabWrapper";
const styles = {
  dashboardGrid: css`
    display: grid;
    gap: 2rem;
    grid-template-columns: 1fr;
    grid-template-rows: auto;
    padding: 1rem;

    // For the row with 3 pie charts
    .pie-chart-row {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 1.5rem;
    }
  `,
};
const IndexPage = () => {
  return (
    <TabWrapper activeTab={0}>
      <div css={styles.dashboardGrid}>
        {/* Grouped Bar Chart */}
        <div style={{background: "blue", height: "200px"}}>Grouped Bar Chart Component</div>

        {/* Row of 3 Pie Charts */}
        <div className="pie-chart-row" style={{background: "grey"}}>
          <div style={{background: "pink", height: "200px"}}>Pie Chart 1</div>
          <div style={{background: "pink", height: "200px"}}>Pie Chart 2</div>
          <div style={{background: "pink", height: "200px"}}>Pie Chart 3</div>
        </div>

        {/* Streamgraph */}
        <div style={{background: "green", height: "200px"}}>Streamgraph Component</div>
      </div>
    </TabWrapper>
  );
}

export default IndexPage;
