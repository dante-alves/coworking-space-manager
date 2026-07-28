export function errosPorCampo(error) {
    const mapa = {};
    for (const issue of error.issues) {
        const chave = issue.path.join('.')
        if (!mapa[chave]) mapa[chave] = issue.message
    };

    return mapa;

}