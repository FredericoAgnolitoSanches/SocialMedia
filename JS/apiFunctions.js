import { urlBase } from "./constants";

export async function userLoginAPI(username, password){
    let bodyRequisition = {
        login: username,
        senha: password,
    };

    let op = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(bodyRequisition)
    };

    return fetch(urlBase+"/usuarios/login", op)
    .then((response) => {
        if(!response.ok){
            throw new Error(`${response.status}`);
        }
        return response.json();
    })
    .then((token) => {
        return token;
    })
    .catch((e) => {
        throw e;
    });
}