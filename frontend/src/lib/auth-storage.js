const TOKEN_KEY = 'accessToken';
const USER_KEY = 'usuario';

export function salvarSessao({ accessToken, usuario }) {
    localStorage.setItem(TOKEN_KEY, accessToken);
    localStorage.setItem(USER_KEY, JSON.stringify(usuario));
}