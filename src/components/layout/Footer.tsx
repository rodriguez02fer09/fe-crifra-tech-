export const Footer: React.FC = () => {
  return (
    <footer className="flex items-center justify-center w-full bg-emerald-400 h-20 text-slate-300 py-4 text-center flex-shrink-0 overflow-hidden">
      <p className="text-sm  text-gray-900 font-semibold">
        © {new Date().getFullYear()} Mi App — Todos los derechos reservados.
      </p>
    </footer>
  )
}
