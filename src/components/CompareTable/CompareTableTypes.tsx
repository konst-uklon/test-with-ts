export type RenderArrItemType = {
  firstItemName: string;
  firstItemIsMore: boolean;
  secondItemName: string;
  id: string;
};

export type RenderArrType = RenderArrItemType[];

export type UserItemType = {
  name: string;
  value: (boolean | null)[];
};

export type UserItemsArrType = UserItemType[];
