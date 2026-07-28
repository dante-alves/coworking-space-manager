import { Field, FieldDescription, FieldError, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"

export function FormInput({
  label,
  name,
  value,
  error,
  onChange,
  type = "text",
  placeholder,
  description,
  ...props
}) {
  return (
    <Field data-invalid={!!error}>
      <FieldLabel htmlFor={name}>{label}</FieldLabel>
      <Input
        id={name}
        name={name}
        type={type}
        value={value ?? ""}
        placeholder={placeholder}
        onChange={onChange}
        aria-invalid={!!error}
        {...props}
      />
      {description && <FieldDescription>{description}</FieldDescription>}
      <FieldError>{error}</FieldError>
    </Field>
  )
}
