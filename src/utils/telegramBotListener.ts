import type { Context } from 'hono'
import { sendTelegramLog } from './telegramNotifier.ts'
import { settings } from '../config/setting.js'
import { generateApiKey, addApiKey, listApiKeys, revokeApiKey, isRedisConfigured } from './apiKeyStore.ts'

const OWNER_ID = process.env.TELEGRAM_OWNER_ID
const WEBHOOK_SECRET = process.env.TELEGRAM_WEBHOOK_SECRET

let totalRequestsCount = 0
const startTime = Date.now()

export function incrementHitCount() {
    totalRequestsCount++
}

export function getHitStats() {
    const uptimeSeconds = Math.floor((Date.now() - startTime) / 1000)
    const hours = Math.floor(uptimeSeconds / 3600)
    const minutes = Math.floor((uptimeSeconds % 3600) / 60)
    const seconds = uptimeSeconds % 60
    return {
        totalHits: totalRequestsCount,
        uptime: `${hours}h ${minutes}m ${seconds}s`
    }
}

const NO_REDIS_MSG = `⚠️ Fitur API key dinamis butuh Redis (Upstash) yang belum ke-setup di project ini. Cek README bagian "API Key Dinamis via Bot" buat cara pasangnya (gratis, cuma beberapa menit).`

// Proses satu command dari owner (dipanggil dari webhook, bukan polling lagi —
// polling loop (while true) nggak kompatibel sama serverless/Vercel karena
// function-nya cuma hidup sebentar per-request, nggak bisa nahan koneksi lama)
async function handleOwnerCommand(message) {
    if (!message || !message.chat || String(message.chat.id) !== String(OWNER_ID) || !message.text) return

    const command = message.text.trim()
    const [cmd, ...args] = command.split(/\s+/)

    if (cmd === '/stats' || cmd === '/status') {
        const stats = getHitStats()
        const replyMsg = `<b>📊 ${settings.name} Live Status</b>
-------------------------------
<b>Total API Hits:</b> <code>${stats.totalHits}</code>
<b>Server Uptime:</b> <code>${stats.uptime}</code>
<b>Status:</b> 🟢 ONLINE & Healthy`
        await sendTelegramLog(replyMsg)
    } else if (cmd === '/ping') {
        await sendTelegramLog(`🏓 <b>Pong!</b> Server ${settings.name} is active.`)
    } else if (cmd === '/newkey') {
        if (!isRedisConfigured()) return sendTelegramLog(NO_REDIS_MSG)
        const key = generateApiKey()
        const ok = await addApiKey(key)
        await sendTelegramLog(ok
            ? `✅ <b>API Key baru dibuat:</b>\n<code>${key}</code>\n\nLangsung bisa dipakai buat akses ${settings.apiUrl}.`
            : `❌ Gagal nyimpen key baru, coba lagi sebentar lagi.`)
    } else if (cmd === '/listkeys') {
        if (!isRedisConfigured()) return sendTelegramLog(NO_REDIS_MSG)
        const keys = await listApiKeys()
        const list = keys.length ? keys.map(k => `• <code>${k}</code>`).join('\n') : '(belum ada key dinamis)'
        await sendTelegramLog(`<b>🔑 API Key Dinamis Aktif</b>\n${list}\n\n<i>Key statis di settings.js nggak ditampilkan di sini.</i>`)
    } else if (cmd === '/revokekey') {
        if (!isRedisConfigured()) return sendTelegramLog(NO_REDIS_MSG)
        const target = args[0]
        if (!target) return sendTelegramLog('Format: <code>/revokekey tkc_xxxxx</code>')
        const removed = await revokeApiKey(target)
        await sendTelegramLog(removed
            ? `✅ Key <code>${target}</code> berhasil dicabut.`
            : `❌ Key nggak ketemu (mungkin udah dicabut sebelumnya, atau itu key statis yang emang nggak bisa dicabut lewat sini).`)
    }
}

// Endpoint webhook — Telegram yang panggil kita tiap ada pesan baru,
// bukan kita yang nanya-nanya terus (polling). Cocok buat serverless.
export async function telegramWebhookHandler(c: Context) {
    if (WEBHOOK_SECRET) {
        const secret = c.req.header('x-telegram-bot-api-secret-token')
        if (secret !== WEBHOOK_SECRET) {
            return c.json({ ok: false }, 401)
        }
    }

    const update = await c.req.json().catch(() => null)
    if (update?.message) {
        await handleOwnerCommand(update.message).catch(() => {})
    }

    return c.json({ ok: true })
}
