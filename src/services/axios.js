import axios from "axios";
const request = axios.create({
  baseURL: "https://restcountries.com/",
});

export default {
  async getAllDados() {
    const all = await request.get("v2/all");
    if (all.status === 200) return all;
    return all;
  },
  async getAllCountriesByParams(url, params) {
    const response = await request.get(`v2/${url}/${params}`);
    if (response.status === 200) return response;
    return response;
  },
};
