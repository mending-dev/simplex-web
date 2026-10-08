import { useEffect, useState } from 'react'

// Fetches the server status and refreshes it on an interval (in seconds)
export function useServerStatus(url, intervalSeconds = 60) {
    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const controller = new AbortController()

        const load = async () => {
            try {
                const response = await fetch(url, { signal: controller.signal })
                if (!response.ok) throw new Error(`HTTP ${response.status}`)
                setData(await response.json())
            } catch (error) {
                if (error.name === 'AbortError') return
                // Treat any request failure as "offline"
                setData(null)
            }
            setLoading(false)
        }

        load()
        const timer = setInterval(load, intervalSeconds * 1000)

        return () => {
            controller.abort()
            clearInterval(timer)
        }
    }, [url, intervalSeconds])

    return { data, loading }
}