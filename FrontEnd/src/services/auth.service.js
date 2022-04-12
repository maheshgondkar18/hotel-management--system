import axios from "axios";
const config = require("../common/config.json")

const API_URL = config.AuthUrl
const register = (firstName, lastName, email, password, userType) => {
    return axios.post(API_URL + "register", {
        "firstName":firstName,
        "lastName":lastName,
        "username":email,
        "password":password,
        "email":email,
        "roles":[userType]
    });
};
const login = (username, password) => {
    return axios
        .post(API_URL + "login", {
            username,
            password,
        })
        .then((response) => {
            if (response.data.accessToken) {
                localStorage.setItem("user", JSON.stringify(response.data));
            }
            return response.data;
        });
};
const logout = () => {
    localStorage.removeItem("user");
    window.location.reload()
};
const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem("user"));
};
export default {
    register,
    login,
    logout,
    getCurrentUser,
};