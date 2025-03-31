import { ReactNode } from "react";
import { Dimensions } from "./utils";
import { ChartContext } from "./chartContext";
import "./Chart.css";

interface ChartProps {
  dimensions: Dimensions;
  children: ReactNode;
}

const Chart = ({ dimensions, children }: ChartProps) => (
  <ChartContext.Provider value={dimensions}>
    <svg
      // style={{ backgroundColor: "orange" }}
      className="Chart"
      width="100%"
      viewBox={`0 0 ${dimensions.width} ${dimensions.height}`}
      height={dimensions.height}
      preserveAspectRatio="xMidYMid meet"
    >
      <g
        style={{ backgroundColor: "grey" }}
        transform={`translate(${dimensions.marginLeft}, ${dimensions.marginTop})`}
      >
        {children}
      </g>
    </svg>
  </ChartContext.Provider>
);

export default Chart;
