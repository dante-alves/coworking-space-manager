import { Field, FieldError, FieldLabel } from "@/components/ui/field"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { cn } from "@/lib/utils"

function normalizarOpcoes(options) {
  return options.map((opcao) => ({
    label: opcao.label,
    value:
      opcao.value === "" || opcao.value == null ? null : String(opcao.value),
  }))
}

function valorParaSelect(valor) {
  if (valor === "" || valor == null) return null
  return String(valor)
}

export function FormSelect({
  label,
  id,
  value,
  onChange,
  options,
  placeholder = "Selecione...",
  error,
  className,
  triggerClassName,
  fullWidth = false,
}) {
  const items = normalizarOpcoes(options)
  const valorControlado = valorParaSelect(value)

  return (
    <Field
      data-invalid={!!error}
      className={cn(fullWidth ? "w-full" : "w-fit", className)}
    >
      {label && <FieldLabel htmlFor={id}>{label}</FieldLabel>}

      <Select
        items={items}
        value={valorControlado}
        onValueChange={(novoValor) => onChange(novoValor ?? "")}
      >
        <SelectTrigger
          id={id}
          className={cn(
            fullWidth ? "w-full" : "w-[180px]",
            triggerClassName
          )}
          aria-invalid={!!error}
        >
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>

        <SelectContent>
          {items.map((item) => (
            <SelectItem
              key={item.value ?? "__vazio__"}
              value={item.value}
            >
              {item.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {error && <FieldError>{error}</FieldError>}
    </Field>
  )
}
