import type { Context } from 'hono'
import { sendTelegramLog } from './telegramNotifier.js'
import { settings } from '../config/setting.js'

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

// Proses satu command dari owner (dipanggil dari webhook, bukan polling lagi —
// polling loop (while true) nggak kompatibel sama serverless/Vercel karena
// function-nya cuma hidup sebentar per-request, nggak bisa nahan koneksi lama)
async function handleOwnerCommand(message) {
    if (!message || !message.chat || String(message.chat.id) !== String(OWNER_ID) || !message.text) return

    const command = message.text.trim()
    if (command === '/stats' || command === '/status') {
        const stats = getHitStats()
        const replyMsg = `<b>📊 ${settings.name} Live Status</b>
-------------------------------
<b>Total API Hits:</b> <code>${stats.totalHits}</code>
<b>Server Uptime:</b> <code>${stats.uptime}</code>
<b>Status:</b> 🟢 ONLINE & Healthy`
        await sendTelegramLog(replyMsg)
    } else if (command === '/ping') {
        await sendTelegramLog(`🏓 <b>Pong!</b> Server ${settings.name} is active.`)
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
