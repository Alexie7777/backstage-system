import service from "./inedx";

interface Ilogin {
  username: string;
  password: string;
}

function makeRequest(url: string, method: string = "get") {
  return function () {
    return service({
      url,
      method,
    });
  };
}

const goods = makeRequest("/goods");
const roleList = makeRequest("/getRole");
const userList = makeRequest("/getUser");
function login(data: Ilogin) {
  return service({
    url: "/login",
    method: "post",
    data,
    params: {
      ...data,
    },
  });
}

// function userList() {
//   return service({
//     url: "/getUser/",
//     method: "get",
//   });
// }

export { goods, login, roleList, userList };
