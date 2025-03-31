import { Series } from 'd3-shape';

export type StackedDatum = [Date, Record<string, number>];
export type StackedSeries = Series<StackedDatum, string>;