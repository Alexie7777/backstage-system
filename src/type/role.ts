export interface ListInt {
  roleName: string;
  roleID: number;
  authority: number[];
}

export class InitData {
  list: ListInt[] = [];
}
