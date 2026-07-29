import { cn } from "@/lib/utils";

export function AlertaFeedback({ tipo, mensagem, onFechar, className }) {
    if (!mensagem) return null

    const ehSucesso = tipo === "sucesso"

    return (
         <div
            role="alert"
            className={cn(
                "rounded-lg border px-4 py-3 text-sm",
                ehSucesso 
                ? "border-green-600/40 bg-green-600/10 text-green-700 dark:text-green-400"
                : "border-destructive/40 bg-destructive/10 text-destructive",
                className
            )}
         >
            <div className="flex items-start justify-between gap-3">
                <p>{mensagem}</p>

                {onFechar && (
                    <button
                        type="button"
                        onClick={onFechar}
                        className="shrink-0 text-xs underline underline-offset-2 opacity-80 hover:opacity-100"
                    >
                        Fechar
                    </button>
                )}
            </div>
         </div>
    )
}