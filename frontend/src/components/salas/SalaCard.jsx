import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "../ui/card";
import { formatarDiaExibicao, formatarPrecoTurno, labelTurno } from "@/lib/formatadores";
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
            <Card className="w-full">
                <CardHeader>
                    <CardTitle>{sala.nome}</CardTitle>
                </CardHeader>

                <CardContent className="flex flex-col gap-1 text-muted-foreground">
                    <p>Capacidade: {sala.capacidade} pessoas</p>
                    <p>Preço: {formatarPrecoTurno(sala.precoLocacao)}</p>
                    {sala.descricao && <p className="text-sm">{sala.descricao}</p>}
                </CardContent>

                <CardFooter>
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
        
            <AlertDialog open={confirmarAberto} onOpenChange={setConfirmarAberto}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Confirmar Reserva?</AlertDialogTitle>
                        <AlertDialogDescription>
                            Deseja reservar a sala <strong>{sala.nome}</strong>, dia <strong>{formatarDiaExibicao(dia)}</strong>, no turno da <strong>{labelTurno(turno)}</strong>?
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