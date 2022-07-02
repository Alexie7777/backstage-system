export interface ListInt {
  id: number;
  title: string;
  introduce: string;
  userID: number;
}

export interface selectDataInt {
  title: string;
  introduce: string;
  page: number;
  pageSize: number;
  count: number;
}

export class InitData {
  selectData: selectDataInt = {
    title: "",
    introduce: "",
    page: 1,
    pageSize: 5,
    count: 0,
  };
  list: ListInt[] = [];
  isLoading: boolean = true;
}
