

let irParaLogin = () => window.location.assign("/login");

export function configurarNavegacao({ navigate }) {
    irParaLogin = () => navigate("/login", { replace: true, state: { from: window.location.pathname } }); 
}

export function redirecionarLogin() {
    irParaLogin();
}