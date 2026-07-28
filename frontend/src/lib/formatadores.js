
export const TURNOS = [
    { valor: "M", label: "Manhã" },
    { valor: "T", label: "Tarde" },
    { valor: "N", label: "Noite" },
];

const LABEL_TURNO = Object.fromEntries(
    TURNOS.map(({ valor, label }) => [valor, label])
);

// passar data da API "2026-07-17" para "17/07/2026"

export function formatarDiaExibicao(diaApi) {
    if (!diaApi) return ""

    const [ano, mes, dia] = diaApi.split("-");

    if (!ano || !mes || !dia) return diaApi;

    return `${dia}/${mes}/${ano}`;
}


// passar data da exibição "17/07/2026" para a API "2026-07-17"

export function diaParaApi(data) {
    
    const ano = data.getFullYear();
    const mes = String(data.getMonth() + 1).padStart(2, "0"); // getMonth começa em janeiro 0, por isso o + 1; padStart adiciona um "0" no início se a string só tiver um dígito.
    const dia = String(data.getDate()).padStart(2, "0");

    return `${ano}-${mes}-${dia}`;
}

export function hojeParaApi() {
    return diaParaApi(new Date());
}

// type=date já envia YYYY-MM-DD, só repassa
export function diaInputParaApi(valorInput) {
    return valorInput;
}

export function labelTurno(turno) {
    return LABEL_TURNO[turno] ?? turno;
}

// ex: 150 -> R$ 150,00
export function formatarPreco(valor) {
    return Number(valor).toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
    })
}

export function formatarPrecoTurno(valor) {
    return `${formatarPreco(valor)}/turno`
}