import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { formatarDiaExibicao, labelTurnoComHorario } from "@/lib/formatadores";
import { useState } from "react";

export function ReservaCard({ reserva, onCancelar, cancelando = false }) {
    const [confirmarAberto, setConfirmarAberto] = useState(false);

    async function handleConfirmar() {
        const sucesso = await onCancelar(reserva.id);

        if (sucesso) {
            setConfirmarAberto(false);
        }
    }

    return (
        <>
            <Card className="w-full">
                <CardHeader>
                    <CardTitle>{reserva.nomeSala}</CardTitle>
                </CardHeader>

                <CardContent className="flex flex-col gap-1 text-muted-foreground">
                    <p>
                        Dia:{" "}
                        <span className="text-foreground">
                            {formatarDiaExibicao(reserva.dia)}
                        </span>
                    </p>
                    <p>
                        Turno:{" "}
                        <span className="text-foreground">
                            {labelTurnoComHorario(reserva.turno)}
                        </span>
                    </p>
                </CardContent>

                <CardFooter>
                    <Button
                        type="button"
                        variant="destructive"
                        className="w-full"
                        disabled={cancelando}
                        onClick={() => setConfirmarAberto(true)}
                    >
                        Cancelar reserva
                    </Button>
                </CardFooter>
            </Card>

            <AlertDialog open={confirmarAberto} onOpenChange={setConfirmarAberto}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Cancelar reserva?</AlertDialogTitle>
                        <AlertDialogDescription>
                            Tem certeza que deseja cancelar a reserva da sala{" "}
                            <strong>{reserva.nomeSala}</strong>, dia{" "}
                            <strong>{formatarDiaExibicao(reserva.dia)}</strong>,
                            no turno da{" "}
                            <strong>{labelTurnoComHorario(reserva.turno)}</strong>?
                        </AlertDialogDescription>
                    </AlertDialogHeader>

                    <AlertDialogFooter>
                        <AlertDialogCancel disabled={cancelando}>
                            Voltar
                        </AlertDialogCancel>
                        <AlertDialogAction
                            disabled={cancelando}
                            onClick={handleConfirmar}
                            className="bg-destructive text-white hover:bg-destructive/90"
                        >
                            {cancelando ? "Cancelando..." : "Cancelar"}
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
}
