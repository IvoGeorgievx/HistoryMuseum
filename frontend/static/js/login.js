import { getProfileRole } from "./helpers.js";

const MAIN_API_URL = "http://127.0.0.1:5000";
const API_URL = "http://127.0.0.1:5000/login";

const usernameInput = document.querySelector("input[name='username']");
const passwordInput = document.querySelector("input[name='password']");
const loginButton = document.querySelector(".login-submit");

loginButton.addEventListener("click", login);

async function login(e) {
	e.preventDefault();

	const response = await fetch(API_URL, {
		method: "POST",
		body: JSON.stringify({
			username: usernameInput.value,
			password: passwordInput.value,
		}),
		headers: {
			"Content-Type": "application/json",
		},
	}).catch((error) => console.log(error));

	if (response.status === 200) {
		await response.json().then((data) => {
			console.log(data);
			if (data.token) {
				localStorage.setItem("token", data.token);
			}
		});
		await getProfileRole().then(() => {
			window.location.href = MAIN_API_URL;
			// createProfileMenu();
		});
	} else {
		await response
			.json()
			.then((data) => {
				alert(data.message);
			})
			.catch((error) => console.log(error));
	}
}
