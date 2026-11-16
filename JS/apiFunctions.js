import { urlBase } from "./constants.js";

export async function allUsersAPI(){
    let users = await fetch(urlBase+"/usuarios/");
    if(!users.ok){
        throw new Error("Error in users requisition!");
    }
    let usersJSON = await users.json();
    return usersJSON;   
}

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

export async function userRegisterAPI(username, password, name, image){
    let bodyRequisition = {
        login: username,
        senha: password,
        nome: name,
        img: image
    };

    let op = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(bodyRequisition)
    }

    let requisition = await fetch(urlBase+"/usuarios/", op)
    if(!requisition.ok){
        throw new Error("Error in user register!");
    }
    return true;
}