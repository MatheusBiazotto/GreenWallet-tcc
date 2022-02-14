const endpoint = "https://gw-greenwallet-api.herokuapp.com/react";
const quotationEndpoint = "https://economia.awesomeapi.com.br/json/last";
const quotationDailyEndpoint = "https://economia.awesomeapi.com.br/json/daily";

let status, data;

let options = {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
};

let keepUpdate = false

let walletList = []

let quotationList = []

function HanddleLogout() {
  if (sessionStorage.getItem("gw@user") !== null) {
    sessionStorage.removeItem("gw@user");
  } else if (localStorage.getItem("gw@user") !== null) {
    localStorage.removeItem("gw@user");
  }

  window.location.replace("/login");
}

function Userdata() {
  return sessionStorage.getItem("gw@user") !== null
    ? JSON.parse(sessionStorage.getItem("gw@user"))
    : JSON.parse(localStorage.getItem("gw@user"));
}

const HanddleLoginSubmit = async (body, keep) => ((
  options.body = JSON.stringify(body),
  await fetch(`${endpoint}/login`, options)
    .then((response) => (((status = response.status), response.json())))
    .then((response) => {
      switch (status) {
        case 200:
          data = JSON.stringify({
            id: response.id,
            name: response.nome,
            surname: response.sobrenome,
            email: response.email,
            gender: response.sexo,
          });

          keep === false
            ? sessionStorage.setItem("gw@user", data)
            : localStorage.setItem("gw@user", data);

          window.location.replace("/dashboard/panel");
          break;

        case 203:
          alert(response.msg)
          return 203;

        default:
          alert("Erro desconhecido")
          return 0;
      }
    })
    .catch(() => alert("Erro desconhecido"))
));

const HanddleRegisterSubmit = async (body) => ((
  options.body = JSON.stringify(body),
  await fetch(`${endpoint}/register`, options)
    .then((response) => ((status = response.status, response.json())))
    .then((response) => {
      switch (status) {
        case 201:
          window.location.replace("/login");
          break;

        case 200:
          alert(response.msg)
          return 200;

        case 502:
          alert(response.msg)
          return 502;

        default:
          alert("Erro desconhecido")
          return 0;
      }
    })
    .catch(() =>  alert("Erro desconhecido"))
));

const HanddleConsultWalletSpentProfitSubmit = async (body) => ((
  options.body = JSON.stringify(body),
  walletList = [],
  await fetch(`${endpoint}/attbalance`, options)
    .then((response) => ((status = response.status, response.json())))
    .then((response) => {
      switch (status) {
        case 200:
          walletList.push(response)
          break

        case 502:
          return alert(response.msg)


        default:
          return alert("Erro desconhecido")
      }
    })
    .catch(() => alert("Erro desconhecido")),
    await fetch(`${endpoint}/consultspent`, options)
    .then((response) => ((status = response.status, response.json())))
    .then((response) => {
      switch (status) {
        case 200:
          walletList.push(response)
          break

        case 502:
          return alert(response.msg)

        default:
          return alert("Erro desconhecido")
      }
    })
    .catch(() => alert("Erro desconhecido")),
    await fetch(`${endpoint}/consultprofit`, options)
    .then((response) => ((status = response.status, response.json())))
    .then((response) => {
      switch (status) {
        case 200:
          walletList.push(response)
          return new Promise((resolve, reject) => {
            resolve(walletList)
          })

        case 502:
          return alert(response.msg)

        default:
          return alert("Erro desconhecido")
      }
    })
    .catch(() => alert("Erro desconhecido"))
));

const HanddleAnalyze = async (body) => ((
  options.body = JSON.stringify(body),
  await fetch(`${endpoint}/gethistory`, options)
    .then((response) => ((status = response.status, response.json())))
    .then((response) => {
      switch (status) {
        case 200:         
         return response.gastos

        case 502:
          return alert(response.msg)

        default:
          return alert("Erro desconhecido")
      }
    })
    .catch(() => alert("Erro desconhecido"))
))

const HanddleAddSpentSubmit = async (body) => ((
  options.body = JSON.stringify(body),
  await fetch(`${endpoint}/addspent`, options)
    .then((response) => ((status = response.status, response.json())))
    .then((response) => {
      switch (status) {
        case 201:
          return 201
        
        case 200:
          return alert(response.msg)

        case 502:
          return alert(response.msg)

        default:
          return alert("Erro desconhecido")
      }
    })
    .catch(() => alert("Erro desconhecido"))
));

const HanddleAddProfitSubmit = async (body) => ((
  options.body = JSON.stringify(body),
  await fetch(`${endpoint}/addprofit`, options)
    .then((response) => ((status = response.status, response.json())))
    .then((response) => {
      switch (status) {
        case 201:
          return 201
        
        case 200:
          return alert(response.msg)

        case 502:
          return alert(response.msg)

        default:
          return alert("Erro desconhecido")
      }
    })
    .catch(() => alert("Erro desconhecido"))
));


const HanddleRemoveSpentSubmit = async (body) => ((
  options.body = JSON.stringify(body),
  await fetch(`${endpoint}/delspent`, options)
    .then((response) => ((status = response.status, response.json())))
    .then((response) => {
      switch (status) {
        case 200:
          return 200

        case 502:
          return alert(response.msg)

        default:
          return alert("Erro desconhecido")
      }
    })
    .catch(() => alert("Erro desconhecido"))
));

const HanddleRemoveProfitSubmit = async (body) => ((
  options.body = JSON.stringify(body),
  await fetch(`${endpoint}/delprofit`, options)
    .then((response) => ((status = response.status, response.json())))
    .then((response) => {
      switch (status) {
        case 200:
          return 200

        case 502:
          return alert(response.msg)

        default:
          return alert("Erro desconhecido")
      }
    })
    .catch(() => alert("Erro desconhecido"))
));

const HanddleEditSpentSubmit = async (body) => ((
  options.body = JSON.stringify(body),
  await fetch(`${endpoint}/editspent`, options)
    .then((response) => ((status = response.status, response.json())))
    .then((response) => {
      switch (status) {
        case 200:
          return 200

        case 502:
          return alert(response.msg)

        default:
          return alert("Erro desconhecido")
      }
    })
    .catch(() => alert("Erro desconhecido"))
));

const HanddleEditProfitSubmit = async (body) => ((
  options.body = JSON.stringify(body),
  await fetch(`${endpoint}/editprofit`, options)
    .then((response) => ((status = response.status, response.json())))
    .then((response) => {
      switch (status) {
        case 200:
          return 200

        case 502:
          return alert(response.msg)

        default:
          return alert("Erro desconhecido")
      }
    })
    .catch(() => alert("Erro desconhecido"))
));

const HanddleAttLimitSubmit = async (body) => ((
  options.body = JSON.stringify(body),
  await fetch(`${endpoint}/user/attincome`, options)
    .then((response) => ((status = response.status, response.json())))
    .then((response) => {
      switch (status) {
        case 200:
          return 200

        case 502:
          return alert(response.msg)
        
        case 209:
          return alert(response.msg)

        default:
          return alert("Erro desconhecido")
      }
    })
    .catch(() => alert("Erro desconhecido"))
));

const HanddleAttEmail = async (body) => ((
  options.body = JSON.stringify(body),
  await fetch(`${endpoint}/user/attall`, options)
    .then((response) => ((status = response.status, response.json())))
    .then((response) => {
      switch (status) {
        case 200:
          data = JSON.stringify({
            id: Userdata().id,
            name: body.nome,
            surname: body.sobrenome,
            email: body.email,
            gender: body.img,
          });
          
          if (sessionStorage.getItem("gw@user") !== null) {
            sessionStorage.removeItem("gw@user");
            keepUpdate = false
          } else if (localStorage.getItem("gw@user") !== null) {
            localStorage.removeItem("gw@user");
            keepUpdate = true
          }
          
          keepUpdate === false
            ? sessionStorage.setItem("gw@user", data)
            : localStorage.setItem("gw@user", data);
          return 200
        
        case 202:
          return alert(response.msg)

        case 502:
          return alert(response.msg)
        
        case 209:
          return alert(response.msg)

        default:
          return alert("Erro desconhecido")
      }
    })
    .catch(() => alert("Erro desconhecido"))
));

const HanddleAttPassword = async (body) => ((
  options.body = JSON.stringify(body),
  await fetch(`${endpoint}/user/attpassword`, options)
    .then((response) => ((status = response.status, response.json())))
    .then((response) => {
      switch (status) {
        case 200:
          return 200
        
        case 202:
          return alert(response.msg)

        case 502:
          return alert(response.msg)
        
        case 209:
          return alert(response.msg)

        default:
          return alert("Erro desconhecido")
      }
    })
    .catch(() => alert("Erro desconhecido"))
));

const HanddleCoinQuotation = async (body) => ((
  quotationList = [],
  await fetch(`${quotationEndpoint}/${body.coin}`)
    .then((response) => ((status = response.status, response.json())))
    .then((response) => {
      switch (status) {
        case 200:
          quotationList[0] = Object.entries(response)[0][1]
          break
        
        case 404:
          return alert(response.message)

        default:
          return alert("Erro desconhecido")
      }
    })
    .catch(() => alert("Erro desconhecido")),
    await fetch(`${quotationDailyEndpoint}/${body.coin}/15`)
    .then((response) => ((status = response.status, response.json())))
    .then((response) => {
      switch (status) {
        case 200:
          let daily = []
          if (Object.keys(response).length > 0) {
            let n = Object.keys(response).length
            for (let x = 0; x < n; x++){
              daily.push({ ask: Number.parseFloat(response[x].ask), bid: Number.parseFloat(response[x].bid)})
            }
          } else {
            daily = []
          }

          quotationList[1] = daily
          
          return new Promise((resolve, reject) => {
            resolve(quotationList)
          })
        
        case 404:
          return alert(response.message)

        default:
          return alert("Erro desconhecido")
      }
    })
    .catch(() => alert("Erro desconhecido"))
  
));


export {
  HanddleLoginSubmit,
  HanddleRegisterSubmit,
  HanddleLogout,
  HanddleConsultWalletSpentProfitSubmit,
  HanddleAddSpentSubmit,
  HanddleAddProfitSubmit,
  HanddleRemoveSpentSubmit,
  HanddleRemoveProfitSubmit,
  HanddleEditSpentSubmit,
  HanddleEditProfitSubmit,
  HanddleAttLimitSubmit,
  HanddleAttEmail,
  HanddleAttPassword,
  HanddleCoinQuotation,
  HanddleAnalyze,
  Userdata
};
