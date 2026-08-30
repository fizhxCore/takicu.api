import type { Context, Next } from 'hono'
import { settings } from '../config/setting.js'
import { isDynamicApiKey } from './apiKeyStore.ts'

export const apiKeyAuth = async (c: Context, next: Next) => {
    // Lewati cek apikey untuk endpoint OpenAPI spec, dokumentasi, webhook internal,
    // & redirect shortlink (itu diklik orang lain, bukan cuma pemilik apikey)
    const path = c.req.path
    if (path === '/openapi.json' || path.startsWith('/docs') || path === '/api/telegram-webhook' || path.startsWith('/api/s/')) {
        return await next()
    }

    const apiKey = c.req.query('apikey') || c.req.header('x-api-key')

    if (!apiKey) {
        return c.json({
            status: false,
            error: 'Unauthorized',
            message: 'API Key is missing. Please provide apikey query parameter (e.g. ?apikey=takicu).'
        }, 401)
    }

    // Cek key statis (settings.js) dulu karena instan, baru cek key dinamis
    // (dibuat lewat bot Telegram, disimpen di Redis) kalau nggak ketemu di situ
    const isValid = settings.validApiKeys.includes(apiKey) || await isDynamicApiKey(apiKey)

    if (!isValid) {
        return c.json({
            status: false,
            error: 'Forbidden',
            message: 'Invalid API Key provided.'
        }, 403)
    }

    await next()
}
