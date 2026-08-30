import { createRoute, z } from '@hono/zod-openapi'
import type { Context } from 'hono'
import { randomBytes } from 'node:crypto'
import { getRedisClient, isRedisConfigured } from '../../utils/apiKeyStore.ts'
import { settings } from '../../config/setting.js'

const REDIS_PREFIX = 'takicu:shortlink:'

export const shortenRoute = createRoute({
    method: 'get',
    path: '/api/tools/shorten',
    summary: 'Create Short Link',
    description: 'Shorten a long URL into a compact redirect link. Requires Redis (Upstash) to be configured.',
    tags: ['Tools'],
    'x-status': 'ONLINE',
    request: {
        query: z.object({
            url: z.string().openapi({
                example: 'https://example.com/a/very/long/path?with=params',
                description: 'The long URL to shorten'
            }),
            apikey: z.string().openapi({
                example: 'takicu',
                description: 'Valid API Key'
            })
        })
    },
    responses: {
        200: {
            description: 'Shortened link created',
            content: {
                'application/json': {
                    schema: z.object({
                        status: z.boolean().openapi({ example: true }),
                        short_url: z.string().openapi({ example: 'https://api.takicu.id/api/s/aB3xY9' }),
                        original_url: z.string()
                    })
                }
            }
        },
        400: { description: 'Missing or invalid "url" parameter' },
        503: { description: 'Redis belum dikonfigurasi' }
    }
})

export const shortenHandler = async (c: Context) => {
    if (!isRedisConfigured()) {
        return c.json({
            status: false,
            error: 'Fitur shortlink butuh Redis (Upstash) yang belum ke-setup. Cek README bagian storage setup.'
        }, 503)
    }

    const longUrl = c.req.query('url')
    if (!longUrl || !/^https?:\/\//i.test(longUrl)) {
        return c.json({ status: false, error: 'Query parameter "url" wajib diisi & harus URL valid (http/https)' }, 400)
    }

    try {
        const redis = getRedisClient()
        const code = randomBytes(4).toString('hex')
        await redis.set(`${REDIS_PREFIX}${code}`, longUrl)

        return c.json({
            status: true,
            short_url: `https://${settings.apiUrl}/api/s/${code}`,
            original_url: longUrl
        }, 200)
    } catch (err) {
        return c.json({ status: false, error: err.message || 'Internal Server Error' }, 500)
    }
}

// Rute redirect - sengaja TANPA apikey (dicek skip-list di apiKeyAuth.ts)
// karena ini yang bakal diklik orang lain, bukan cuma pemilik API key
export const shortlinkRedirectRoute = createRoute({
    method: 'get',
    path: '/api/s/{code}',
    summary: 'Resolve Short Link',
    description: 'Redirects to the original URL for a given short code. No API key required (public redirect).',
    tags: ['Tools'],
    'x-status': 'ONLINE',
    request: {
        params: z.object({
            code: z.string().openapi({ example: 'aB3xY9' })
        })
    },
    responses: {
        302: { description: 'Redirect to original URL' },
        404: { description: 'Short code not found' }
    }
})

export const shortlinkRedirectHandler = async (c: Context) => {
    const code = c.req.param('code')
    const redis = getRedisClient()
    if (!redis) {
        return c.json({ status: false, error: 'Redis belum dikonfigurasi' }, 503)
    }
    try {
        const longUrl = await redis.get(`${REDIS_PREFIX}${code}`)
        if (!longUrl) {
            return c.json({ status: false, error: 'Short link tidak ditemukan atau sudah kadaluarsa' }, 404)
        }
        return c.redirect(String(longUrl), 302)
    } catch (err) {
        return c.json({ status: false, error: err.message || 'Internal Server Error' }, 500)
    }
}
