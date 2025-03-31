/** @jsxImportSource @emotion/react */
import { Suspense, lazy } from "react";
import PlotlyDefaults from "../eto-components/PlotlyDefaults";
import { css } from "@emotion/react";

const Plot = lazy(() => import('react-plotly.js'));

interface PieChartProps {
    data: { labels: string[], values: number[] };
    title?: string;
    colors?: string[];
    centerLabel?: string;
  }

const styles = {
  wrapper: css`
    width: 100%;
    height: 100%;
  `,
};

const PieChart = ({ data, title }: PieChartProps) => {
  const plotlyDefaults = PlotlyDefaults();

  return (
    <div css={styles.wrapper}>
      <Suspense fallback={<div>Loading chart...</div>}>
        <Plot
          data={[
            {
              type: "pie",
              labels: data.labels,
              values: data.values,
              textinfo: "label+percent",
              hoverinfo: "label+value+percent",
              hole: 0.4,
              marker: {
                colors: ["#7efce7", "#ffaa80", "#ea80ff"], 
              },
            },
          ]}
          layout={{
            ...plotlyDefaults.layout,
            margin: { t: 30, b: 30, l: 30, r: 30 },
            showlegend: true,
            annotations: [
                {
                  text: title || "",
                  font: {
                    size: 16,
                    family: "'IBM Plex Sans', Arial, sans-serif",
                  },
                  showarrow: false,
                  x: 0.5,
                  y: 0.5,
                  xanchor: "center",
                  yanchor: "middle",
                },
              ],
          }}
          config={plotlyDefaults.config}
          style={{ width: "100%", height: "100%" }}
        />
      </Suspense>
    </div>
  );
};

export default PieChart;
