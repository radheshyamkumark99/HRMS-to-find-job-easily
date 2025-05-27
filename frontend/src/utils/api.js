import axios from "axios";

const API = axios.create({
  baseURL: "https://room-hr8e.onrender.com", 
});

export const getToken = (roomName, userName) =>
  API.post("/get-token", { roomName, userName });
