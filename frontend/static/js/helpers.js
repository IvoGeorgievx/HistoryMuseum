const API_GET_ROLE = "http://127.0.0.1:5000/profile/role";

export async function getProfileRole() {
	return await fetch(API_GET_ROLE, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
			Authorization: "Bearer " + localStorage.getItem("token"),
		},
	})
		.then((response) => response.json())
		.then((data) => {
			console.log(data);
		})
		.then((data) => {
			localStorage.setItem("role", data.role);
		})
		.catch((error) => console.log(error));
}
