import makeAxiosRequest from "../utils/makeAxiosRequest";

const userActions = {
    fetchToken: async () => {
        try {
            const token = await makeAxiosRequest("get", "auth-check");
            return token;
        } catch (error) {
            console.error(error);
        }
    },
    logIn: async (token, username, password) => {
        try {
            const data = await makeAxiosRequest(
                "post",
                "login",
                token,
                { user: { username, password } }
            );
            return data;
        } catch (error) {
            console.error(error);
        }
    },
    logOut: async (token) => {
        try {
            const data = await makeAxiosRequest("delete", "logout", token, null);
            return data;
        } catch (error) {
            console.error(error);
        }
    },
};

export default userActions;