/** @jsxImportSource @emotion/react */
import { useChartDimensions } from "../Chart/utils";
import { schemeSpectral } from "d3-scale-chromatic";
import { scaleLinear, scaleBand, scaleOrdinal } from "d3-scale";
import { max as d3Max } from "d3-array";
import Chart from "../Chart/Chart";
import Legend from "../Chart/Legend/Legend";
import Axis from "../Chart/Axis/Axis";
import Bar from "../Chart/Bar";

interface GroupedBarChartProps {
  data: {
    categories: { category: string; value: number }[];
    year: string;
  }[];
  xLabel?: string;
  yLabel?: string;
  legend?: boolean;
  legendPosition?: "top" | "bottom";
  colors?: string[] | Record<string, string>;
}

const GroupedBarChart = ({
  data,
  xLabel = "",
  yLabel = "",
  legend = false,
  legendPosition = "top",
  colors,
}: GroupedBarChartProps) => {
  const years = Array.from(new Set(data.map((d) => d.year)));
  const categories = Array.from(
    new Set(data.flatMap((d) => d.categories.map((c) => c.category)))
  );

  const [ref, dimensions] = useChartDimensions({
    marginTop: legend && legendPosition === "top" ? 50 : 30,
    marginLeft: 60,
    marginBottom: legend && legendPosition === "bottom" ? 50 : 40,
    height: 500,
  });

  const defaultColors: string[] =
    (schemeSpectral as any)[categories.length] || schemeSpectral[9];

  let colorRange: string[];
  if (!colors) {
    colorRange = defaultColors;
  } else if (Array.isArray(colors)) {
    colorRange = [
      ...colors,
      ...defaultColors.slice(colors.length, categories.length),
    ].slice(0, categories.length);
  } else {
    colorRange = categories.map(
      (cat, index) => colors[cat] || defaultColors[index] || "#ccc"
    );
  }

  const color = scaleOrdinal<string, string>()
    .domain(categories)
    .range(colorRange)
    .unknown("#ccc");

  const fx = scaleBand()
    .domain(years)
    .range([0, dimensions.boundedWidth])
    .paddingInner(0.1);

  const x = scaleBand()
    .domain(categories)
    .rangeRound([0, fx.bandwidth()])
    .padding(0.05);

  const yScale = scaleLinear()
    .domain([0, d3Max(data, (d) => d3Max(d.categories, (c) => c.value)) ?? 0])
    .nice()
    .rangeRound([dimensions.boundedHeight, 0]);

  return (
    <div className="GroupedBarChart" ref={ref}>
      <Chart dimensions={dimensions}>
        {legend && (
          <Legend
            categories={categories}
            legendPosition={legendPosition}
            colors={colors}
          />
        )}
        <Axis
          direction="y"
          scale={yScale}
          grid={true}
          dash={true}
          label={yLabel}
          axisLine={false}
        />
        <g>
          {data.map((yearData) => (
            <g
              key={yearData.year}
              transform={`translate(${fx(yearData.year)}, 0)`}
              className={`GroupedBarChart__year ${yearData.year}`}
            >
              {yearData.categories.map((categoryData) => {
                const barHeight = Math.max(
                  0,
                  dimensions.boundedHeight - yScale(categoryData.value)
                );
                return (
                  <Bar
                    key={categoryData.category}
                    x={x(categoryData.category)!}
                    y={yScale(categoryData.value)}
                    width={x.bandwidth()}
                    height={barHeight}
                    fill={color(categoryData.category)}
                  />
                );
              })}
            </g>
          ))}
        </g>
        <Axis direction="x" scale={fx} label={xLabel} />
      </Chart>
    </div>
  );
};

export default GroupedBarChart;
