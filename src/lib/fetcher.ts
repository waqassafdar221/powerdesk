// Lightweight fetcher util and API path resolver.
export function apiPath(path: string) {
  const rawBase = process.env.NEXT_PUBLIC_API_BASE ?? ''
  const base = rawBase.trim()

  const cleanedPath = path.replace(/^\/+/, '')

  if (!base) {
    // default to local Next.js API routes
    return `/api/${cleanedPath}`
  }

  // ensure no double slashes
  return `${base.replace(/\/+$/, '')}/${cleanedPath}`
}

export async function apiFetch<T = unknown>(path: string, init?: RequestInit) {
  const url = apiPath(path)
  const res = await fetch(url, init)
  if (!res.ok) {
    const text = await res.text().catch(() => '')
    const err = new Error(`API request failed: ${res.status} ${res.statusText} ${text}`)
    // attach status for richer inspection using a typed assertion
    interface APIError extends Error {
      status?: number
    }
    const apiErr = err as APIError
    apiErr.status = res.status
    throw apiErr
  }

  // Try JSON, fallback to text
  const contentType = res.headers.get('content-type') || ''
  if (contentType.includes('application/json')) {
    return (await res.json()) as T
  }
  return (await res.text()) as unknown as T
}

export default apiFetch

// small helper to match `api('/battery')` usage
export function api(path: string) {
  return apiPath(path)
}
