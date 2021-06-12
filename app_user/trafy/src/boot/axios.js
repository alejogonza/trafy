import axios from "axios";
const axiosInstance = axios.create({
  baseURL: "https://094439028b52.ngrok.io/api/v1"
});
export default ({ Vue }) => {
  Vue.prototype.$axios = axiosInstance;
};
export { axiosInstance };
