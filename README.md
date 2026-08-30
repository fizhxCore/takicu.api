# ✨ Takicu API ✨

**High-Performance. Scalable. Type-Safe. REST API Platform.**
*Powered by Next.js 16, Hono.js, NJS (Node.js/Bun), Zod Schema, & Swagger OpenAPI 3.0.0*

[![Official Website](https://img.shields.io/badge/Official_Website-api.takicu.id-2563eb?style=for-the-badge&logo=fastapi&logoColor=white)](https://api.takicu.id)
[![GitHub Repository](https://img.shields.io/badge/GitHub-Repository-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/username-kamu/takicu-api)
[![WhatsApp Channel](https://img.shields.io/badge/WhatsApp-Channel-25D366?style=for-the-badge&logo=whatsapp&logoColor=white)](https://whatsapp.com/channel/ganti-link-channel-1)
[![Telegram Contact](https://img.shields.io/badge/Telegram-Owner_Contact-26A5E4?style=for-the-badge&logo=telegram&logoColor=white)](https://t.me/username_telegram_kamu)

![Next.js 16](https://img.shields.io/badge/Framework-Next.js_16-000000?style=flat-square&logo=nextdotjs&logoColor=white)
![Hono.js](https://img.shields.io/badge/Backend-Hono.js-Flame-orange?style=flat-square&logo=hono&logoColor=white)
![Node.js](https://img.shields.io/badge/Engine-NJS_%2F_Node.js-339933?style=flat-square&logo=nodedotjs&logoColor=white)
![Swagger OpenAPI 3.0](https://img.shields.io/badge/Documentation-Swagger_OpenAPI_3.0-85EA2D?style=flat-square&logo=swagger&logoColor=black)
![TypeScript](https://img.shields.io/badge/Language-TypeScript_Strict-3178C6?style=flat-square&logo=typescript&logoColor=white)
![Zod](https://img.shields.io/badge/Validation-Zod-3E67B1?style=flat-square&logo=zod&logoColor=white)
![MIT License](https://img.shields.io/badge/License-MIT-green?style=flat-square&logo=open-source-initiative&logoColor=white)

> ⚠️ **Catatan:** semua link (website, GitHub, WhatsApp, Telegram) di atas masih placeholder.
> Ganti dengan data asli kamu di `src/config/setting.js`, lalu update juga badge di README ini.

---

## 🌟 FITUR UNGGULAN (FEATURES)

| Fitur | Status | Deskripsi |
| :--- | :---: | :--- |
| **⚡ Ultrafast NJS Engine** | ![Latency](https://img.shields.io/badge/Latency-%3C50ms-emerald) | Backend ditenagai NJS / Node.js & Hono.js untuk latensi eksekusi rendah di `api.takicu.id`. |
| **📘 Swagger OpenAPI 3.0** | ![Specs](https://img.shields.io/badge/Specs-Swagger_3.0-green) | Dokumentasi OpenAPI 3.0 standar industri dengan interaksi coba endpoint langsung. |
| **🛡️ API Key Protection** | ![Auth](https://img.shields.io/badge/Auth-API_Key-blue) | Proteksi middleware API Key (`?apikey=takicu`) pada seluruh rute `/api/*`. |
| **✨ Structured JSON Header** | ![Format](https://img.shields.io/badge/Format-Structured_JSON-purple) | Setiap respon JSON menyertakan header properti `creator` yang bisa kamu atur di `setting.js`. |
| **🔑 Interactive Playground** | ![Docs](https://img.shields.io/badge/Docs-Playground-indigo) | Input API Key global, tag filter kategori, & latensi eksekusi `ms`. |
| **🤖 Telegram Request Log** | ![Notifier](https://img.shields.io/badge/Notifier-Telegram_Bot-sky) | Log notifikasi otomatis ke owner via Telegram Bot dan balasan perintah `/stats` & `/ping`. |
| **🖼️ Auto-Responsive Render** | ![Media](https://img.shields.io/badge/Media-Stream-pink) | Render foto hasil endpoint gambar otomatis mengikuti rasio & ukuran asli gambar tanpa terdistorsi. |

---

## 📦 PANDUAN SETUP & INSTALASI (TERMUX & VPS LINUX)

### 📲 Setup di Termux (Android):

```bash
# 1. Update package repository & install Node.js + Git
pkg update -y && pkg upgrade -y
pkg install nodejs-lts git -y

# 2. Clone repository & masuk ke direktori
git clone https://github.com/username-kamu/takicu-api.git
cd takicu-api

# 3. Install dependensi proyek
npm install

# 4. Salin environment file
cp .env.example .env

# 5. Jalankan server (Mode Production)
npm run build && npm start
```

### 🖥️ Setup di VPS Linux (Ubuntu / Debian):

```bash
# 1. Update paket sistem & install Node.js 20+ via NodeSource
sudo apt update && sudo apt upgrade -y
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs git pm2 -g

# 2. Clone repository & masuk ke direktori
git clone https://github.com/username-kamu/takicu-api.git
cd takicu-api

# 3. Install dependensi proyek
npm install

# 4. Salin environment file & sesuaikan TELEGRAM_BOT_TOKEN
cp .env.example .env

# 5. Build proyek & jalankan 24/7 menggunakan PM2
npm run build
pm2 start npm --name "takicu-api" -- start
pm2 save && pm2 startup
```

---

## ▲ DEPLOY KE VERCEL

Proyek ini sudah kompatibel dengan Vercel out-of-the-box — routing Hono-nya jalan lewat
adapter resmi `hono/vercel` di `app/api/[...route]/route.js`, jadi nggak perlu `vercel.json` tambahan.

### Langkah deploy:
1. Push project ini ke repo GitHub kamu sendiri (ganti dulu placeholder di `package.json` & `README.md`)
2. Buka [vercel.com/new](https://vercel.com/new), import repo tersebut — Vercel otomatis mendeteksi Next.js
3. Sebelum klik **Deploy**, buka bagian **Environment Variables**, isi:
   - `TELEGRAM_BOT_TOKEN` — token dari [@BotFather](https://t.me/BotFather)
   - `TELEGRAM_OWNER_ID` — user ID Telegram kamu (cek via [@userinfobot](https://t.me/userinfobot))
   - `TELEGRAM_WEBHOOK_SECRET` — bebas isi string acak, buat verifikasi webhook
4. Klik **Deploy**, tunggu build selesai, kamu akan dapat URL seperti `https://takicu-api.vercel.app`
5. Lanjut ke bagian **Setup Telegram Bot** di bawah — wajib, apapun cara deploy-nya (Vercel/VPS)

---

## 🤖 SETUP TELEGRAM BOT (WAJIB, 1x SAJA, BERLAKU UNTUK VPS MAUPUN VERCEL)

Bot Telegram di proyek ini jalan lewat **webhook**, bukan polling — polling (`while true`)
cuma cocok buat server yang nyala terus (VPS), sedangkan serverless function di Vercel cuma
hidup sebentar per-request jadi nggak bisa nahan koneksi lama. Daripada bikin dua cara
berbeda, proyek ini pakai webhook buat kedua-duanya. Konsekuensinya: siapapun kamu, VPS
ataupun Vercel, wajib daftarin URL webhook ke Telegram **sekali** lewat curl/browser setelah
server-nya bisa diakses publik via HTTPS:

```bash
curl "https://api.telegram.org/bot<TELEGRAM_BOT_TOKEN>/setWebhook?url=https://domain-kamu/api/telegram-webhook&secret_token=<TELEGRAM_WEBHOOK_SECRET>"
```

Ganti `<TELEGRAM_BOT_TOKEN>`, `domain-kamu` (domain VPS atau `*.vercel.app` kamu), dan
`<TELEGRAM_WEBHOOK_SECRET>` sesuai punya kamu. Kalau berhasil, command `/stats` & `/ping`
ke bot kamu di Telegram akan langsung dibalas.

> 💡 Testing lokal (`npm run dev`) nggak bisa nerima webhook asli dari Telegram karena Telegram
> butuh URL HTTPS publik — kalau mau tes fitur bot pas develop lokal, pakai tunnel seperti
> [ngrok](https://ngrok.com) dulu. Endpoint API utama (`/api/stats`, dll) tetap jalan normal tanpa itu.

> ⚠️ **Catatan skala:** rate limiter & hit counter (`/stats`) disimpan di memory, jadi di Vercel
> nilainya reset tiap cold start & nggak sama persis antar-instance. Cukup buat proyek kecil-menengah;
> kalau butuh hitungan yang benar-benar global & konsisten, pertimbangkan ganti ke Vercel KV / Upstash Redis.

---

Proyek ini menggunakan **Hono OpenAPI & Zod Schema**. Ikuti panduan mudah berikut untuk menambahkan endpoint baru:

### 1. Buat File Handler Baru di `src/api/<kategori>/<nama>.ts`

```typescript
// File: src/api/general/quote.ts
import { createRoute, z } from '@hono/zod-openapi'
import type { Context } from 'hono'
import { settings } from '../../config/setting.js'

// Define OpenAPI Schema Route
export const quoteRoute = createRoute({
    method: 'get',
    path: '/api/general/quote',
    summary: 'Random Quote Endpoint',
    description: 'Mengembalikan kata-kata bijak acak beserta pembuatnya',
    tags: ['General'],
    'x-status': 'ONLINE',
    request: {
        query: z.object({
            apikey: z.string().openapi({ example: settings.apiKey, description: 'Valid API Key' })
        })
    },
    responses: {
        200: {
            content: {
                'application/json': {
                    schema: z.object({
                        status: z.boolean().openapi({ example: true }),
                        quote: z.string().openapi({ example: 'Tetap semangat pantang menyerah.' }),
                        author: z.string().openapi({ example: settings.creator })
                    })
                }
            },
            description: 'Berhasil mendapatkan quote'
        }
    }
})

// Define Execution Handler
export const quoteHandler = async (c: Context) => {
    return c.json({
        status: true,
        quote: 'Kembangkan potensimu tanpa batas bersama Takicu API.',
        author: settings.creator
    }, 200)
}
```

### 2. Daftarkan Rute di `src/app.js`

```javascript
// File: src/app.js
import { quoteRoute, quoteHandler } from './api/general/quote.ts'

// Register Rute Baru
register(app, quoteRoute, quoteHandler)
```

---

## 🗝️ API KEY DINAMIS VIA BOT (OPSIONAL)

Selain API key statis di `src/config/setting.js`, proyek ini bisa bikin & cabut API key
langsung dari chat Telegram — cocok kalau mau bagi-bagiin key ke orang lain tanpa harus
edit kode & redeploy tiap kali. Key dinamis ini disimpen di Redis (Vercel KV sudah tidak
tersedia lagi per akhir 2024, jadi lewat **Upstash Redis** dari Vercel Marketplace).

### Setup (sekali saja, ~2 menit, ada tier gratisnya):
1. Buka dashboard project kamu di Vercel → tab **Storage** → **Create Database**
2. Pilih **Upstash** → **Redis** (biarin Vercel yang urus akun Upstash-nya, paling gampang)
3. Setelah dibuat, hubungkan database itu ke project `takicu-api` kamu — env var
   `KV_REST_API_URL` & `KV_REST_API_TOKEN` (atau `UPSTASH_REDIS_REST_*`) otomatis ke-inject
4. **Redeploy** project-nya (env var baru cuma kepakai setelah redeploy)

### Command bot yang tersedia (chat langsung ke bot kamu, cuma owner yang bisa pakai):
| Command | Fungsi |
| :--- | :--- |
| `/newkey` | Generate 1 API key baru & simpen ke Redis, langsung aktif |
| `/listkeys` | Lihat semua API key dinamis yang lagi aktif |
| `/revokekey <key>` | Cabut/nonaktifin 1 API key dinamis |

> 💡 Key statis (`settings.validApiKeys`) nggak kena pengaruh sama sekali & nggak bisa
> dicabut lewat bot — dua sistem ini jalan berdampingan. Kalau Redis belum di-setup,
> ketiga command di atas bakal balas kasih tau caranya, bukan error diam-diam.

---

## 📚 DAFTAR ENDPOINT

| Endpoint | Kategori | Keterangan |
| :--- | :--- | :--- |
| `GET /api/stats` | System | Info sistem server (uptime, platform, dll) |
| `GET /api/random/cosplay` | Random | Gambar cosplay acak |
| `GET /api/random/quotes` | Random | Kata-kata/peribahasa Indonesia acak |
| `GET /api/downloader/tiktok` | Downloader | Download video TikTok tanpa watermark |
| `GET /api/downloader/instagram` | Downloader | Download foto/reels Instagram |
| `GET /api/tools/qrcode` | Tools | Generate QR code (self-hosted, gambar PNG) |
| `GET /api/tools/shorten` | Tools | Bikin short link (butuh Redis) |
| `GET /api/s/{code}` | Tools | Redirect short link (publik, tanpa apikey) |

Detail lengkap tiap parameter & contoh coba-langsung ada di halaman `/docs` setelah server jalan.

---

## 🔑 CARA PENGGUNAAN API (QUICK START)

Seluruh endpoint API yang berada di bawah rute `/api/*` memerlukan query parameter `apikey`:

- **Official Domain:** `https://api.takicu.id`
- **Default API Key:** `takicu`

### 💻 Contoh Request cURL:
```bash
curl -X GET "https://api.takicu.id/api/stats?apikey=takicu"
```

### 📄 Contoh Respon JSON:
```json
{
    "creator": "Takicu Team",
    "status": "online",
    "system": {
        "platform": "linux",
        "arch": "x64",
        "uptime": "12h 45m"
    },
    "cpu": {
        "cores": 8,
        "model": "ARMv8 Processor"
    }
}
```

---

## 📢 OFFICIAL WHATSAPP CHANNELS & KONTAK

Semua tautan di bawah ini **placeholder** — atur nilai aslinya sekali saja di `src/config/setting.js`
(bagian `channels` & `contacts`), lalu seluruh halaman (footer, navbar, TQTO) otomatis ikut ter-update.

| Platform | Keterangan |
| :---: | :--- |
| ![WhatsApp](https://img.shields.io/badge/WhatsApp-25D366?style=flat-square&logo=whatsapp&logoColor=white) | Channel utama — `settings.channels.main` |
| ![WhatsApp](https://img.shields.io/badge/WhatsApp-25D366?style=flat-square&logo=whatsapp&logoColor=white) | Channel cadangan — `settings.channels.second` |
| ![WhatsApp](https://img.shields.io/badge/WhatsApp-25D366?style=flat-square&logo=whatsapp&logoColor=white) | Channel support — `settings.channels.third` |
| ![Telegram](https://img.shields.io/badge/Telegram-26A5E4?style=flat-square&logo=telegram&logoColor=white) | Kontak developer — `settings.contacts.tele1/2/3` |

---

## 🙏 CREDITS

Basis kode proyek ini awalnya dikembangkan dari **Kyzz APIs v2** oleh **Mommy Kyuu**
([github.com/RynnStecu/kyzz-apisv2](https://github.com/RynnStecu/kyzz-apisv2)), dirilis di bawah
lisensi MIT, lalu dikembangkan & di-rebrand menjadi **Takicu API**.

---

## 📜 LISENSI (LICENSE)

Proyek ini dilindungi di bawah lisensi [MIT License](LICENSE). Kamu bebas menggunakan, memodifikasi,
dan mendistribusikan proyek ini. Karena basis kodenya berasal dari karya open-source pihak lain,
notice hak cipta asli di file `LICENSE` **tetap dipertahankan apa adanya** sesuai ketentuan lisensi MIT
— ini tidak menghalangi kamu untuk mem-branding ulang produk/tampilannya sebagai Takicu API.

---

**Developed with ❤️ by Takicu Team**
*Takicu API © 2026.*
