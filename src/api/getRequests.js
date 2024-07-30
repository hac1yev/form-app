import axios from "axios";

export const getAxios = async (baseUrl, token) => {
    try {
        const response = await axios.get(`${baseUrl}`, {
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json",
            }
        });
        return response;
    } catch (error) {
        console.log(error);
    }
};