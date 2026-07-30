import { IMAGEM_COWORKING_URL } from "@/lib/imagens"

export function FundoDesfocado() {
  return (
    <div
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
      aria-hidden
    >
      <div
        className="absolute inset-0 scale-110 bg-cover bg-center blur-xs"
        style={{
          backgroundImage: `url('${IMAGEM_COWORKING_URL}')`,
          backgroundPosition: "center 38%",
        }}
      />
      <div className="absolute inset-0 bg-neutral-950/20" />
    </div>
  )
}
