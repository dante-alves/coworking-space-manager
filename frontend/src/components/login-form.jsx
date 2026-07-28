import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Link } from "react-router-dom"
import { FormInput } from "@/components/form/form-input"
import { FormPassword } from "@/components/form/form-password"
import { FieldError } from "@/components/ui/field"


export function LoginForm({
  className,
  form,
  erros,
  erroGeral,
  enviando,
  atualizarCampo,
  handleSubmit,
  ...props
}) {
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className="text-2x1">Faça Login</CardTitle>
          <CardDescription>
            Insira seu email e senha abaixo para fazer login.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <FieldGroup>
              {erroGeral && (
                <Field data-invalid>
                  <FieldError>{erroGeral}</FieldError>
                </Field>
              )}

              <FormInput
                label="Email"
                name="email"
                type="email"
                value={form.email}
                error={erros.email}
                onChange={(e) => atualizarCampo("email", e.target.value)}
                placeholder="joaomaria@exemplo.com"
                required
              />

              <FormPassword
                label="Senha"
                name="senha"
                value={form.senha}
                error={erros.senha}
                onChange={(e) => atualizarCampo("senha", e.target.value)}
                placeholder="Sua senha"
                required
              >
              </FormPassword>

              <Field>
                <Button type="submit" size="lg" disabled={enviando}>{enviando ? "Logando..." : "Login"}</Button>
                <FieldDescription className="text-center">
                  Não tem uma conta?{' '}
                  <Link 
                    to="/cadastro"
                    className="underline underline-offset-4 hover:text-primary cursor-pointer"
                  >
                    Cadastre-se
                  </Link>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
