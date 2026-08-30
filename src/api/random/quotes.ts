import { createRoute, z } from '@hono/zod-openapi'
import type { Context } from 'hono'

// Kumpulan kata-kata motivasi & peribahasa Indonesia asli/tradisional -
// nggak ada yang dikutip dari buku/penulis modern tertentu, jadi aman
// dipakai bebas.
const quotes: { text: string; category: string }[] = [
    { text: 'Sedikit demi sedikit, lama-lama menjadi bukit.', category: 'peribahasa' },
    { text: 'Berakit-rakit ke hulu, berenang-renang ke tepian.', category: 'peribahasa' },
    { text: 'Bersatu kita teguh, bercerai kita runtuh.', category: 'peribahasa' },
    { text: 'Di mana ada kemauan, di situ ada jalan.', category: 'motivasi' },
    { text: 'Gajah mati meninggalkan gading, harimau mati meninggalkan belang.', category: 'peribahasa' },
    { text: 'Jangan takut melangkah karena jaraknya jauh. Seribu langkah dimulai dari langkah pertama.', category: 'motivasi' },
    { text: 'Air beriak tanda tak dalam, air tenang menghanyutkan.', category: 'peribahasa' },
    { text: 'Kegagalan hanyalah kesempatan untuk memulai lagi dengan lebih bijaksana.', category: 'motivasi' },
    { text: 'Malu bertanya sesat di jalan.', category: 'peribahasa' },
    { text: 'Rajin pangkal pandai, hemat pangkal kaya.', category: 'peribahasa' },
    { text: 'Waktu yang tepat untuk memulai adalah sekarang, bukan nanti.', category: 'motivasi' },
    { text: 'Tak ada gading yang tak retak.', category: 'peribahasa' },
    { text: 'Proses tidak akan mengkhianati hasil, selama dijalani dengan konsisten.', category: 'motivasi' },
    { text: 'Bagai menegakkan benang basah.', category: 'peribahasa' },
    { text: 'Ilmu padi, makin berisi makin merunduk.', category: 'peribahasa' },
    { text: 'Setiap orang punya waktunya masing-masing, jangan bandingkan babak hidupmu dengan orang lain.', category: 'motivasi' },
    { text: 'Sekali merengkuh dayung, dua tiga pulau terlampaui.', category: 'peribahasa' },
    { text: 'Semut di seberang lautan tampak, gajah di pelupuk mata tak tampak.', category: 'peribahasa' },
    { text: 'Keberhasilan besar selalu dimulai dari langkah-langkah kecil yang konsisten.', category: 'motivasi' },
    { text: 'Tong kosong nyaring bunyinya.', category: 'peribahasa' }
]

export const quotesRoute = createRoute({
    method: 'get',
    path: '/api/random/quotes',
    summary: 'Random Indonesian Quotes',
    description: 'Returns a random Indonesian quote or proverb (peribahasa).',
    tags: ['Random'],
    'x-status': 'ONLINE',
    request: {
        query: z.object({
            apikey: z.string().openapi({
                example: 'takicu',
                description: 'Valid API Key'
            })
        })
    },
    responses: {
        200: {
            description: 'A random quote',
            content: {
                'application/json': {
                    schema: z.object({
                        status: z.boolean().openapi({ example: true }),
                        text: z.string().openapi({ example: 'Sedikit demi sedikit, lama-lama menjadi bukit.' }),
                        category: z.string().openapi({ example: 'peribahasa' })
                    })
                }
            }
        }
    }
})

export const quotesHandler = async (c: Context) => {
    const pick = quotes[Math.floor(Math.random() * quotes.length)]
    return c.json({
        status: true,
        text: pick.text,
        category: pick.category
    }, 200)
}
