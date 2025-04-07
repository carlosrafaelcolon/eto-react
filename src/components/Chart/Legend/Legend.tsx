import { useLayoutEffect, useRef, useState } from "react";
import { useDimensionsContext } from "../useDimensionsContext";
import { schemeSpectral } from "d3-scale-chromatic";
import { scaleOrdinal } from "d3-scale";
interface LegendProps {
  legendPosition?: "top" | "bottom";
  categories: string[];
  colors?: string[] | Record<string, string>;
}
// TODO: Pass over colorScale to the legend
const Legend = ({
  categories,
  colors,
  legendPosition = "top",
}: LegendProps) => {
  const legendRef = useRef<SVGGElement>(null);
  const [legendWidth, setLegendWidth] = useState(0);
  const [legendHeight, setLegendHeight] = useState(0);
  const dimensions = useDimensionsContext();
  const boundedWidth = dimensions?.boundedWidth ?? 500;
  const dimensionHeight = dimensions?.height ?? 500;

  useLayoutEffect(() => {
    if (legendRef.current) {
      const { width, height } = legendRef.current.getBBox();
      setLegendWidth(width);
      setLegendHeight(height);
    }
  }, [categories, dimensions]);
  
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

  return (
    <g
      ref={legendRef}
      className="Legend"
      transform={`translate(${(boundedWidth - legendWidth) / 2}, ${
        legendPosition === "top"
          ? -(legendHeight + 20)
          : (dimensionHeight - legendHeight)
      })`}
    >
      {categories.map((category, index) => (
        <g
          key={category}
          transform={`translate(${index * 70}, 0)`}
          className="Legend-item"
        >
          <rect width={12} height={12} fill={color(category)} x={0} y={0} />
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
  );
};

export default Legend;
