import { API_URL } from "./config";

export const registerFech = async (data) => {
	const response = await fetch(`${API_URL}/auth/register`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(data),
	});
	const result = await response.json();

	if (response.status !== 201) throw result;
	return result;
};
