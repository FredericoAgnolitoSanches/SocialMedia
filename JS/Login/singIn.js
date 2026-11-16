import { urlBase, loginForms, passwordLoginInput, usernameLoginInput } from "../constants";
import { userLoginAPI } from "../apiFunctions";
import { setUserToken } from "../authFunctions";
import { formLogin } from "../../../JSsite-main/js/constants";

async function userLogin(username, password){
    try{
        const user = await userLoginAPI(username, password);
        setUserToken(user);

        window.location.href = "../Feed/feed.html";
    }
    catch(error){
        document.querySelector("#LogErr")?.remove();
        let errorType = document.createElement("h2");
        errorType.innerText = error;
        errorType.id = "LogErr";
        loginForms.appendChild(errorType);
    }
}

formLogin.addEventListener("submit", (e) => {
    e.preventDefault();
    userLogin(usernameLoginInput.value, passwordLoginInput.value);
});
