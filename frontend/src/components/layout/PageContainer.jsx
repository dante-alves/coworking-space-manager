import { cn } from "@/lib/utils"

export function PageContainer({ children, className, asMain = true }) {
  const Comp = asMain ? "main" : "div"

  return (
    <Comp
      className={cn(
        "mx-auto flex w-full max-w-6xl flex-col gap-6 p-6",
        className
      )}
    >
      {children}
    </Comp>
  )
}
