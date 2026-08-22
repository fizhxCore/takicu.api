import { OpenAPIHono } from '@hono/zod-openapi'
import { cors } from 'hono/cors'
import { secureHeaders } from 'hono/secure-headers'
import { settings } from './config/setting.js'

// --------- API ROUTES ---------
import { statsRoute, statsHandler } from './api/stats/routes.ts'
import { cosplayRoute, cosplayHandler } from './api/random/cosplay.ts'
import { tiktokRoute, tiktokHandler } from './api/downloader/tiktok.ts'

// --------- UTILS ---------
import { logApiRequest } from './utils/logApiRequest.ts'
import { rateLimiter } from './utils/rateLimit.ts'
import { prettyPrint } from './utils/pretty.ts'
import { apiKeyAuth } from './utils/apiKeyAuth.ts'
import logger from './utils/logger.ts'
import { register } from './utils/route.ts'
import { telegramWebhookHandler } from './utils/telegramBotListener.ts'

const app = new OpenAPIHono()

app.use('*', secureHeaders())
app.use('*', cors())
app.use('*', logApiRequest)
app.use('*', rateLimiter())
app.use('*', prettyPrint)
app.use('/api/*', apiKeyAuth)

// --------- REGISTER ROUTES ---------
register(app, statsRoute, statsHandler)
register(app, cosplayRoute, cosplayHandler)
register(app, tiktokRoute, tiktokHandler)

// Webhook internal buat command Telegram (/stats, /ping). Sengaja di bawah
// /api/* (bukan di luar) karena di Next.js/Vercel cuma path /api/* yang
// diteruskan ke Hono (lihat app/api/[...route]/route.js) — apiKeyAuth &
// logApiRequest sudah di-skip khusus buat path ini, lihat file masing-masing.
app.post('/api/telegram-webhook', telegramWebhookHandler)

const openApiConfig = {
    openapi: '3.0.0',
    info: {
        version: settings.version,
        title: `${settings.name} - RESTful Service Documentation`,
        description: 'Simple, reliable, & high-performance REST API services built with Next.js 16, Hono.js, & NJS Engine.',
        contact: {
            name: settings.creator,
            url: settings.supportUrl
        }
    },
    servers: [
        {
            url: settings.baseUrl,
            description: 'Production Server'
        },
        {
            url: 'http://localhost:3000',
            description: 'Local Server'
        }
    ]
}

app.doc('/openapi.json', openApiConfig)

app.onError((err, c) => {
    logger.error(`[Error] ${err.message}`)
    return c.json({
        error: 'Internal Server Error',
        message: err.message,
        status: 500
    }, 500)
})

export default app
