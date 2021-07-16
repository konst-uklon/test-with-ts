import { ValuesType } from '../../appTypes/appTypes';

// interfaces
export interface RenderArrItemType {
  firstItemName: string;
  firstItemIsMore: ValuesType;
  secondItemName: string;
  id: string;
}
// types
export type RenderArrType = RenderArrItemType[];
