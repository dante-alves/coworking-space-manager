import { AlertaFeedback } from "@/components/salas/AlertaFeedback";
import { ReservaCard } from "@/components/reservas/ReservaCard";
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
        <main className="mx-auto flex max-w-6xl flex-col gap-6 p-6">
            <h1 className="text-2xl font-semibold">Minhas Reservas</h1>

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
        </main>
    );
}
