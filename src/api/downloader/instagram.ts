import { createRoute, z } from '@hono/zod-openapi'
import type { Context } from 'hono'

export const instagramRoute = createRoute({
    method: 'get',
    path: '/api/downloader/instagram',
    summary: 'Instagram Downloader',
    description: 'Download Instagram photos/reels/videos from a public post URL.',
    tags: ['Downloader'],
    'x-status': 'ONLINE',
    request: {
        query: z.object({
            url: z.string().openapi({
                example: 'https://www.instagram.com/p/xxxxxxxxxxx/',
                description: 'Instagram Post/Reel URL'
            }),
            apikey: z.string().openapi({
                example: 'takicu',
                description: 'Valid API Key'
            })
        })
    },
    responses: {
        200: {
            description: 'Instagram media download links',
            content: {
                'application/json': {
                    schema: z.object({
                        status: z.boolean().openapi({ example: true }),
                        media: z.array(z.object({
                            type: z.string().openapi({ example: 'video' }),
                            url: z.string()
                        }))
                    })
                }
            }
        },
        400: { description: 'Missing or invalid URL parameter' },
        500: { description: 'Failed to fetch Instagram media' }
    }
})

export const instagramHandler = async (c: Context) => {
    const postUrl = c.req.query('url')
    if (!postUrl) {
        return c.json({ status: false, error: 'Query parameter "url" is required' }, 400)
    }

    try {
        // Pakai endpoint publik yang sama gayanya kayak tikwm buat TikTok.
        // CATATAN JUJUR: beda dari tiktok.ts (yang sudah lama jalan di base
        // aslinya), endpoint pihak-ketiga ini BELUM sempat dites langsung
        // (sandbox pengembangan nggak ada akses internet keluar). Kalau
        // setelah deploy ternyata responnya beda/gagal, kirim contoh JSON
        // error-nya, gampang disesuaikan.
        const apiUrl = `https://api.tiklydown.eu.org/api/download/v2?url=${encodeURIComponent(postUrl)}`
        const res = await fetch(apiUrl, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
            }
        })

        if (!res.ok) {
            return c.json({ status: false, error: `Provider API Error: ${res.statusText}` }, 500)
        }

        const data = await res.json()
        const items = data?.media || data?.result?.media || (Array.isArray(data?.result) ? data.result : null)

        if (!items || !Array.isArray(items) || items.length === 0) {
            return c.json({ status: false, error: 'Failed to fetch Instagram media, atau post-nya private/tidak valid' }, 500)
        }

        return c.json({
            status: true,
            media: items.map((m: any) => ({
                type: m.type || (m.url?.includes('.mp4') ? 'video' : 'image'),
                url: m.url || m.download_url || ''
            }))
        }, 200)
    } catch (err) {
        return c.json({ status: false, error: err.message || 'Internal Server Error' }, 500)
    }
}
