export const registerFech = async (data) => {
    try{
        const url =" http://localhost:3977/api/v1//auth/register";

        const params = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        };

        const response = await fetch(url, params);
        const result = await response.json();
       
        if(response.status !== 201) throw result;
        return result;
    } catch(error) {
        throw error;
    }
};