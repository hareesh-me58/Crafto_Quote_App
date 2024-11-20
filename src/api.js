import axios from "axios";

const QuoteAPI = axios.create({
  baseURL: "https://assignment.stage.crafto.app",
});

QuoteAPI.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers["Authorization"] = token;
  }
  return config;
});

export const login = (username, otp) =>
  QuoteAPI.post("/login", { username, otp });

export const getQuotes = (limit, offset) =>
  QuoteAPI.get(
    `https://assignment.stage.crafto.app/getQuotes?limit=${limit}&offset=${offset}`
  );

export const uploadMedia = (file) => {
  const formData = new FormData();
  formData.append("file", file);
  return axios.post(
    "https://crafto.app/crafto/v1.0/media/assignment/upload",
    formData
  );
};

export const createQuote = (text, mediaUrl) =>
  QuoteAPI.post("/postQuote", { text, mediaUrl });
