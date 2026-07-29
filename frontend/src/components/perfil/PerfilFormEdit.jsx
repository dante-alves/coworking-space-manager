import { Button } from "@/components/ui/button"
import { FormInput } from "@/components/form/form-input"

export function PerfilFormEdit({
  form,
  erros,
  erroGeral,
  enviando,
  onSubmit,
  onCancelar,
  onCampoChange,
}) {
  return (
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
        placeholder="Seu nome completo"
      />

      <FormInput
        label="Telefone"
        name="telefone"
        type="tel"
        value={form.telefone}
        error={erros.telefone}
        onChange={(e) => onCampoChange("telefone", e.target.value)}
        placeholder="(83) 98765-4321"
      />

      <p className="text-sm text-muted-foreground">
        Email, CPF e endereço não podem ser alterados por aqui.
      </p>

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
  )
}
