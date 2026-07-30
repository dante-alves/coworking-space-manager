import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "../ui/card";
import { formatarDiaExibicao, formatarPrecoTurno, labelTurnoComHorario } from "@/lib/formatadores";
import { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

export function SalaCard({ sala, dia, turno, onReservar, reservando = false }) {
    const [confirmarAberto, setConfirmarAberto] = useState(false);

    async function handleConfirmar() {

        const sucesso = await onReservar(sala.id)

        if (sucesso) {
            setConfirmarAberto(false)
        }

        // se false o dialog fica aberto e o erro aparece na tela
    }

    return (
        <>
            <div className="h-full">
                <Card className="flex h-full w-full flex-col">
                    <CardHeader>
                        <CardTitle>{sala.nome}</CardTitle>
                    </CardHeader>

                    <CardContent className="flex flex-1 flex-col gap-1 text-muted-foreground">
                        <p>Capacidade: {sala.capacidade} pessoas</p>
                        <p>Preço: {formatarPrecoTurno(sala.precoLocacao)}</p>
                        <p className="flex-1 text-sm">
                            {sala.descricao ?? ""}
                        </p>
                    </CardContent>

                    <CardFooter className="mt-auto">
                        <Button
                            type="button"
                            className="w-full"
                            disabled={reservando}
                            onClick={() => setConfirmarAberto(true)}
                        >
                            Reservar
                        </Button>
                    </CardFooter>
                </Card>
            </div>
        
            <AlertDialog open={confirmarAberto} onOpenChange={setConfirmarAberto}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Confirmar Reserva?</AlertDialogTitle>
                        <AlertDialogDescription>
                            Deseja reservar a sala <strong>{sala.nome}</strong>, dia <strong>{formatarDiaExibicao(dia)}</strong>, no turno da <strong>{labelTurnoComHorario(turno)}</strong>?
                        </AlertDialogDescription>
                    </AlertDialogHeader>

                    <AlertDialogFooter>
                        <AlertDialogCancel disabled={reservando}>
                            Cancelar
                        </AlertDialogCancel>
                        <AlertDialogAction disabled={reservando} onClick={handleConfirmar}>
                            {reservando ? "Reservando..." : "Confirmar"}
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    )
}