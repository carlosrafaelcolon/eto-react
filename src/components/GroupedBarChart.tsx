/** @jsxImportSource @emotion/react */
import { useSpring, animated } from "@react-spring/web";
import { useLayoutEffect, useRef, useState } from "react";
import { useChartDimensions } from "./Chart/utils";
import { schemeSpectral } from "d3-scale-chromatic";
import { scaleLinear, scaleBand, scaleOrdinal } from "d3-scale";
import { max as d3Max } from "d3-array";
import Chart from "./Chart/Chart";
import Axis from "./Chart/Axis";

const Bar = ({
  x,
  y,
  width,
  height,
  fill,
}: {
  x: number;
  y: number;
  width: number;
  height: number;
  fill: string;
}) => {
  const springProps = useSpring({
    from: { height: 0, y: y + height },
    to: { height, y },
    config: { tension: 90, friction: 40 },
  });

  return (
    <animated.rect
      x={x}
      y={springProps.y} 
      width={width}
      height={springProps.height} 
      fill={fill}
    />
  );
};
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
  const legendRef = useRef<SVGGElement>(null);
  const [legendWidth, setLegendWidth] = useState(0);
  const [legendHeight, setLegendHeight] = useState(0);
  const years = Array.from(new Set(data.map((d) => d.year)));
  const categories = Array.from(
    new Set(data.flatMap((d) => d.categories.map((c) => c.category)))
  );
  useLayoutEffect(() => {
    if (legendRef.current) {
      const { width, height } = legendRef.current.getBBox();
      setLegendWidth(width);
      setLegendHeight(height);
    }
  }, [categories]);

  const extraMarginTop =
    legend && legendPosition === "top" ? legendHeight + 10 : 0;
  const extraMarginBottom =
    legend && legendPosition === "bottom" ? legendHeight + 10 : 0;

  const [ref, dimensions] = useChartDimensions({
    marginTop: legend && legendPosition === "top" ? 10 + extraMarginTop : 10,
    marginLeft: 60,
    marginBottom:
      legend && legendPosition === "bottom" ? 60 + extraMarginBottom : 60,
    height: 500,
  });

  const defaultColors: string[] =
    (schemeSpectral as any)[categories.length] || schemeSpectral[9]; // fallback if needed

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

  console.log("legend dimensions", legendWidth, legendHeight);

  return (
    <div className="GroupedBarChart" ref={ref}>
      <Chart dimensions={dimensions}>
        {legend && (
          <g
            ref={legendRef}
            className="GroupedBarChart__legend"
            transform={`translate(${
              (dimensions.boundedWidth - legendWidth) / 2
            }, ${
              legendPosition === "top"
                ? -dimensions.marginTop
                : dimensions.height - extraMarginBottom
            })`}
          >
            {categories.map((category, index) => (
              <g
                key={category}
                transform={`translate(${index * 70}, 0)`}
                className="GroupedBarChart__legend-item"
              >
                <rect
                  width={12}
                  height={12}
                  fill={color(category)}
                  x={0}
                  y={0}
                />
                <text
                  x={16}
                  y={10}
                  fontSize="10px"
                  textAnchor="start"
                  alignmentBaseline="alphabetic"
                >
                  {category}
                </text>
              </g>
            ))}
          </g>
        )}
        <Axis
          dimension="y"
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
                const barHeight =
                  dimensions.boundedHeight - yScale(categoryData.value);

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
                // return (
   
                //   // <rect
                //   //   key={categoryData.category}
                //   //   className={`GroupedBarChart__bar ${categoryData.category}`}
                //   //   x={x(categoryData.category)}
                //   //   y={yScale(categoryData.value)}
                //   //   width={x.bandwidth()}
                //   //   height={Math.max(
                //   //     dimensions.boundedHeight - yScale(categoryData.value),
                //   //     0
                //   //   )}
                //   //   fill={color(categoryData.category)}
                //   // />
                // );
              })}
            </g>
          ))}
        </g>
        <Axis dimension="x" scale={fx} label={xLabel} />
      </Chart>
    </div>
  );
};

export default GroupedBarChart;
