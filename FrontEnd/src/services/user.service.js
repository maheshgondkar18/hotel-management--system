import axios from "axios";
import authHeader from "./auth-header";
const url = require("../common/config.json")

const API_URL = url.Authurl;
const getPublicContent = () => {
  return axios.get(API_URL + "all");
};
const getOwnerHome = () => {
  console.log(axios.get(API_URL + "owner", { headers: authHeader() }))
  return axios.get(API_URL + "owner", { headers: authHeader() });
};
const getManagerHome = () => {
  return axios.get(API_URL + "manager", { headers: authHeader() });
};
const getReceptionistHome = () => {
  return axios.get(API_URL + "receptionist", { headers: authHeader() });
};
export default {
  getPublicContent,
  getOwnerHome,
  getManagerHome,
  getReceptionistHome,
};