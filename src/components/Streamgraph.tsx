/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useState } from "react";
import { schemeTableau10 } from "d3-scale-chromatic";
import { scaleTime, scaleLinear, scaleOrdinal } from "d3-scale";
import { timeFormat, timeParse } from "d3-time-format";
import { rollup, extent } from "d3-array";
import { area, SeriesPoint, curveBasis } from "d3-shape";
import { stack, stackOffsetWiggle, stackOrderInsideOut } from "d3-shape";
import Chart from "./Chart/Chart";
import { AreaPaths } from "./Chart/AreaPaths";
import { useChartDimensions } from "./Chart/utils";
import { StackedDatum, StackedSeries } from "../models/Chart";
import Axis from "./Chart/Axis";

interface StreamgraphProps {
  data: {
    date: string;
    category: string;
    value: number;
  }[];
  xLabel?: string;
  yLabel?: string;
  selectedCategory?: string;
}
const cleanKeyForLegend = (key: string | null) => {
  if (!key) return "";
  const cleanedKey = key
    .replace(/_/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
  return cleanedKey;
}
const streamGraphLegend = css`
  position: absolute;
  background: rgba(255, 255, 255, 0.8);
  padding: 5px 10px;
  borderradius: 4px;
  boxshadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  h2 {
    margin: 0;
    font-size: 0.9rem;
    font-weight: 400;
    color: #333;
  }
  h3 {
    margin: 0;
    font-size: 0.9rem;
    font-weight: 300;
    font-style: italic;
    color: #666;
  }
    p {
    margin: 0;
    font-size: 0.8rem;
    font-weight: 300;
    color: #999;
    max-width: 300px;
  }
`;
const Streamgraph = ({
  data,
  xLabel = "",
  yLabel = "",
  selectedCategory = "",
}: StreamgraphProps) => {
  const [hoveredKey, setHoveredKey] = useState<string | null>(null);
  const [ref, dimensions] = useChartDimensions({
    marginLeft: 60,
    marginBottom: 50,
  });

  const parseDate = timeParse("%Y-%m-%d");
  const categories = [...new Set(data.map((d) => d.category))];

  const roll = rollup(
    data,
    (v) => {
      const o: { [key: string]: number } = {};
      for (const x of v) o[x.category] = x.value;
      return o;
    },
    (d) => parseDate(d.date) as Date
  );

  const dataByDate: [Date, Record<string, number>][] = Array.from(
    roll.entries()
  )
    .map(([date, catObj]) => [date, catObj] as [Date, Record<string, number>])
    .sort((a, b) => a[0].getTime() - b[0].getTime());

  const series: StackedSeries[] = stack<StackedDatum>()
    .keys(categories)
    .value(([, catObj], key) => catObj[key] ?? 0)
    .offset(stackOffsetWiggle)
    .order(stackOrderInsideOut)(dataByDate);

  const dateExtent = extent(dataByDate, (d) => d[0]);

  const xScale = scaleTime()
    .domain(
      dateExtent[0] && dateExtent[1]
        ? (dateExtent as [Date, Date])
        : [new Date(), new Date()]
    )
    .range([0, dimensions.boundedWidth]);

  const yExtent = extent(series.flat(2));
  const yScale = scaleLinear()
    .domain(yExtent[0] && yExtent[1] ? (yExtent as [number, number]) : [0, 1])
    .range([dimensions.boundedHeight, 0]);

  const formatDate = timeFormat("%Y");
  const formatYAxisTick = (d: number) => Math.abs(d).toString();

  const d3Area = area<SeriesPoint<StackedDatum>>()
    .curve(curveBasis)
    .x((d) => xScale(d.data[0]))
    .y0((d) => yScale(d[0]))
    .y1((d) => yScale(d[1]));

  const color = scaleOrdinal<string, string>()
    .domain(categories)
    .range(schemeTableau10);

    return (
      <div className="Streamgraph" ref={ref} style={{ position: "relative" }}>

        { hoveredKey &&  (
          <div
            className="streamgraph-legend"
            css={streamGraphLegend}
            style={{ left: dimensions.marginLeft + 5, top: dimensions.marginTop + 5 }}
          >
            <h2>
              <strong>
                {selectedCategory === "risk_factors"
                  ? "Risk factors governed: "
                  : selectedCategory === "harms"
                  ? "Harms addressed: "
                  : selectedCategory === "applications"
                  ? "Applications: "
                  : ""}
              </strong>
              <span>{cleanKeyForLegend(hoveredKey)}</span>
            </h2>
    
            <h3>
              Total Documents:{" "}
              {data
                ?.filter((d) => d.category === hoveredKey)
                .reduce((sum, d) => sum + d.value, 0)}
            </h3>
    

            { hoveredKey === "security" && (
              <p>
                This category includes <b>Cybersecurity</b> and <b>Dissemination.</b>
              </p>
            )}
            { hoveredKey === "reliability" && (
              <p>
                This category includes <b>Robustness</b>.
              </p>
            )}
          </div>
        )}
    
        <Chart dimensions={dimensions}>
          <Axis
            dimension="x"
            scale={xScale}
            formatTick={formatDate}
            grid={true}
            label={xLabel}
          />
          <Axis
            dimension="y"
            scale={yScale}
            formatTick={formatYAxisTick}
            axisLine={false}
            grid={true}
            dash={true}
            label={yLabel}
          />
          <AreaPaths
            data={series}
            areaGenerator={d3Area}
            color={color}
            onHover={setHoveredKey}
            hoveredKey={hoveredKey}
          />
        </Chart>
      </div>
    );
};

export default Streamgraph;
