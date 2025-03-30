
import { useContext } from "react";
import { Dimensions } from "./utils";
import { ChartContext } from "./chartContext"; 

export const useDimensionsContext = (): Dimensions => {
  const context = useContext(ChartContext);
  if (!context) {
    throw new Error("useDimensionsContext must be used within a <Chart />");
  }
  return context;
};
