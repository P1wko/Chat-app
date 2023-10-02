"use strict";
const loginForm = document.querySelector("form");
const button = document.querySelector("#submit");
const loginInputElement = document.querySelector("#login");
const passwordInputElement = document.querySelector("#password");
const paragraphElement = document.querySelector("p");
let auth = false;
var user;
loginForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const credentials = {
        login: loginInputElement.value,
        password: passwordInputElement.value
    };
    try {
        const response = await fetch('http://127.0.0.1:3000/login', {
            method: 'POST',
            mode: "cors",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(credentials)
        });
        if (response.ok) {
            const data = await response.json();
            console.log(data);
            user = JSON.stringify(data.login);
            auth = true;
        }
    }
    catch (e) {
        console.log(e);
        auth = false;
    }
    if (auth) {
        location.href = './chat.html';
    }
    else {
        paragraphElement.innerText = 'Invalid login or password';
    }
});
