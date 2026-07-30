import { cn } from "@/lib/utils"

export function PageTitulo({ titulo, descricao, children, className }) {
  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <h1 className="font-display text-3xl font-semibold tracking-tight">
        {titulo}
      </h1>
      {descricao && (
        <p className="max-w-2xl text-muted-foreground">{descricao}</p>
      )}
      {children}
    </div>
  )
}
