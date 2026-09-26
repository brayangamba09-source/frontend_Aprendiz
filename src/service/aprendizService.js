import axios from "axios";

const API_BASE = `${import.meta.env.VITE_API_URL || "http://localhost:8080"}/api/v1/aprendiz`;

const api = axios.create({
  baseURL: API_BASE,
  headers: { "Content-Type": "application/json" },
});

export const listarAprendices = async () => {
  const res = await api.get("");
  return res.data || [];
};

export const obtenerAprendiz = async (id) => {
  const res = await api.get(`/${id}`);
  return res.data;
};

export const crearAprendiz = async (aprendiz) => {
  const res = await api.post("", aprendiz);
  return res.data;
};

export const actualizarAprendiz = async (id, aprendiz) => {
  const res = await api.put(`/${id}`, aprendiz);
  return res.data;
};

export const eliminarAprendiz = async (id) => {
  await api.delete(`/${id}`);
};