import axios from "axios";

export const axiosInst = axios.create({
  baseURL: import.meta.env.PROD ? "https://api.up-ai.in" : undefined,
});
