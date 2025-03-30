import React, { useMemo } from "react";
import Chart from "./Chart/Chart";
import { useChartDimensions, useUniqueId } from "./Chart/utils";
const GroupChart = () => {
  const [ref, dimensions] = useChartDimensions();
  console.log("dimensions", dimensions);
  const id = useUniqueId("group-chart");
  console.log("id", id);
  console.log("ref", ref.current);
  console.log("width", dimensions.width);
  console.log("height", dimensions.height);
  return (
    <>
      {/* <h1>Group Chart</h1> */}
      <div className="GroupChart" ref={ref}>
        <Chart
          // dimensions={dimensions}
          dimensions={dimensions}
        >
          <div>example</div>
        </Chart>
      </div>
    </>
  );
};
export default GroupChart;
