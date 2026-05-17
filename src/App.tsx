import { TodoPage } from './Pages/TodoPage'

export default function App() {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-night-950">
      <div
        className="pointer-events-none fixed inset-0 bg-grid-fade bg-grid-size opacity-70"
        aria-hidden
      />
      <div
        className="pointer-events-none fixed -left-32 top-20 h-80 w-80 rounded-full bg-violet-600/25 blur-[100px] animate-float"
        aria-hidden
      />
      <div
        className="pointer-events-none fixed -right-24 bottom-10 h-96 w-96 rounded-full bg-amber-500/20 blur-[110px] animate-float [animation-delay:-6s]"
        aria-hidden
      />
      <div
        className="pointer-events-none fixed left-1/2 top-1/3 h-64 w-64 -translate-x-1/2 rounded-full bg-cyan-500/10 blur-[90px]"
        aria-hidden
      />

      <div className="relative z-10">
        <TodoPage />
      </div>
    </div>
  )
}
