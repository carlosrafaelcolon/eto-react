import React from "react";
import {
  line as d3Line,
  Line as D3LineType,
  area as d3Area,
  Area as D3AreaType,
  CurveFactory,
  CurveFactoryLineOnly,
} from "d3-shape";
import { curveMonotoneX } from "d3-shape";

type LineType = "line" | "area";

type AccessorFn<T> = (d: T, i: number) => number;

interface LineProps<T> extends React.SVGProps<SVGPathElement> {
  type?: LineType;
  data: T[];
  className?: string;
  xAccessor: AccessorFn<T>;
  yAccessor: AccessorFn<T>;
  y0Accessor?: AccessorFn<T> | number;
  interpolation?: CurveFactory | CurveFactoryLineOnly;
  dashedYears?: number[];
  yearAccessor?: AccessorFn<T>;
}

const Line = <T,>({
  type = "line",
  data,
  xAccessor,
  yAccessor,
  y0Accessor = () => 0,
  interpolation = curveMonotoneX,
  className: appliedClassName,
  dashedYears = [],
  yearAccessor,
  ...props
}: LineProps<T>) => {
  let pathGenerator: D3LineType<T> | D3AreaType<T>;

  if (type === "area") {
    pathGenerator = d3Area<T>()
      .x(xAccessor)
      .y0(typeof y0Accessor === "function" ? y0Accessor : () => y0Accessor)
      .y1(yAccessor)
      .curve(interpolation as CurveFactory);
  } else {
    pathGenerator = d3Line<T>().x(xAccessor).y(yAccessor).curve(interpolation);
  }


  const fullPathData = pathGenerator(data) ?? "";
  const fullLine = (
    <path
      {...props}
      className={appliedClassName}
      d={fullPathData}
      fill={type === "area" ? undefined : "none"}
    />
  );


  let dashedOverlays: React.ReactNode = null;
  if (type === "line" && yearAccessor && dashedYears.length > 0) {
    const dashedSegments: T[][] = [];
    let currentSegment: T[] = [];

    data.forEach((d, i) => {
      const year = yearAccessor(d, i);
      if (dashedYears.includes(year)) {
        currentSegment.push(d);
      } else {
        if (currentSegment.length > 0) {
          dashedSegments.push(currentSegment);
          currentSegment = [];
        }
      }
    });
    if (currentSegment.length > 0) {
      dashedSegments.push(currentSegment);
    }

    dashedOverlays = (
      <>
        {dashedSegments.map((segment, idx) => {
          const segmentPathData = pathGenerator(segment) ?? "";
          return (
            <path
              key={`dashed-${idx}`}
              d={segmentPathData}
              fill="none"
              strokeDasharray="4 4"
              {...props}
              className={appliedClassName}
            />
          );
        })}
      </>
    );
  }

  return (
    <>
      {fullLine}
      {dashedOverlays}
    </>
  );
};

export default Line;
