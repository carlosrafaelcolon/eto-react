import { Series } from 'd3-shape';


export type YearlyActivityDatum = {
  date: string;
  Enacted: number;
  Proposed: number;
  Defunct: number;
};
export type YearlyActivityData = Array<YearlyActivityDatum>;


export type StackedDatum = [Date, Record<string, number>];
export type StackedSeries = Series<StackedDatum, string>;