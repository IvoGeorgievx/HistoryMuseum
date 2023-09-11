const API_URL = 'http://127.0.0.1:5000/login'

document.addEventListener("DOMContentLoaded", function () {
    const token = localStorage.getItem('token');
    const showLoggedInDiv = document.querySelector('.auth-nav-logged-in');
    const hideLoggedOutDiv = document.querySelector('.auth-nav-logged-out');

    if (token) {
        showLoggedInDiv.style.display = 'block';
        hideLoggedOutDiv.style.display = 'none';
    } else {
        showLoggedInDiv.style.display = 'none';
        hideLoggedOutDiv.style.display = 'block';
    }
});


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
            // Authorization: 'Bearer ' + localStorage.getItem('token')
        }
    }).catch(error => console.log(error))

    if (response.status === 200) {
        await response.json().then(data => {
            if (data.token) {
                localStorage.setItem('token', data.token)
                window.location.href = 'http://127.0.0.1:5000'
            }

            console.log(showLoggedInDiv, hideLoggedOutDiv)
        }).catch(error => console.log(error))
    } else {
        await response.json().then(data => {
            alert(data.message)
        }).catch(error => console.log(error))
    }
}

