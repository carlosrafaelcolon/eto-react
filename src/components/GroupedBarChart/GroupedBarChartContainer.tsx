/** @jsxImportSource @emotion/react */
import GroupedBarChart from "./GroupedBarChart";
import { css } from "@emotion/react";

interface GroupedBarChartData {
  year: string;
  categories: {
    category: string;
    value: number;
  }[];
}
const styles = {
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
  chartContainer: css`
    margin-bottom: 1.5rem;
    .chart-title {
      text-align: center;
      margin-bottom: 1.5rem;
      font-size: 1.25rem;
      font-weight: 400;
      color: #858181;
    }
  `,
};

const GroupedBarChartContainer = ({
  data,
}: {
  data: GroupedBarChartData[];
}) => {
  return (
    <div css={styles.chartContainer}>
      <h1 className="chart-title">AI Policy Status by Year of Proposal</h1>
      <GroupedBarChart
        data={data}
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
  );
};

export default GroupedBarChartContainer;
