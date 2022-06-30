interface IruleForm {
  username: string;
  password: string;
}

export class LoginData {
  ruleForm: IruleForm = {
    username: "",
    password: "",
  };
}
