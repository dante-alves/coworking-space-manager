const TOKEN_KEY = 'accessToken';
const USER_KEY = 'usuario';

export function salvarSessao({ accessToken, usuario }) {
    localStorage.setItem(TOKEN_KEY, accessToken);
    localStorage.setItem(USER_KEY, JSON.stringify(usuario));
}

export function obterToken() {
    return localStorage.getItem(TOKEN_KEY);
}

export function estaLogado() {
    return Boolean(obterToken());
}

export function limparSessao() {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY)
}

export function obterUsuario() {
    const raw = localStorage.getItem(USER_KEY);

    if (!raw) return null;

    try {
        return JSON.parse(raw); // parse do usuário string para object
    } catch {
        return null;
    }
}

export function atualizarUsuarioSessao(dados) {
    const token = obterToken();
    const usuario = obterUsuario();

    if (!token || !usuario) return;

    salvarSessao({
        accessToken: token,
        usuario: { ...usuario, ...dados },
    });
}