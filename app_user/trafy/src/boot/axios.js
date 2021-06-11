import axios from "axios";
const axiosInstance = axios.create({
  baseURL: "https://277dbb0e34b0.ngrok.io/api/v1"
});
export default ({ Vue }) => {
  Vue.prototype.$axios = axiosInstance;
};
export { axiosInstance };
