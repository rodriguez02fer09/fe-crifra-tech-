import type { ReactNode } from 'react'
import { Header } from './Header'
import { Footer } from './Footer'

interface LayoutProps {
  children: ReactNode
  className?: string
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="h-screen w-screen flex flex-col   overflow-hidden">
      <Header />

      <main
        role="main"
        className="  flex-1 overflow-y-auto overflow-x-hidden bg-emerald-100  w-full px-4 sm:px-6 lg:px-8 py-6"
      >
        {children}
      </main>

      <Footer />
    </div>
  )
}
