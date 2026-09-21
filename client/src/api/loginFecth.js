import { API_URL } from "./config";

export const loginFech = async (data) => {
	const response = await fetch(`${API_URL}/auth/login`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(data),
	});
	const result = await response.json();

	if (response.status !== 200) throw result;
	return result;
};
