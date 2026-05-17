import { useEffect, useMemo, useState } from 'react'
import type { Todo } from '../Interfaces/Todo'
import type { GorevFiltresi } from '../Interfaces/GorevFiltresi'
import { TodoForm } from '../Components/TodoForm'
import { TodoList } from '../Components/TodoList'

const STORAGE_KEY = 'bolum2-todo-odev'

function okuDepodan(): Todo[] {
  try {
    const ham = localStorage.getItem(STORAGE_KEY)
    if (!ham) return []
    const parsed = JSON.parse(ham) as unknown
    if (!Array.isArray(parsed)) return []
    return parsed.filter(
      (x): x is Todo =>
        typeof x === 'object' &&
        x !== null &&
        'id' in x &&
        'baslik' in x &&
        typeof (x as Todo).id === 'string',
    ) as Todo[]
  } catch {
    return []
  }
}

function yazDepoya(liste: Todo[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(liste))
}

export function TodoPage() {
  const [todos, setTodos] = useState<Todo[]>(() => okuDepodan())
  const [simdi, setSimdi] = useState(() => new Date())
  const [filtre, setFiltre] = useState<GorevFiltresi>('hepsi')
  const [sonEklenenId, setSonEklenenId] = useState<string | null>(null)
  const [sonTikId, setSonTikId] = useState<string | null>(null)

  useEffect(() => {
    yazDepoya(todos)
  }, [todos])

  useEffect(() => {
    const id = window.setInterval(() => setSimdi(new Date()), 30_000)
    return () => window.clearInterval(id)
  }, [])

  useEffect(() => {
    if (!sonEklenenId) return
    const t = window.setTimeout(() => setSonEklenenId(null), 650)
    return () => window.clearTimeout(t)
  }, [sonEklenenId])

  useEffect(() => {
    if (!sonTikId) return
    const t = window.setTimeout(() => setSonTikId(null), 380)
    return () => window.clearTimeout(t)
  }, [sonTikId])

  function ekle(baslik: string) {
    const id = crypto.randomUUID()
    const yeni: Todo = {
      id,
      baslik,
      tamamlandi: false,
      olusturulma: Date.now(),
    }
    setTodos((onceki) => [yeni, ...onceki])
    setSonEklenenId(id)
    setFiltre('hepsi')
  }

  function guncelle(id: string, yeniBaslik: string) {
    const b = yeniBaslik.trim()
    if (!b) return
    setTodos((onceki) =>
      onceki.map((t) => (t.id === id ? { ...t, baslik: b } : t)),
    )
  }

  function tamamDegistir(id: string, tamam: boolean) {
    setSonTikId(id)
    setTodos((onceki) =>
      onceki.map((t) => (t.id === id ? { ...t, tamamlandi: tamam } : t)),
    )
  }

  function sil(id: string) {
    setTodos((onceki) => onceki.filter((t) => t.id !== id))
  }

  const sirali = useMemo(
    () => [...todos].sort((a, b) => b.olusturulma - a.olusturulma),
    [todos],
  )

  const gorunen = useMemo(() => {
    if (filtre === 'acik') return sirali.filter((t) => !t.tamamlandi)
    if (filtre === 'tamam') return sirali.filter((t) => t.tamamlandi)
    return sirali
  }, [sirali, filtre])

  const tamamlanan = sirali.filter((t) => t.tamamlandi).length
  const acikSayisi = sirali.length - tamamlanan
  const toplam = sirali.length
  const yuzde = toplam === 0 ? 0 : Math.round((tamamlanan / toplam) * 100)
  const hepsiBitti = toplam > 0 && yuzde === 100

  const gun = new Intl.DateTimeFormat('tr-TR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  }).format(simdi)
  const saat = new Intl.DateTimeFormat('tr-TR', {
    hour: '2-digit',
    minute: '2-digit',
  }).format(simdi)

  function kartSinifi(aktif: boolean) {
    return `cursor-pointer rounded-2xl border px-4 py-3 shadow-card backdrop-blur-md transition-all duration-200 select-none hover:-translate-y-0.5 active:scale-[0.98] ${
      aktif
        ? 'border-amber-400/50 bg-amber-500/15 shadow-amber-500/10 ring-2 ring-amber-400/30'
        : 'border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/[0.08]'
    }`
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-12 sm:py-16">
      <header className="animate-fade-up mb-10">
        <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex min-w-0 gap-5 sm:gap-6">
            <div
              className="hidden w-1.5 shrink-0 rounded-full bg-gradient-to-b from-amber-400 via-rose-500 to-violet-600 shadow-[0_0_20px_rgba(251,191,36,0.35)] sm:block"
              aria-hidden
            />
            <div className="min-w-0">
              <p className="font-mono text-[11px] font-medium uppercase tracking-[0.2em] text-slate-500">
                Yapılacaklar panosu
              </p>
              <h1 className="mt-2 font-display text-4xl font-semibold leading-tight tracking-tight text-white sm:text-5xl">
                Bugün neyi{' '}
                <span className="bg-gradient-to-r from-amber-300 via-orange-300 to-rose-300 bg-clip-text text-transparent">
                  bitireceksin?
                </span>
              </h1>
              <p className="mt-4 max-w-lg text-balance text-base text-slate-400 sm:text-lg">
                Görevleri ekle, düzenle, tamamla veya sil. Kartlara tıklayarak
                listeyi filtreleyebilirsin.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setSimdi(new Date())}
            className="group shrink-0 rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.08] to-transparent px-5 py-4 text-left shadow-inset backdrop-blur-md transition duration-200 hover:border-amber-400/25 hover:shadow-lg active:scale-[0.98] sm:text-right"
            title="Saati güncelle"
          >
            <p className="text-sm font-medium capitalize leading-snug text-slate-200 transition group-hover:text-white">
              {gun}
            </p>
            <p className="mt-1 font-mono text-2xl font-semibold tabular-nums tracking-tight text-amber-200 transition group-hover:text-amber-100">
              {saat}
            </p>
            <p className="mt-2 text-[10px] text-slate-500 opacity-0 transition group-hover:opacity-100">
              Tıkla — saati yenile
            </p>
          </button>
        </div>

        <div className="mt-8 space-y-4">
          <div
            className="flex flex-wrap gap-3"
            role="tablist"
            aria-label="Görev filtresi"
          >
            <button
              type="button"
              role="tab"
              aria-selected={filtre === 'hepsi'}
              onClick={() => setFiltre('hepsi')}
              className={kartSinifi(filtre === 'hepsi')}
            >
              <p className="text-2xl font-semibold tabular-nums text-white">
                {toplam}
              </p>
              <p className="text-xs font-medium uppercase tracking-wider text-slate-500">
                Tümü
              </p>
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={filtre === 'acik'}
              onClick={() => setFiltre('acik')}
              className={kartSinifi(filtre === 'acik')}
            >
              <p className="text-2xl font-semibold tabular-nums text-sky-200">
                {acikSayisi}
              </p>
              <p className="text-xs font-medium uppercase tracking-wider text-sky-400/70">
                Devam eden
              </p>
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={filtre === 'tamam'}
              onClick={() => setFiltre('tamam')}
              className={kartSinifi(filtre === 'tamam')}
            >
              <p className="text-2xl font-semibold tabular-nums text-emerald-200">
                {tamamlanan}
              </p>
              <p className="text-xs font-medium uppercase tracking-wider text-emerald-400/70">
                Tamamlanan
              </p>
            </button>
          </div>

          {toplam > 0 && (
            <div className="rounded-xl border border-white/5 bg-white/[0.03] px-4 py-3 transition hover:border-white/10">
              <div className="mb-2 flex justify-between text-xs text-slate-500">
                <span>İlerleme</span>
                <span className="font-mono text-slate-400">{yuzde}%</span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-white/10">
                <div
                  className={`h-full rounded-full bg-gradient-to-r from-emerald-400 to-teal-400 transition-[width] duration-500 ease-out ${hepsiBitti ? 'animate-pulse' : ''}`}
                  style={{ width: `${yuzde}%` }}
                />
              </div>
            </div>
          )}
        </div>
      </header>

      {hepsiBitti && (
        <div
          className="animate-fade-up mb-6 rounded-2xl border border-emerald-400/35 bg-gradient-to-r from-emerald-500/15 to-teal-500/10 px-5 py-4 shadow-lg shadow-emerald-900/20"
          role="status"
        >
          <p className="font-display text-lg text-emerald-100">
            Tüm görevler tamam — harika iş çıkardın.
          </p>
          <p className="mt-1 text-sm text-emerald-200/80">
            İstersen yeni görevler ekleyebilir veya tamamlananları listeden
            filtreleyebilirsin.
          </p>
        </div>
      )}

      <section className="animate-fade-up rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.09] to-white/[0.02] p-1 shadow-panel backdrop-blur-xl [animation-delay:80ms]">
        <div className="rounded-[1.35rem] bg-night-950/40 p-6 sm:p-8">
          <TodoForm onEkle={ekle} />
          <div className="mt-8">
            <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
              <h2 className="font-display text-xl font-medium text-white">
                Görev listesi
              </h2>
              <span className="inline-flex items-center gap-2 rounded-lg bg-white/5 px-2.5 py-1 font-mono text-xs font-medium text-slate-400">
                <span className="h-1.5 w-1.5 rounded-full bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.6)]" />
                {gorunen.length} / {toplam} görünür
              </span>
            </div>
            <TodoList
              kayitlar={gorunen}
              filtre={filtre}
              vurgulananId={sonEklenenId}
              sonToggleId={sonTikId}
              onGuncelle={guncelle}
              onTamamDegistir={tamamDegistir}
              onSil={sil}
              onFiltreTemizle={() => setFiltre('hepsi')}
            />
          </div>
        </div>
      </section>
    </div>
  )
}
