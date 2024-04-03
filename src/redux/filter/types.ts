export enum SortPropertyEnum {
  RATING_DESC = "rating",
  TITLE_DESC = "title",
  PRICE_DESC = "price",
  RATING_ASC = "-rating",
  TITLE_ASC = "-title",
  PRICE_ASC = "-price",
}

export type Sort = {
  name: string;
  sortProperty: "rating" | "title" | "price" | "-rating" | "-title" | "-price";
};

export interface FilterSliceState {
  pageCurrent: number;
  categoryId: number;
  sortTypeObj: Sort;
  searchValue: string;
}
