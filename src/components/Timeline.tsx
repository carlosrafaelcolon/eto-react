/** @jsxImportSource @emotion/react */
import { css, Interpolation, Theme } from '@emotion/react';
import { YearlyActivityData, YearlyActivityDatum } from "../models/Chart";
import { useChartDimensions } from "./Chart/utils";
import { scaleLinear, scaleTime } from "d3-scale";
import { timeParse, timeFormat } from "d3-time-format";
import { extent, max as d3Max } from "d3-array";
import { curveMonotoneX } from "d3-shape";
import Line from "./Chart/Line";
import Chart from "./Chart/Chart";
import AxisV2 from "./Chart/AxisV2";
import Axis from "./Chart/Axis";
import "./Timeline.css";

interface TimelineProps {
  data: YearlyActivityData;
  categories: string[];
  css?: Interpolation<Theme>;
}

const Timeline = ({ data, categories }: TimelineProps) => {
  const [ref, dimensions] = useChartDimensions({marginLeft: 60, marginBottom: 50, height: 400});
  const parseDate = timeParse("%Y-%m-%d");
  const formatDate = timeFormat("%Y");
  const dateAccessor = (d: YearlyActivityDatum) => parseDate(d.date);

  const yAccessor =
    (category: keyof YearlyActivityDatum) =>
    (d: YearlyActivityDatum) =>
      d[category] as number;

  const yMax = d3Max(data, (d) =>
    Math.max(d.Enacted, d.Proposed, d.Defunct)
  ) as number;

  const dateExtent = extent(data, dateAccessor) as [Date, Date];

  const xScale = scaleTime()
    .domain(dateExtent || [new Date(), new Date()])
    .range([0, dimensions.boundedWidth]);

  const yScale = scaleLinear()
    .domain([0, yMax])
    .range([dimensions.boundedHeight, 0])
    .nice();

  const xAccessorScaled = (d: YearlyActivityDatum) => {
    const date = dateAccessor(d);
    return xScale(date ?? new Date());
  };

  const yAccessorScaled =
    (category: keyof YearlyActivityDatum) =>
    (d: YearlyActivityDatum) =>
      yScale(yAccessor(category)(d));

  return (
    <div className="Timeline" ref={ref}  >
      <Chart dimensions={dimensions}>
        {categories.map((category) => (
          <Line
            key={category}
            type="line"
            data={data}
            xAccessor={xAccessorScaled}
            yAccessor={yAccessorScaled(category as keyof YearlyActivityDatum)}
            interpolation={curveMonotoneX}
            className={`Line Line--type-line ${category}`}
            strokeWidth={2}
          />
        ))}
        <Axis dimension="x" scale={xScale} formatTick={formatDate} label='Most Recent Activity Date'  grid={true} dash={true} axisLine={false}/>
        <Axis dimension="y" scale={yScale} label='Number of Documents' grid={true} dash={true} axisLine={false}/>
      </Chart>
    </div>
  );
};

export default Timeline;