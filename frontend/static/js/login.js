const API_URL = 'http://127.0.0.1:5000/login'

const usernameInput = document.querySelector("input[name='username']");
const passwordInput = document.querySelector("input[name='password']");
const loginButton = document.querySelector(".login-submit");

loginButton.addEventListener("click", login);

async function login(e) {
    e.preventDefault()

    const response = await fetch(API_URL, {
        method: 'POST',
        body: JSON.stringify({
            username: usernameInput.value,
            password: passwordInput.value
        }),
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + localStorage.getItem('token')
        }
    }).catch(error => console.log(error))

    const data = await response.json().then(data => {
        if (data.token) {
            localStorage.setItem('token', data.token)
            window.location.href = 'http://127.0.0.1:5000'
        }
    })

}