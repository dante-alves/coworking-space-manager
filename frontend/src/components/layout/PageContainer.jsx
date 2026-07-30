import { cn } from "@/lib/utils"

export function PageContainer({ children, className }) {
  return (
    <main
      className={cn(
        "mx-auto flex w-full max-w-6xl flex-col gap-6 p-6",
        className
      )}
    >
      {children}
    </main>
  )
}
