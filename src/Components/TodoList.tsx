import { useState } from 'react'
import type { Todo } from '../Interfaces/Todo'
import type { GorevFiltresi } from '../Interfaces/GorevFiltresi'

type Props = {
  kayitlar: Todo[]
  filtre: GorevFiltresi
  /** yeni eklenen satırı kısa süre vurgula */
  vurgulananId: string | null
  sonToggleId: string | null
  onGuncelle: (id: string, yeniBaslik: string) => void
  onTamamDegistir: (id: string, tamam: boolean) => void
  onSil: (id: string) => void
  onFiltreTemizle: () => void
}

export function TodoList({
  kayitlar,
  filtre,
  vurgulananId,
  sonToggleId,
  onGuncelle,
  onTamamDegistir,
  onSil,
  onFiltreTemizle,
}: Props) {
  const [duzenlenenId, setDuzenlenenId] = useState<string | null>(null)
  const [taslak, setTaslak] = useState('')

  if (kayitlar.length === 0) {
    const filtreliBos = filtre !== 'hepsi'
    return (
      <div className="relative overflow-hidden rounded-2xl border border-dashed border-white/15 bg-white/[0.03] px-6 py-14 text-center transition-colors hover:border-white/25">
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-br from-amber-500/5 via-transparent to-violet-500/10"
          aria-hidden
        />
        <p className="font-display text-lg text-slate-300">
          {filtreliBos ? 'Bu görünümde görev yok' : 'Liste henüz boş'}
        </p>
        <p className="mx-auto mt-2 max-w-sm text-sm text-slate-500">
          {filtreliBos
            ? 'Başka bir filtre seç veya yeni görev ekle.'
            : 'Yukarıya ilk görevini yaz — küçük adımlar bile motivasyonu artırır.'}
        </p>
        {filtreliBos ? (
          <button
            type="button"
            onClick={onFiltreTemizle}
            className="mt-6 rounded-xl border border-amber-400/30 bg-amber-500/10 px-4 py-2 text-sm font-medium text-amber-200 transition hover:bg-amber-500/20"
          >
            Tüm görevleri göster
          </button>
        ) : (
          <div
            className="mx-auto mt-6 flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-2xl transition-transform hover:scale-105 hover:rotate-3"
            aria-hidden
          >
            📝
          </div>
        )}
      </div>
    )
  }

  return (
    <ul className="flex flex-col gap-3">
      {kayitlar.map((t) => {
        const duzenModu = duzenlenenId === t.id
        const yeniMi = vurgulananId === t.id
        const tikAnim = sonToggleId === t.id
        return (
          <li
            key={t.id}
            className={`group rounded-2xl border border-white/[0.08] bg-white/[0.04] p-4 shadow-inset backdrop-blur-sm transition-all duration-200 ease-out hover:z-[1] hover:-translate-y-0.5 hover:border-amber-400/25 hover:bg-white/[0.07] hover:shadow-lift sm:flex sm:items-center sm:justify-between sm:gap-4 ${
              yeniMi ? 'animate-pop ring-2 ring-amber-400/35' : ''
            } ${t.tamamlandi ? 'opacity-90' : ''}`}
          >
            <div className="flex min-w-0 flex-1 items-start gap-3.5">
              <input
                type="checkbox"
                checked={t.tamamlandi}
                onChange={(e) => onTamamDegistir(t.id, e.target.checked)}
                className={`mt-1 h-5 w-5 shrink-0 cursor-pointer rounded-md border-2 border-white/20 bg-white/5 text-amber-500 accent-amber-500 transition hover:scale-110 hover:border-amber-400/50 focus:ring-2 focus:ring-amber-400/30 ${tikAnim ? 'animate-check-flip' : ''}`}
                aria-label="Tamamlandı işareti"
              />
              {duzenModu ? (
                <input
                  value={taslak}
                  onChange={(e) => setTaslak(e.target.value)}
                  className="w-full rounded-xl border border-amber-400/30 bg-night-950/80 px-3 py-2 text-white outline-none ring-2 ring-amber-400/20"
                  autoFocus
                />
              ) : (
                <span
                  className={`inline-block transition-all duration-300 ${
                    t.tamamlandi
                      ? 'text-slate-500 line-through decoration-slate-500/50'
                      : 'text-slate-100'
                  }`}
                >
                  {t.baslik}
                </span>
              )}
            </div>
            <div className="mt-3 flex flex-wrap gap-2 sm:mt-0 sm:shrink-0 sm:opacity-80 sm:transition-opacity sm:duration-200 sm:group-hover:opacity-100">
              {duzenModu ? (
                <>
                  <button
                    type="button"
                    onClick={() => {
                      onGuncelle(t.id, taslak)
                      setDuzenlenenId(null)
                    }}
                    className="rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 px-3.5 py-2 text-xs font-semibold text-night-950 shadow-md shadow-emerald-500/20 transition hover:brightness-110 active:scale-95"
                  >
                    Kaydet
                  </button>
                  <button
                    type="button"
                    onClick={() => setDuzenlenenId(null)}
                    className="rounded-xl border border-white/15 bg-white/5 px-3.5 py-2 text-xs font-medium text-slate-300 transition hover:bg-white/10 active:scale-95"
                  >
                    Vazgeç
                  </button>
                </>
              ) : (
                <>
                  <button
                    type="button"
                    onClick={() => {
                      setDuzenlenenId(t.id)
                      setTaslak(t.baslik)
                    }}
                    className="rounded-xl border border-white/15 bg-white/5 px-3.5 py-2 text-xs font-medium text-slate-200 transition hover:border-amber-400/40 hover:text-amber-200 active:scale-95"
                  >
                    Düzenle
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      if (confirm('Bu satırı silmek istediğine emin misin?')) {
                        onSil(t.id)
                      }
                    }}
                    className="rounded-xl border border-rose-500/30 bg-rose-500/10 px-3.5 py-2 text-xs font-medium text-rose-200 transition hover:bg-rose-500/25 active:scale-95"
                  >
                    Sil
                  </button>
                </>
              )}
            </div>
          </li>
        )
      })}
    </ul>
  )
}
