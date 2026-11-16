import { nameInput, photoInput, initials, previewName, profileImage, registerForms, usernameInput, passwordInput } from "../constants.js";
import { allUsersAPI, userRegisterAPI } from "../apiFunctions.js";


let photoRequest = 0;
let photoTimer;

// Show de initials in the profile image
function updateNamePreview() {
    const name = nameInput.value.trim();
    const words = name.split(/\s+/).filter(Boolean);
    initials.textContent = words.slice(0, 2)
        .map(word => Array.from(word)[0]).join('').toLocaleUpperCase() || '?';
    previewName.textContent = name || 'Your name';
}

// Show profile image in the circle on sing up
function updatePhotoPreview() {
    clearTimeout(photoTimer);
    const request = ++photoRequest;
    profileImage.hidden = true;
    profileImage.removeAttribute('src');
    const value = photoInput.value.trim();

    // Only load web image URLs; keep the initials for empty or invalid values.
    try {
        const url = new URL(value);
        if (!['https:', 'http:'].includes(url.protocol)) return;
    } catch {
        return;
    }

    photoTimer = setTimeout(() => {
        const image = new Image();
        image.referrerPolicy = 'no-referrer';
        image.onload = () => {
            if (request !== photoRequest) return;
            profileImage.src = image.src;
            profileImage.hidden = false;
        };
        image.src = value;
    }, 300);
}

async function singUpUser(username, password, name, image){
    let check = 0;
    let users = await allUsersAPI();
    for(let user of users){
        if(user.login == username){
            document.querySelector("#LogErr")?.remove();
            document.querySelector("#sucessReg")?.remove();
            let errorType = document.createElement("h2");
            errorType.innerText = "Username already used";
            errorType.id = "LogErr";
            registerForms.appendChild(errorType);
            check++;
        }
        if(user.login != username && user.name == name){
            document.querySelector("#LogErr")?.remove();
            document.querySelector("#sucessReg")?.remove();
            let errorType = document.createElement("h2");
            errorType.innerText = "Name already used";
            errorType.id = "LogErr";
            registerForms.appendChild(errorType);
            check++;
        }
    }

    if(!check){
        try{
            let register = await userRegisterAPI(username, password, name, image);
            document.querySelector("#LogErr")?.remove();
            document.querySelector("#sucessReg")?.remove();
            let sucessfull = document.createElement("h2");
            sucessfull.innerText = "Successfully registered";
            sucessfull.id = "sucessReg";
            registerForms.appendChild(sucessfull);
            window.location.href = "./singin.html";
        }
        catch(error){
            document.querySelector("#LogErr")?.remove();
            document.querySelector("#sucessReg")?.remove();
            let errorType = document.createElement("h2");
            errorType.innerText = error;
            errorType.id = "LogErr";
            registerForms.appendChild(errorType);
        };
    }
}

profileImage.addEventListener('error', () => {
    profileImage.hidden = true;
});
nameInput.addEventListener('input', updateNamePreview);
photoInput.addEventListener('input', updatePhotoPreview);
nameInput.form.addEventListener('reset', () => {
    setTimeout(() => {
        updateNamePreview();
        updatePhotoPreview();
    }, 0);
});
registerForms.addEventListener("submit", (e) => {
    e.preventDefault();
    singUpUser(usernameInput.value, passwordInput.value, nameInput.value, photoInput.value);
})
updateNamePreview();
updatePhotoPreview();
