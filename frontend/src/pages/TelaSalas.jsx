import { PageContainer } from "@/components/layout/PageContainer"
import { PageTitulo } from "@/components/layout/PageTitulo"
import { AlertaFeedback } from "@/components/salas/AlertaFeedback";
import { FiltrosSalas } from "@/components/salas/FiltrosSalas";
import { SalaCard } from "@/components/salas/SalaCard";
import { FaixaTurnos } from "@/components/turnos/FaixaTurnos";
import { useSalasDisponiveis } from "@/hooks/useSalasDisponiveis";

export default function TelaSalas() {
    const {
        dia,
        setDia,
        turno,
        setTurno,
        salas,
        carregando,
        reservandoId,
        feedback,
        reservar,
        limparFeedback,
    } = useSalasDisponiveis()

    return (
        <PageContainer>
            <PageTitulo
                titulo="Salas Disponíveis"
                descricao="Escolha o dia e o turno para ver salas livres e fazer sua reserva."
            >
                <FaixaTurnos />
            </PageTitulo>

            <FiltrosSalas 
                dia={dia}
                turno={turno}
                onDiaChange={setDia}
                onTurnoChange={setTurno}
            />

            {feedback && (
                <AlertaFeedback 
                    tipo={feedback.tipo}
                    mensagem={feedback.mensagem}
                    onFechar={limparFeedback}
                />
            )}

            {carregando ? (
                <p className="text-muted-foreground">Carregando salas...</p>
            ) : salas.length === 0 ? (
                <p className="text-muted-foreground">
                    Nenhuma sala disponível para este dia e turno.
                </p>
            ) : (
                <div className="grid items-stretch gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {salas.map((sala) => (
                        <SalaCard 
                            key={sala.id}
                            sala={sala}
                            dia={dia}
                            turno={turno}
                            onReservar={reservar}
                            reservando={reservandoId === sala.id}
                        />
                    ))}
                </div>
            )
            }
        </PageContainer>
    )
}