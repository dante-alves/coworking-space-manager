

export const TURNOS = [
    { valor: "M", label: "Manhã", horario: "08h–12h", iconClass: "text-amber-400" },
    { valor: "T", label: "Tarde", horario: "12h–18h", iconClass: "text-sky-400" },
    { valor: "N", label: "Noite", horario: "18h–00h", iconClass: "text-indigo-400" },
];

const LABEL_TURNO = Object.fromEntries(
    TURNOS.map(({ valor, label }) => [valor, label])
);

const HORARIO_TURNO = Object.fromEntries(
    TURNOS.map(({ valor, horario }) => [valor, horario])
);

// passar data da API "2026-07-17" ou ISO "2026-07-17T00:00:00.000Z" para "17/07/2026"

export function normalizarDiaApi(diaApi) {
    if (!diaApi) return ""
    return String(diaApi).slice(0, 10)
}

export function formatarDiaExibicao(diaApi) {
    if (!diaApi) return ""

    const normalizado = normalizarDiaApi(diaApi)
    const [ano, mes, dia] = normalizado.split("-");

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

export function diaApiParaDate(diaApi) {
    if (!diaApi) return undefined;

    const [ano, mes, dia] = diaApi.split("-").map(Number);

    return new Date(ano, mes - 1, dia);
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

export function horarioTurno(turno) {
    return HORARIO_TURNO[turno] ?? "";
}

export function labelTurnoComHorario(turno) {
    const label = labelTurno(turno);
    const horario = horarioTurno(turno);

    return horario ? `${label} (${horario})` : label;
}

export function opcoesTurnoSelect() {
    return TURNOS.map(({ valor, label, horario }) => ({
        value: valor,
        label: `${label} (${horario})`,
    }));
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

export function formatarCpf(cpf) {
    const digits = String(cpf).replace(/\D/g, "");
    if (digits.length !== 11) return cpf;

    return digits.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
}

export function obterPrimeiroNome(nome) {
    if (!nome?.trim()) return "Perfil";

    return nome.trim().split(/\s+/)[0];
}

export function obterInicialNome(nome) {
    const primeiro = obterPrimeiroNome(nome);

    if (primeiro === "Perfil") return "?";

    return primeiro.charAt(0).toUpperCase();
}

export function estiloAvatarPorNome(nome) {
    const base = obterPrimeiroNome(nome);
    let hash = 0;

    for (let i = 0; i < base.length; i++) {
        hash = base.charCodeAt(i) + ((hash << 5) - hash);
    }

    const hue = Math.abs(hash) % 360;

    return {
        backgroundColor: `hsl(${hue} 42% 32%)`,
        color: `hsl(${hue} 65% 78%)`,
    };
}