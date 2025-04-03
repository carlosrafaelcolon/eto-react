import React from "react";
import { ScaleLinear, ScaleTime } from "d3-scale";
import { AxisScale, AxisDomain } from "d3-axis";
import { Dimensions } from "./utils";
import { useDimensionsContext } from "./useDimensionsContext";

type Dimension = "x" | "y";

interface AxisProps {
  dimension?: Dimension;
  scale: AxisScale<AxisDomain>;
  label?: string;
  formatTick?: (d: any) => string;
  grid?: boolean;
  dash?: boolean;
  axisLine?: boolean;
}

interface AxisComponentProps {
  dimensions: Dimensions;
  scale: AxisScale<AxisDomain>;
  label?: string;
  formatTick: (d: any) => string;
  grid?: boolean;
  dash?: boolean;
  axisLine?: boolean;
}

const Axis = ({
  dimension = "x",
  formatTick = (d: any) => d.toString(),
  ...props
}: AxisProps) => {
  const dimensions = useDimensionsContext();

  const axisComponentsByDimension: Record<
    Dimension,
    React.FC<AxisComponentProps>
  > = {
    x: AxisHorizontal,
    y: AxisVertical,
  };

  const Component = axisComponentsByDimension[dimension];

  return (
    <Component dimensions={dimensions} formatTick={formatTick} {...props} />
  );
};

export default Axis;
function AxisHorizontal({
  dimensions,
  label,
  formatTick,
  scale,
  grid = false,
  dash = false,
  axisLine = true,
  ...props
}: AxisComponentProps & { dash?: boolean }) {
  const boundedWidth = dimensions.boundedWidth ?? 0;
  const boundedHeight = dimensions.boundedHeight ?? 0;

 
  const isBandScale = "bandwidth" in scale;


  const ticks = isBandScale
    ? scale.domain() 
    : (scale as ScaleLinear<number, number> | ScaleTime<number, number>).ticks(
        Math.min(10, Math.max(2, Math.floor(boundedWidth * 0.1)))
      );

  return (
    <g
      className="Axis AxisHorizontal"
      transform={`translate(0, ${boundedHeight})`}
      {...props}
    >
      {axisLine && (
        <line className="Axis__line" x2={boundedWidth} stroke="currentColor" />
      )}

      {ticks.map((tick, index) => {
        const tickPosition = isBandScale
          ? (scale as any)(tick)! + (scale as any).bandwidth() / 2 // Center tick for scaleBand
          : (scale as any)(tick);

        return (
          <g
            className="Axis__tick"
            key={tick.toString()}
            transform={`translate(${tickPosition}, 0)`}
          >
            {grid && index !== 0 && index !== ticks.length - 1 && (
              <line
                className="Axis__tick__gridline"
                stroke="currentColor"
                strokeOpacity={0.1}
                y2={-boundedHeight}
                strokeDasharray={dash ? "4 4" : undefined}
              />
            )}
            <line className="Axis__tick__line" stroke="currentColor" y2="6" />
            <text
              className="Axis__tick__text"
              y="9"
              dy="0.71em"
              textAnchor="middle"
              fontSize="10px"
            >
              {formatTick(tick)}
            </text>
          </g>
        );
      })}

      {label && (
        <text
          className="Axis__label"
          transform={`translate(${boundedWidth / 2}, 50)`}
          fontSize="12px"
          textAnchor="middle"
        >
          {label}
        </text>
      )}
    </g>
  );
}

function AxisVertical({
  dimensions,
  label,
  formatTick,
  scale,
  grid = false,
  dash = false,
  axisLine = true,
  ...props
}: AxisComponentProps & { dash?: boolean }) {
  const boundedHeight = dimensions.boundedHeight ?? 0;
  const boundedWidth = dimensions.boundedWidth ?? 0;

  if (!("ticks" in scale)) {
    console.error("The provided scale does not support the 'ticks' method.");
    return null;
  }

  const typedScale = scale as
    | ScaleLinear<number, number>
    | ScaleTime<number, number>;

  const tickDensity = 0.1;
  const numberOfTicks = Math.min(
    10,
    Math.max(2, Math.floor(boundedHeight * tickDensity))
  );

  const ticks = typedScale.ticks(numberOfTicks);

  return (
    <g className="Axis AxisVertical" {...props}>
      {axisLine && (
        <line className="Axis__line" y2={boundedHeight} stroke="currentColor" />
      )}

      {ticks.map((tick) => (
        <g
          key={tick.toString()}
          className="Axis__tick"
          transform={`translate(0, ${typedScale(tick)})`}
        >
          {grid && (
            <line
              className="Axis__tick__gridline"
              stroke="currentColor"
              strokeOpacity={0.1}
              x2={boundedWidth} 
              strokeDasharray={dash ? "4 4" : undefined} 
            />
          )}
          <line className="Axis__tick__line" stroke="currentColor" x2="-6" />
          <text
            className="Axis__tick__text"
            x="-9"
            dy="0.32em"
            textAnchor="end"
            fontSize="10px"
          >
            {formatTick(tick)}
          </text>
        </g>
      ))}

      {label && (
        <text
          className="Axis__label"
          style={{
            transform: `translate(-50px, ${
              boundedHeight / 2
            }px) rotate(-90deg)`,
            textAnchor: "middle",
          }}
          fontSize="12px"
        >
          {label}
        </text>
      )}
    </g>
  );
}
