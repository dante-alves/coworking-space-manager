import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function BuscaClientes({ valor, onChange }) {
  return (
    <div className="flex w-full max-w-md flex-col gap-1">
      <Label htmlFor="busca-clientes">Buscar cliente</Label>
      <Input
        id="busca-clientes"
        type="search"
        value={valor}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Nome, email ou CPF"
      />
    </div>
  )
}
