import React, { useRef, useEffect } from "react";
import {select} from "d3-selection";
import { axisBottom, axisLeft } from "d3-axis";
import "d3-transition";
import { useDimensionsContext } from "./useDimensionsContext";
import { Dimensions } from "./utils";

interface AxisProps {
  dimension?: "x" | "y";
  scale: d3.AxisScale<d3.AxisDomain>;
  formatTick?: (d: any) => string;
  [key: string]: any; 
}

const Axis: React.FC<AxisProps> = ({
  dimension = "x",
  scale,
  formatTick,
  ...props
}) => {
  const dimensions: Dimensions = useDimensionsContext();
  const ref = useRef<SVGGElement | null>(null);

  useEffect(() => {
    if (!ref.current) return;

    const axisGenerator =
      dimension === "x"
        ? axisBottom(scale)
        : axisLeft(scale);

    if (formatTick) {
      axisGenerator.tickFormat(formatTick as any); 
    }

    select(ref.current)
      .transition()
      .call(axisGenerator);
  }, [dimension, scale, formatTick]);

  return (
    <g
      ref={ref}
      transform={
        dimension === "x"
          ? `translate(0, ${dimensions.boundedHeight})`
          : undefined
      }
      {...props}
    />
  );
};

export default Axis;
