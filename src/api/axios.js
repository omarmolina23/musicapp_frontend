import axios from "axios";

export default axios.create({
    baseURL: "https://musicappbackend-production.up.railway.app/api",
});