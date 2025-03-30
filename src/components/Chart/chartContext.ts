import { createContext } from 'react';
import { Dimensions } from "./utils"; 

export const ChartContext = createContext<Dimensions | undefined>(undefined);
