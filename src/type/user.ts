export interface ListInt {
  id: number;
  nickName: string;
  userName: string;
  roleID: number[];
  roleName: string[];
}

interface SelectedDataInt {
  roleID: number;
  userName: string;
}

interface RoleListInt {
  authority: number[];
  roleID: number;
  roleName: string;
}

interface ActiveObjInt {
  id: number;
  userName: string;
  roleID: number[];
}

export class InitData {
  selectedData: SelectedDataInt = {
    userName: "",
    roleID: 0,
  };
  list: ListInt[] = [];
  roleList: RoleListInt[] = [];
  isShow = false;
  isLoading: boolean = true;
  isCancle = false;
  activeObj: ActiveObjInt = {
    id: 0,
    userName: "",
    roleID: [],
  };
}
