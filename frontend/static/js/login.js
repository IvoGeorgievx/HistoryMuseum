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
			if (data.token) {
				localStorage.setItem("token", data.token);
				window.location.href = "http://127.0.0.1:5000";
			}

			console.log(showLoggedInDiv, hideLoggedOutDiv);
		});
		await fetch(API_GET_ROLE, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				Authorization: "Bearer " + data.token,
			},
		})
			.then((response) => response.json())
			.then((data) => {
				localStorage.setItem("role", data.role);
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
