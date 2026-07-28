import { Field, FieldDescription, FieldError, FieldLabel } from "@/components/ui/field"
import InputPassword from "@/components/ui/input-password-with-toggle"

export function FormPassword({
  label,
  name,
  value,
  error,
  onChange,
  placeholder,
  description,
  children,
  ...props
}) {
  return (
    <Field data-invalid={!!error}>
      <FieldLabel htmlFor={name}>{label}</FieldLabel>
      <InputPassword
        id={name}
        name={name}
        value={value ?? ""}
        placeholder={placeholder}
        onChange={onChange}
        aria-invalid={!!error}
        {...props}
      />
      {children}
      {description && <FieldDescription>{description}</FieldDescription>}
      <FieldError>{error}</FieldError>
    </Field>
  )
}
