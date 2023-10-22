const API_GET_ROLE = "http://127.0.0.1:5000/profile/role";

export async function getProfileRole() {
	try {
		const response = await fetch(API_GET_ROLE, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				Authorization: "Bearer " + localStorage.getItem("token"),
			},
		});

		if (response.status === 200) {
			const data = await response.json();

			localStorage.setItem("role", data.role); // Store the role in localStorage.
		} else {
			console.log("Failed to retrieve the user role");
		}
	} catch (error) {
		console.log(error);
	}
}

export function createElement(type, content, classes, id, parent) {
	const element = document.createElement(type);

	if (content) {
		element.textContent = content;
	}

	if (classes && classes.length > 0) {
		element.classList.add(...classes);
	}

	if (id) {
		element.setAttribute("id", id);
	}

	if (parent) {
		parent.appendChild(element);
	}
	return element;
}

export function createProfileMenu() {
	let profile = localStorage.getItem("role");

	const profileOptions = [
		"Profile",
		"My Company",
		"My Ads",
		"Edit Profile",
		"Logout",
	]
		? profile === "company"
		: ["Profile", "Ads", "Applications", "Edit Profile", "Logout"];

	profileOptions.forEach((option) => {
		const li = createElement("li", option, [], "", userDropDownMenu);
		if (option === "Logout") {
			createElement("a", "", [], "logout-btn", li);
		} else {
			createElement("a", "", [], "", li);
		}
	});
}
