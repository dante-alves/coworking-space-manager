import { AdminClienteCard } from "@/components/admin/clientes/AdminClienteCard"
import { BuscaClientes } from "@/components/admin/clientes/BuscaClientes"
import { ClienteDetalhesDialog } from "@/components/admin/clientes/ClienteDetalhesDialog"
import { AlertaFeedback } from "@/components/salas/AlertaFeedback"
import { Button } from "@/components/ui/button"
import { useAdminClientes } from "@/hooks/useAdminClientes"

export default function TelaAdminClientes() {
  const {
    clientes,
    paginacao,
    pagina,
    setPagina,
    buscaInput,
    setBuscaInput,
    carregando,
    processandoId,
    carregandoDetalhe,
    clienteDetalhe,
    feedback,
    verDetalhes,
    fecharDetalhes,
    desativarCliente,
    limparFeedback,
  } = useAdminClientes()

  const temAnterior = paginacao && pagina > 1
  const temProxima = paginacao && pagina < paginacao.totalPaginas

  return (
    <div className="flex w-full flex-col gap-6">
      <p className="text-sm text-muted-foreground">
        Gerencie os clientes do coworking. Clientes inativos aparecem em cinza.
      </p>

      {feedback && (
        <AlertaFeedback
          tipo={feedback.tipo}
          mensagem={feedback.mensagem}
          onFechar={limparFeedback}
        />
      )}

      <BuscaClientes valor={buscaInput} onChange={setBuscaInput} />

      {carregando ? (
        <p className="text-muted-foreground">Carregando clientes...</p>
      ) : clientes.length === 0 ? (
        <p className="text-muted-foreground">
          Nenhum cliente encontrado
          {buscaInput ? " para esta busca." : "."}
        </p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {clientes.map((cliente) => (
            <AdminClienteCard
              key={cliente.id}
              cliente={cliente}
              processando={processandoId === cliente.id}
              onVerDetalhes={verDetalhes}
              onDesativar={desativarCliente}
            />
          ))}
        </div>
      )}

      {paginacao && paginacao.totalPaginas > 1 && (
        <div className="flex flex-wrap items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            Página {paginacao.pagina} de {paginacao.totalPaginas} —{" "}
            {paginacao.total} clientes
          </p>

          <div className="flex gap-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              disabled={!temAnterior || carregando}
              onClick={() => setPagina((p) => p - 1)}
            >
              Anterior
            </Button>
            <Button
              type="button"
              variant="outline"
              size="sm"
              disabled={!temProxima || carregando}
              onClick={() => setPagina((p) => p + 1)}
            >
              Próxima
            </Button>
          </div>
        </div>
      )}

      <ClienteDetalhesDialog
        cliente={clienteDetalhe}
        aberto={carregandoDetalhe || Boolean(clienteDetalhe)}
        carregando={carregandoDetalhe}
        onFechar={fecharDetalhes}
      />
    </div>
  )
}
