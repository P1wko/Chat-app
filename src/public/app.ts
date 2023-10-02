    const loginForm:HTMLElement = document.querySelector("form")!
    const button:HTMLButtonElement = document.querySelector("#submit")!;
    const loginInputElement:HTMLInputElement = document.querySelector("#login")!;
    const passwordInputElement:HTMLInputElement = document.querySelector("#password")!;
    const paragraphElement:HTMLElement = document.querySelector("p")!;
    let auth:boolean = false;
    var user:string;
    
    loginForm.addEventListener('submit', async (event: Event) => {
        event.preventDefault();
        const credentials: { login: string, password: string} = {
            login: loginInputElement.value,
            password: passwordInputElement.value
        }

        try {
            const response = await fetch('http://127.0.0.1:3000/login', {
                method: 'POST',
                mode: "cors",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(credentials)
            })
            if(response.ok) {
                const data = await response.json();
                console.log(data);
                user = JSON.stringify(data.login);
                auth = true;
            }
        } catch (e) {
            console.log(e);
            auth = false;
        }

        if(auth) {
            location.href = './chat.html';
        } else {
            paragraphElement.innerText = 'Invalid login or password';
        }

    })