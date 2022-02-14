export const session = sessionStorage.getItem("gw@user");
export const local = localStorage.getItem("gw@user");

const isLogged = () => {
  if (local !== null ||  session !== null //melhorar autenticacao
  ) {
    if (typeof local === "object" || typeof session === "object") {
      return true;
    }
  } else {
    return false;
  }
};

export default isLogged;
