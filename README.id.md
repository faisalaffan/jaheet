<p align="center">
  <a href="README.md">🇬🇧 English</a>
</p>

<p align="center">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="assets/04_BANNER_DARK.png">
    <img src="assets/03_BANNER_LIGHT.png" alt="Jaheet Banner" width="100%">
  </picture>
</p>

<p align="center">
  <img src="assets/05_LOGO_TRANSPARENT.png" alt="Logo Jaheet" width="100">
</p>

<h1 align="center">Jaheet</h1>
<p align="center"><strong>ERP Ringan untuk Clothing &amp; Konveksi</strong></p>

<p align="center">
  <img src="https://img.shields.io/badge/go-1.23+-00ADD8?style=flat-square&logo=go&logoColor=white" alt="Go">
  <img src="https://img.shields.io/badge/react-19-61DAFB?style=flat-square&logo=react&logoColor=black" alt="React">
  <img src="https://img.shields.io/badge/typescript-5.8-3178C6?style=flat-square&logo=typescript&logoColor=white" alt="TypeScript">
  <img src="https://img.shields.io/badge/postgresql-16-4169E1?style=flat-square&logo=postgresql&logoColor=white" alt="PostgreSQL">
  <img src="https://img.shields.io/badge/tailwind-4-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white" alt="Tailwind">
  <img src="https://img.shields.io/badge/lisensi-MIT-green?style=flat-square" alt="Lisensi">
</p>

---

## Tentang

Jaheet adalah ERP ringan untuk bisnis clothing dan konveksi — manajemen produksi, inventaris, pembelian, pembayaran, dan akuntansi double-entry dalam satu sistem. Bukan sekadar aplikasi jahit. Ibaratnya **Shopify untuk UMKM garment Indonesia**.

## Filosofi Logo

Logo Jaheet bekerja karena dia tidak terlihat seperti "tukang jahit tradisional" — dia membaca sebagai **sistem operasional modern** untuk industri garment.

### 1. Pola Jahit = Produksi Garment

Bentuk coral zig-zag di atas merepresentasikan jalur jahitan (*stitch line*), alur produksi konveksi, dan kain yang bergerak melalui workflow manufaktur. Garis putus-putus putih memberi kesan presisi dan pola jahit — secara visual membaca sebagai **textile workflow**, bukan fashion lifestyle.

### 2. Grafik Batang = Akuntansi &amp; Intelijen Bisnis

Tiga batang vertikal indigo membentuk grafik pertumbuhan — laporan akuntansi, dashboard SaaS, metrik inventaris. Ini penting karena Jaheet adalah sistem ERP, bukan alat kerajinan. Grafik ini menegaskan identitas sebagai **software-first, bukan craft-first**.

### 3. Siluet Keseluruhan = Huruf "J"

Jahitan coral membentuk arah atas, batang biru membentuk fondasi — bersama-sama mengabstraksi huruf **"J"**. Ideal untuk memorabilitas, pengenalan app icon, favicon, dan branding fisik (bordir, stiker, kemasan).

### 4. Arah Naik = Pertumbuhan &amp; Skala

Komposisi diagonal naik ke kanan membawa psikologi visual pertumbuhan, efisiensi, dan scale-up UMKM. Secara bawah sadar, pengguna membaca: **"bisnis saya naik."**

### 5. Filosofi Warna

| Warna | Hex | Makna |
| --- | --- | --- |
| **Indigo** | `#2D3A8C` | Kepercayaan, akuntansi, presisi, keandalan enterprise |
| **Coral** | `#E8553E` | Kreativitas, energi produksi, sentuhan manusia, budaya tekstil Indonesia |

Indigo menjaga identitas tetap stabil dan profesional. Coral mencegahnya terasa dingin dan korporat — tetap dekat dengan komunitas konveksi.

### 6. Kenapa Ini Lebih Kuat dari Logo Garment Biasa

Kebanyakan logo garment memakai gunting, mesin jahit, atau siluet fashion — terlalu literal, terlalu UMKM lama, tidak scalable sebagai SaaS. Logo ini **abstrak, modular, dan tech-oriented** — cukup bersih untuk startup SaaS, cukup unik untuk diingat, dan fleksibel di mobile app, dashboard, invoice, label produksi, hingga kemasan.

> Tidak terlihat murahan ketika perusahaan naik kelas.

---

## Mulai Cepat

**Prasyarat:** Go 1.23+, Node.js 20+, pnpm, PostgreSQL 16 (atau Docker), [Atlas CLI](https://atlasgo.io/getting-started)

```bash
git clone https://github.com/faisalaffan/jaheet.git
cd jaheet

# 1. Jalankan database
docker compose up -d

# 2. Terapkan skema
cd backend && atlas schema apply --env local
go run ./cmd/api &        # API → http://localhost:8080

# 3. Jalankan frontend
cd ../frontend && pnpm install && pnpm dev   # UI → http://localhost:5173
```

---

## Arsitektur

```
Frontend (React 19 + Tailwind + shadcn/ui)
  └── Pages → Axios + TanStack React Query → /api/v1

Backend (Go + Chi)
  └── Handler → Service → Repository → PostgreSQL
                    └── Mesin Auto-Jurnal
```

## Lisensi

MIT
