import { schemeTableau10 } from "d3-scale-chromatic";
import { scaleTime, scaleLinear, scaleOrdinal } from "d3-scale";
import { rollup, extent } from "d3-array";
import { curveBasis, area, SeriesPoint } from "d3-shape";
import { stack, stackOffsetWiggle, stackOrderInsideOut } from "d3-shape";
import Chart from "./Chart/Chart";
import { AreaPaths } from "./Chart/AreaPaths";
import { useChartDimensions } from "./Chart/utils";
import { StackedDatum, StackedSeries } from "../models/Chart";
interface GroupChartProps {
  data: {
    date: Date;
    category: string;
    value: number;
  }[];
}
const GroupChart = ({ data }: GroupChartProps) => {
  const [ref, dimensions] = useChartDimensions();

  const categories = [...new Set(data.map((d) => d.category))];
  const roll = rollup(
    data,
    (v) => {
      const o: { [key: string]: number } = {};
      for (const x of v) o[x.category] = x.value;
      return o;
    },
    (d) => d.date
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
    .range([0, dimensions.boundedWidth ?? 500]);

  const yExtent = extent(series.flat(2));
  const yScale = scaleLinear()
    .domain(yExtent[0] && yExtent[1] ? (yExtent as [number, number]) : [0, 1])
    .range([dimensions.boundedHeight ?? 500, 0]);

  const d3Area = area<SeriesPoint<StackedDatum>>()
    .curve(curveBasis)
    .x((d) => xScale(d.data[0]))
    .y0((d) => yScale(d[0]))
    .y1((d) => yScale(d[1]));

  const color = scaleOrdinal<string, string>()
    .domain(categories)
    .range(schemeTableau10);

  return (
    <div className="GroupChart" ref={ref}>
      <Chart dimensions={dimensions}>
        <AreaPaths data={series} areaGenerator={d3Area} color={color} />
      </Chart>
    </div>
  );
};
export default GroupChart;
