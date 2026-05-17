# Bölüm 2 — Yapılacaklar (React + CRUD)

Yönergedeki gibi **React**, **Tailwind CSS** ve klasör yapısı `Components`, `Pages`, `Interfaces` kullanılıyor. Uygulama tarayıcıda **ekle / listele / güncelle / sil** işlemlerini yapıyor; veriler `localStorage` ile saklanıyor.

## Çalıştırma

```bash
npm install
npm run dev
```

Derleme: `npm run build` — çıktı `dist` klasöründe.

## Netlify

Repoyu GitHub’a public olarak yükledikten sonra Netlify’da “Import from Git” ile bağlayabilirsin. Bu repoda `netlify.toml` var; build komutu `npm run build`, publish klasörü `dist`.

## Teslim notları

- En az bir **ekran görüntüsünü** repoya (ör. `ekran-goruntuleri/` altına) eklemeyi unutma.
- Teslim formuna **GitHub** ve canlı site (**Netlify** vb.) linklerini yaz.

## Klasör yapısı

- `src/Components` — form ve liste bileşenleri  
- `src/Pages` — ana sayfa mantığı  
- `src/Interfaces` — `Todo` tipi  
