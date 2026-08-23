import { Redis } from '@upstash/redis'
import { randomBytes } from 'node:crypto'

// Semua API key yang dibuat lewat bot Telegram disimpen di 1 Redis SET ini.
// Key statis di config/setting.js TETAP jalan terus & nggak kepengaruh -
// ini cuma nambahin lapisan key yang bisa dibuat/dicabut on-the-fly.
const REDIS_SET_KEY = 'takicu:apikeys'

let cachedClient: Redis | null | undefined

// Dukung baik integrasi resmi Vercel Marketplace (KV_REST_API_*)
// maupun akun Upstash yang disambungkan manual (UPSTASH_REDIS_REST_*)
function getRedis(): Redis | null {
    if (cachedClient !== undefined) return cachedClient
    const hasEnv =
        (process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN) ||
        (process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN)

    if (!hasEnv) {
        cachedClient = null
        return null
    }
    try {
        cachedClient = Redis.fromEnv()
    } catch {
        cachedClient = null
    }
    return cachedClient
}

export function isRedisConfigured(): boolean {
    return getRedis() !== null
}

export function generateApiKey(): string {
    return `tkc_${randomBytes(12).toString('hex')}`
}

export async function isDynamicApiKey(key: string): Promise<boolean> {
    const redis = getRedis()
    if (!redis) return false
    try {
        const result = await redis.sismember(REDIS_SET_KEY, key)
        return result === 1
    } catch {
        return false
    }
}

export async function addApiKey(key: string): Promise<boolean> {
    const redis = getRedis()
    if (!redis) return false
    try {
        await redis.sadd(REDIS_SET_KEY, key)
        return true
    } catch {
        return false
    }
}

export async function listApiKeys(): Promise<string[]> {
    const redis = getRedis()
    if (!redis) return []
    try {
        const members = await redis.smembers(REDIS_SET_KEY)
        return (members || []) as string[]
    } catch {
        return []
    }
}

export async function revokeApiKey(key: string): Promise<boolean> {
    const redis = getRedis()
    if (!redis) return false
    try {
        const removed = await redis.srem(REDIS_SET_KEY, key)
        return removed > 0
    } catch {
        return false
    }
}
