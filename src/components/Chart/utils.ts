import { useEffect, useState, useRef, RefObject, useMemo } from "react";
import ResizeObserver from "resize-observer-polyfill";


export type Accessor<D> = ((d: D, i: number) => number) | number;

export function callAccessor<D>(accessor: Accessor<D>, d: D, i: number): number {
  return typeof accessor === "function" ? accessor(d, i) : accessor;
}


export interface Dimensions {
  width?: number;
  height?: number;
  marginTop?: number;
  marginRight?: number;
  marginBottom?: number;
  marginLeft?: number;
  boundedHeight?: number;
  boundedWidth?: number;
}

export function combineChartDimensions(dimensions: Dimensions): Dimensions {
  const parsed = {
    marginTop: 40,
    marginRight: 30,
    marginBottom: 40,
    marginLeft: 75,
    ...dimensions,
  };

  return {
    ...parsed,
    boundedHeight: Math.max(
      (parsed.height || 0) - parsed.marginTop - parsed.marginBottom,
      0
    ),
    boundedWidth: Math.max(
      (parsed.width || 0) - parsed.marginLeft - parsed.marginRight,
      0
    ),
  };
}


export function useChartDimensions(
  passedSettings: Partial<Dimensions> = {}
): [React.RefObject<HTMLDivElement| null>, Dimensions] {
  const ref = useRef<HTMLDivElement >(null);

  // Default the height to 500 if not provided.
  const defaultSettings = { height: 500, ...passedSettings };

  const isWidthControlled = typeof defaultSettings.width !== "undefined";
  const isHeightControlled = typeof defaultSettings.height !== "undefined";

  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    // If both dimensions are controlled, skip the observer.
    if (isWidthControlled && isHeightControlled) return;
    const element = ref.current;
    if (!element) return;
  
    const resizeObserver = new ResizeObserver((entries) => {
      if (!Array.isArray(entries) || entries.length === 0) return;
      const entry = entries[0];
      // Update state unconditionally (React won't re-render if value hasn't changed)
      if (!isWidthControlled) {
        setWidth(entry.contentRect.width);
      }
      if (!isHeightControlled) {
        setHeight(entry.contentRect.height);
      }
    });
  
    resizeObserver.observe(element);
    return () => resizeObserver.disconnect();
  }, [isWidthControlled, isHeightControlled]);

  const finalDimensions = combineChartDimensions({
    ...defaultSettings,
    width: isWidthControlled ? defaultSettings.width : width,
    height: isHeightControlled ? defaultSettings.height : height,
  });

  return [ref, finalDimensions];
}




let lastId = 0;
export function useUniqueId(prefix = ""): string {
  lastId++;
  return `${prefix}-${lastId}`;
}
