import { HomeHero } from "@/components/home/HomeHero"
import { HomeRodapeCta } from "@/components/home/HomeRodapeCta"
import { HomeTiposSala } from "@/components/home/HomeTiposSala"
import { PageContainer } from "@/components/layout/PageContainer"

export default function TelaHome() {
  return (
    <main className="flex flex-1 flex-col">
      <HomeHero />
      <PageContainer asMain={false} className="gap-12 py-16">
        <HomeTiposSala />
      </PageContainer>
      <HomeRodapeCta />
    </main>
  )
}
