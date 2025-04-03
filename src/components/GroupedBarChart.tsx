/** @jsxImportSource @emotion/react */
import { useLayoutEffect, useRef, useState } from "react";

import { useChartDimensions } from "./Chart/utils";
import { schemeSpectral } from "d3-scale-chromatic";
import { scaleLinear, scaleBand, scaleOrdinal } from "d3-scale";

import { max as d3Max } from "d3-array";

import Chart from "./Chart/Chart";
import Axis from "./Chart/Axis";

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
  const [ref, dimensions] = useChartDimensions({
    marginTop: legend && legendPosition === "top" ? 30 : 10,
    marginLeft: 60,
    marginBottom: legend && legendPosition === "bottom" ? 60 : 30,
    height: 400,
  });
  const legendRef = useRef<SVGGElement>(null);
  const [legendWidth, setLegendWidth] = useState(0);

  const years = Array.from(new Set(data.map((d) => d.year)));
  const categories = Array.from(
    new Set(data.flatMap((d) => d.categories.map((c) => c.category)))
  );

  useLayoutEffect(() => {
    if (legendRef.current) {
      const { width } = legendRef.current.getBBox();
      setLegendWidth(width);
    }
  }, [categories]);

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
                : dimensions.height - 5
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
        <Axis dimension="x" scale={fx} label={xLabel} axisLine={false} />

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
              {yearData.categories.map((categoryData) => (
                <rect
                  key={categoryData.category}
                  className={`GroupedBarChart__bar ${categoryData.category}`}
                  x={x(categoryData.category)}
                  y={yScale(categoryData.value)}
                  width={x.bandwidth()}
                  height={dimensions.boundedHeight - yScale(categoryData.value)}
                  fill={color(categoryData.category)}
                />
              ))}
            </g>
          ))}
        </g>
      </Chart>
    </div>
  );
};

export default GroupedBarChart;
