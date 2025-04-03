import { StackedSeries } from "../../models/Chart";

interface AreaPathsProps {
  data: StackedSeries[];
  areaGenerator: (d: StackedSeries) => string | null;
  color: (key: string) => string;
  onHover: (key: string | null) => void;
  hoveredKey: string | null;
}

export const AreaPaths = ({
  data,
  areaGenerator,
  color,
  onHover,
  hoveredKey,
}: AreaPathsProps) => {
  return (
    <>
      {data.map((series) => (
        <path
          key={series.key}
          d={areaGenerator(series) ?? ""}
          fill={color(series.key)}
          opacity={hoveredKey === null || hoveredKey === series.key ? 0.9 : 0.3} 
          stroke={hoveredKey === series.key ? color(series.key) : "none"}
          strokeWidth={hoveredKey === series.key ? 2 : 0} 
          onMouseEnter={() => onHover(series.key)} 
          onMouseLeave={() => onHover(null)} 
          style={{ transition: "opacity 0.3s, stroke-width 0.3s" }}
        />
      ))}
    </>
  );
};