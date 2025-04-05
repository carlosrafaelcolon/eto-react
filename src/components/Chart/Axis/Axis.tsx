import React from "react";
import { ScaleLinear, ScaleTime } from "d3-scale";
import { AxisScale, AxisDomain } from "d3-axis";
import { Dimensions } from "../utils";
import { useDimensionsContext } from "../useDimensionsContext";

type AxisType = "x" | "y";

interface AxisProps {
  direction?: AxisType;
  scale: AxisScale<AxisDomain>;
  label?: string;
  formatTick: (d: any) => string;
  grid?: boolean;
  dash?: boolean;
  axisLine?: boolean;
  dimensions?: Dimensions;
  maxTicks?: number;
  tickDensity?: number;
  rotateThreshold?: number;
}
const Axis = ({
  direction = "x",
  formatTick = (d: any) => d.toString(),
  ...props
}: AxisProps) => {
  const dimensions = useDimensionsContext();

  const axisComponentsByDimension: Record<AxisType, React.FC<AxisProps>> = {
    x: AxisHorizontal,
    y: AxisVertical,
  };

  const Component = axisComponentsByDimension[direction];

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
  maxTicks,
  rotateThreshold = 40,
  ...props
}: AxisProps) {
  const boundedWidth = dimensions?.boundedWidth ?? 500;
  const boundedHeight = dimensions?.boundedHeight ?? 500;

  const isBandScale = "bandwidth" in scale;
  let ticks: any[];

  if (isBandScale) {
    ticks = scale.domain();
  } else {
    const tickDensity = 0.02;
    const defaultMaxTicks = boundedWidth < 500 ? 6 : 10;

    const effectiveMaxTicks = maxTicks ?? defaultMaxTicks;
    const computedTicks = Math.floor(boundedWidth * tickDensity);
    const numberOfTicks = Math.min(
      effectiveMaxTicks,
      Math.max(2, computedTicks)
    );
    ticks = (scale as ScaleLinear<number, number> | ScaleTime<number, number>).ticks(
      numberOfTicks
    );
    // Debug logging:
    // console.log("AxisHorizontal ticks", ticks);
  }


  const tickSpacing = ticks.length ? boundedWidth / ticks.length : 0;
  const shouldRotate = tickSpacing < rotateThreshold;

  return (
    <g
      className="Axis AxisHorizontal"
      transform={`translate(0, ${boundedHeight + 0.5})`}
      {...props}
    >
      {axisLine && (
        <line className="Axis__line" x2={boundedWidth} stroke="currentColor" />
      )}

      {ticks.map((tick, index) => {
        const tickPosition = isBandScale
          ? (scale as any)(tick) + (scale as any).bandwidth() / 2
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
              textAnchor={shouldRotate ? "end" : "middle"}
              fontSize="10px"
              transform={shouldRotate ? "rotate(-45)" : undefined}
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
  maxTicks = 10,
  ...props
}: AxisProps) {
  const boundedHeight = dimensions?.boundedHeight ?? 500;
  const boundedWidth = dimensions?.boundedWidth ?? 500;
  const tickDensity = 0.02;
  if (!("ticks" in scale)) {
    console.error("The provided scale does not support the 'ticks' method.");
    return null;
  }

  const typedScale = scale as ScaleLinear<number, number> | ScaleTime<number, number>;
  const computedTicks = Math.floor(boundedHeight * tickDensity);
  const numberOfTicks = Math.min(maxTicks, Math.max(2, computedTicks));
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
          {grid && tick !== 0 && (
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
            transform: `translate(-50px, ${boundedHeight / 2}px) rotate(-90deg)`,
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
