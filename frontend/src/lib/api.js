import axios from 'axios';
import { limparSessao, obterUsuario, salvarSessao, obterToken } from './auth-storage';
import { redirecionarLogin } from './navegacao';

const baseURL = import.meta.env.VITE_API_URL ?? 'http://localhost:3000';
const TIMEOUT_MS = 15000;

const api = axios.create({
    baseURL,
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true,
    timeout: TIMEOUT_MS,
});

let isRefreshing = false;
let fila = [];

function processarFila(erro, token = null) {
    fila.forEach(({ resolve, reject, config }) => {
        if (erro) reject(erro);
        else {
            config.headers.Authorization = `Bearer ${token}`;
            resolve(api(config));
        }
    });

    fila = [];
}

api.interceptors.request.use((config) => {
  const token = obterToken();
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const config = error.config;
    const tinhaAuth = Boolean(config?.headers?.Authorization);
    const ehRefresh = config?.url?.includes('/refresh');
    const ehLogout = config?.url?.includes('/logout');

    if (
      error.response?.status !== 401 ||
      !tinhaAuth ||
      config._retry ||
      ehRefresh ||
      ehLogout
    ) {
      return Promise.reject(error);
    }

    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        fila.push({ resolve, reject, config });
      });
    }

    config._retry = true;
    isRefreshing = true;

    try {
      const { data } = await axios.post(
        `${baseURL}/refresh`,
        {},
        { withCredentials: true, timeout: TIMEOUT_MS }
      );

      salvarSessao({
        accessToken: data.accessToken,
        usuario: obterUsuario(),
      });

      processarFila(null, data.accessToken);

      config.headers.Authorization = `Bearer ${data.accessToken}`;

      return api(config);
    } catch (refreshError) {
      processarFila(refreshError);

      limparSessao();
      redirecionarLogin();

      return Promise.reject(refreshError);
    } finally {
      isRefreshing = false;
    }
  }
);

export default api;
