interface PublicLayoutProps {
  children: React.ReactNode
}

export default function PublicLayout({ children }: PublicLayoutProps) {
  return (
    <div className="min-h-screen w-full flex flex-col">
      <main className="flex-1">{children}</main>
    </div>
  )
}
