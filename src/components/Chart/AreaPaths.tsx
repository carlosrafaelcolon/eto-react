import {  StackedSeries } from "../../models/Chart";


interface AreaPathsProps {
  data: StackedSeries[];
  areaGenerator: (d: StackedSeries) => string | null;
  color: (key: string) => string;
}

export const AreaPaths = ({ data, areaGenerator, color }: AreaPathsProps) => {
  return (
    <>
      {data.map((series) => (
        <path
          key={series.key}
          d={areaGenerator(series) ?? ""}
          fill={color(series.key)}
          opacity={0.9}
        />
      ))}
    </>
  );
};
