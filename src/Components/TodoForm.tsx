import { useState, useRef, type FormEvent } from 'react'

type Props = {
  onEkle: (baslik: string) => void
}

export function TodoForm({ onEkle }: Props) {
  const [metin, setMetin] = useState('')
  const [yeniEklendi, setYeniEklendi] = useState(false)
  const [bosUyari, setBosUyari] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  function gonder(e: FormEvent) {
    e.preventDefault()
    const trimmed = metin.trim()
    if (!trimmed) {
      setBosUyari(true)
      window.setTimeout(() => setBosUyari(false), 500)
      inputRef.current?.focus()
      return
    }
    onEkle(trimmed)
    setMetin('')
    setYeniEklendi(true)
    window.setTimeout(() => setYeniEklendi(false), 1100)
    inputRef.current?.focus()
  }

  return (
    <form
      onSubmit={gonder}
      className="flex flex-col gap-4 sm:flex-row sm:items-stretch"
    >
      <label className="group flex-1 text-left">
        <span className="mb-2 block text-xs font-semibold uppercase tracking-wider text-slate-500">
          Yeni görev
        </span>
        <div className="relative">
          <span
            className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-lg opacity-40 transition-all duration-300 group-focus-within:scale-110 group-focus-within:opacity-80"
            aria-hidden
          >
            ✦
          </span>
          <input
            ref={inputRef}
            value={metin}
            onChange={(e) => setMetin(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Escape') setMetin('')
            }}
            placeholder="Örn: sunumu son rötuşlar..."
            aria-invalid={bosUyari}
            className={`w-full rounded-2xl border border-white/10 bg-white/5 py-3.5 pl-11 pr-4 text-white placeholder:text-slate-500 shadow-inset outline-none ring-amber-400/0 transition duration-200 focus:border-amber-400/40 focus:bg-white/[0.07] focus:ring-2 focus:ring-amber-400/25 ${bosUyari ? 'animate-shake border-rose-400/40' : ''}`}
          />
        </div>
        <p className="mt-2 text-[11px] text-slate-500">
          <kbd className="rounded border border-white/10 bg-white/5 px-1.5 py-0.5 font-mono text-[10px] text-slate-400">
            Enter
          </kbd>{' '}
          ile hızlı ekle ·{' '}
          <kbd className="rounded border border-white/10 bg-white/5 px-1.5 py-0.5 font-mono text-[10px] text-slate-400">
            Esc
          </kbd>{' '}
          alanı temizle
        </p>
      </label>
      <div className="flex flex-col justify-end sm:w-auto">
        <span className="mb-2 hidden text-xs font-semibold uppercase tracking-wider text-transparent sm:block">
          &nbsp;
        </span>
        <button
          type="submit"
          className={`relative overflow-hidden rounded-2xl px-6 py-3.5 text-sm font-semibold shadow-lg transition-all duration-200 active:scale-[0.97] sm:min-w-[9.5rem] ${
            yeniEklendi
              ? 'bg-gradient-to-r from-emerald-400 to-teal-400 text-night-950 shadow-emerald-500/35'
              : 'bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 text-night-950 shadow-amber-500/30 hover:brightness-110 hover:shadow-amber-500/45'
          }`}
        >
          <span
            className={`flex items-center justify-center gap-2 transition-transform duration-200 ${yeniEklendi ? 'scale-105' : ''}`}
          >
            {yeniEklendi ? (
              <>
                <span aria-hidden>✓</span> Eklendi
              </>
            ) : (
              'Listeye ekle'
            )}
          </span>
        </button>
      </div>
    </form>
  )
}
