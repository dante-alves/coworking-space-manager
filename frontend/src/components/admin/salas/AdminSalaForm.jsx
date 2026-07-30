import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { FormInput } from "@/components/form/form-input"

export function AdminSalaForm({
  titulo,
  form,
  erros,
  erroGeral,
  enviando,
  onSubmit,
  onCancelar,
  onCampoChange,
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">{titulo}</CardTitle>
      </CardHeader>

      <CardContent>
        <form onSubmit={onSubmit} className="flex flex-col gap-4">
          {erroGeral && (
            <p className="text-sm text-destructive" role="alert">
              {erroGeral}
            </p>
          )}

          <FormInput
            label="Nome"
            name="nome"
            value={form.nome}
            error={erros.nome}
            onChange={(e) => onCampoChange("nome", e.target.value)}
            placeholder="Sala 101"
          />

          <div className="grid gap-4 sm:grid-cols-2">
            <FormInput
              label="Capacidade"
              name="capacidade"
              type="number"
              min="1"
              step="1"
              value={form.capacidade}
              error={erros.capacidade}
              onChange={(e) => onCampoChange("capacidade", e.target.value)}
              placeholder="10"
            />

            <FormInput
              label="Preço por turno (R$)"
              name="precoLocacao"
              type="number"
              min="0.01"
              step="0.01"
              value={form.precoLocacao}
              error={erros.precoLocacao}
              onChange={(e) => onCampoChange("precoLocacao", e.target.value)}
              placeholder="50.00"
            />
          </div>

          <FormInput
            label="Descrição"
            name="descricao"
            value={form.descricao}
            error={erros.descricao}
            onChange={(e) => onCampoChange("descricao", e.target.value)}
            placeholder="Opcional"
          />

          <div className="flex flex-wrap gap-2">
            <Button type="submit" disabled={enviando}>
              {enviando ? "Salvando..." : "Salvar"}
            </Button>
            <Button
              type="button"
              variant="outline"
              disabled={enviando}
              onClick={onCancelar}
            >
              Cancelar
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
