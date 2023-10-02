"use strict";
const loginElement = document.querySelector('#login');
const passwordElement = document.querySelector('#password');
const confPasswordElement = document.querySelector('#confPassword');
const errorElement = document.querySelector('#error');
const formElement = document.querySelector('form');
formElement.addEventListener('submit', async (event) => {
    event.preventDefault();
    if (passwordElement.value === confPasswordElement.value) {
        const credentials = {
            login: loginElement.value,
            password: passwordElement.value
        };
        try {
            const response = await fetch('http://127.0.0.1:3000/register', {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(credentials)
            });
            if (response.status == 200) {
                errorElement.innerText = 'Account created!';
            }
        }
        catch (e) {
            errorElement.innerText = 'Error creating account';
        }
    }
    else {
        errorElement.innerText = 'Passwords has to be the same';
    }
});
