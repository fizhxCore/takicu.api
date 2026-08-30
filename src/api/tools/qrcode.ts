import { createRoute, z } from '@hono/zod-openapi'
import type { Context } from 'hono'
import QRCode from 'qrcode'

export const qrcodeRoute = createRoute({
    method: 'get',
    path: '/api/tools/qrcode',
    summary: 'QR Code Generator',
    description: 'Generate a QR code image (PNG) from any text or URL. Fully self-hosted, no third-party dependency.',
    tags: ['Tools'],
    'x-status': 'ONLINE',
    request: {
        query: z.object({
            text: z.string().openapi({
                example: 'https://takicu.id',
                description: 'Text or URL to encode'
            }),
            size: z.string().optional().openapi({
                example: '300',
                description: 'Image size in pixels (default 300, max 1000)'
            }),
            apikey: z.string().openapi({
                example: 'takicu',
                description: 'Valid API Key'
            })
        })
    },
    responses: {
        200: {
            description: 'Binary QR code image (PNG)',
            content: {
                'image/png': {
                    schema: z.string().openapi({ format: 'binary' })
                }
            }
        },
        400: { description: 'Missing "text" parameter' },
        500: { description: 'Failed to generate QR code' }
    }
})

export const qrcodeHandler = async (c: Context) => {
    const text = c.req.query('text')
    if (!text) {
        return c.json({ status: false, error: 'Query parameter "text" is required' }, 400)
    }

    const rawSize = parseInt(c.req.query('size') || '300', 10)
    const size = Math.min(Math.max(isNaN(rawSize) ? 300 : rawSize, 64), 1000)

    try {
        const buffer = await QRCode.toBuffer(text, {
            type: 'png',
            width: size,
            margin: 2,
            color: { dark: '#000000', light: '#ffffff' }
        })

        c.header('Content-Type', 'image/png')
        c.header('Cache-Control', 'public, max-age=86400')
        return c.body(buffer)
    } catch (err) {
        return c.json({ status: false, error: err.message || 'Internal Server Error' }, 500)
    }
}
