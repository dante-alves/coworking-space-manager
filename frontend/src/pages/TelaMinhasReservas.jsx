import { PageContainer } from "@/components/layout/PageContainer"
import { PageTitulo } from "@/components/layout/PageTitulo"
import { AlertaFeedback } from "@/components/salas/AlertaFeedback";
import { ReservaCard } from "@/components/reservas/ReservaCard";
import { FaixaTurnos } from "@/components/turnos/FaixaTurnos";
import { buttonVariants } from "@/components/ui/button";
import { useMinhasReservas } from "@/hooks/useMinhasReservas";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

export default function TelaMinhasReservas() {
    const {
        reservas,
        carregando,
        cancelandoId,
        feedback,
        cancelarReserva,
        limparFeedback,
    } = useMinhasReservas();

    return (
        <PageContainer>
            <PageTitulo
                titulo="Minhas Reservas"
                descricao="Suas reservas confirmadas para turnos ainda não encerrados."
            >
                <FaixaTurnos />
            </PageTitulo>

            {feedback && (
                <AlertaFeedback
                    tipo={feedback.tipo}
                    mensagem={feedback.mensagem}
                    onFechar={limparFeedback}
                />
            )}

            {carregando ? (
                <p className="text-muted-foreground">Carregando reservas...</p>
            ) : reservas.length === 0 ? (
                <div className="flex flex-col gap-4">
                    <p className="text-muted-foreground">
                        Você não tem reservas ativas no momento.
                    </p>
                    <Link
                        to="/salas"
                        className={cn(buttonVariants(), "w-fit")}
                    >
                        Ver salas disponíveis
                    </Link>
                </div>
            ) : (
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {reservas.map((reserva) => (
                        <ReservaCard
                            key={reserva.id}
                            reserva={reserva}
                            onCancelar={cancelarReserva}
                            cancelando={cancelandoId === reserva.id}
                        />
                    ))}
                </div>
            )}
        </PageContainer>
    );
}
