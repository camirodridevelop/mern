import { API_URL } from "./config";

export const getMeFetch = async (token) => {
	const response = await fetch(`${API_URL}/user/me`, {
		method: "GET",
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});
	const result = await response.json();

	if (response.status !== 200) throw result;
	return result;
};
