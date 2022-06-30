import service from "./inedx";

// interface Ilogin {
//   username: string;
//   password: string;
// }

function makeRequest(url: string, method = "get") {
  return function () {
    return service({
      url,
      method,
    });
  };
}

const goods = makeRequest("/goods");
const login = makeRequest("/login", "post");
const userList = makeRequest("/getUser");
const roleList = makeRequest("/getRole");

export { goods, login, roleList, userList };
