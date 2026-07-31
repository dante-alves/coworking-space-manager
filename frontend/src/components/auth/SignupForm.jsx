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
  FieldSeparator,
  FieldError,
} from "@/components/ui/field"
import { FormInput } from "@/components/form/form-input"
import { FormPassword } from "@/components/form/form-password"
import { Link } from "react-router-dom"

export function SignupForm({
  className,
  form,
  erros,
  erroGeral,
  enviando,
  atualizarCampo,
  atualizarEndereco,
  handleSubmit,
  ...props
}) {
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-2x1">Cadastro</CardTitle>
          <CardDescription>
            Preencha seus dados abaixo para criar sua conta.
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
                label="Nome Completo"
                name="nome"
                value={form.nome}
                error={erros.nome}
                onChange={(e) => atualizarCampo("nome", e.target.value)}
                placeholder="ex: João Maria"
                required
              />

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
                <div className="text-sm text-muted-foreground">
                  Deve conter ao menos:
                  <ul className="list-disc ml-5 mt-1">
                    <li>8 caracteres</li>
                    <li>Uma letra maiúscula</li>
                    <li>Uma letra minúscula</li>
                    <li>Um número</li>
                  </ul>
                </div>
              </FormPassword>

              <FormPassword
                label="Confirmar Senha"
                name="confirmarSenha"
                value={form.confirmarSenha}
                error={erros.confirmarSenha}
                onChange={(e) =>
                  atualizarCampo("confirmarSenha", e.target.value)
                }
                placeholder="Confirme sua senha"
                description="Por favor, confirme sua senha."
                required
              />

              <FormInput
                label="Telefone"
                name="telefone"
                type="tel"
                value={form.telefone}
                error={erros.telefone}
                onChange={(e) => atualizarCampo("telefone", e.target.value)}
                placeholder="(83) 98765-4321"
                required
              />

              <FormInput
                label="CPF"
                name="cpf"
                value={form.cpf}
                error={erros.cpf}
                onChange={(e) => atualizarCampo("cpf", e.target.value)}
                placeholder="000.000.000-00"
                required
              />

              <FieldSeparator>Endereço</FieldSeparator>

              <FormInput
                label="Rua"
                name="rua"
                value={form.endereco.rua}
                error={erros["endereco.rua"]}
                onChange={(e) => atualizarEndereco("rua", e.target.value)}
                placeholder="Rua das Rosas"
                required
              />

              <FormInput
                label="Número"
                name="numero"
                value={form.endereco.numero}
                error={erros["endereco.numero"]}
                onChange={(e) => atualizarEndereco("numero", e.target.value)}
                placeholder="190"
                required
              />

              <FormInput
                label="Complemento"
                name="complemento"
                value={form.endereco.complemento}
                error={erros["endereco.complemento"]}
                onChange={(e) =>
                  atualizarEndereco("complemento", e.target.value)
                }
                placeholder="Apto. 106 / Próximo aos correios"
              />

              <FormInput
                label="Bairro"
                name="bairro"
                value={form.endereco.bairro}
                error={erros["endereco.bairro"]}
                onChange={(e) => atualizarEndereco("bairro", e.target.value)}
                placeholder="Boa Vista"
                required
              />

              <FormInput
                label="CEP"
                name="cep"
                value={form.endereco.cep}
                error={erros["endereco.cep"]}
                onChange={(e) => atualizarEndereco("cep", e.target.value)}
                placeholder="00000-000"
                required
              />

              <FormInput
                label="Cidade"
                name="cidade"
                value={form.endereco.cidade}
                error={erros["endereco.cidade"]}
                onChange={(e) => atualizarEndereco("cidade", e.target.value)}
                placeholder="Itaporanga"
                required
              />

              <FormInput
                label="Estado"
                name="uf"
                value={form.endereco.uf}
                error={erros["endereco.uf"]}
                onChange={(e) => atualizarEndereco("uf", e.target.value)}
                maxLength={2}
                placeholder="PB"
                description="Apenas a sigla."
                required
              />

              <Field>
                <Button type="submit" size="lg" disabled={enviando}>
                  {enviando ? "Cadastrando..." : "Cadastrar"}
                </Button>
                <FieldDescription className="text-center">
                  Já tem uma conta?{" "}
                  <Link
                    to="/login"
                    className="underline underline-offset-4 hover:text-primary cursor-pointer"
                  >
                    Faça login
                  </Link>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
