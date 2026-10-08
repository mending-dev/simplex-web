import { useState, useRef, useEffect } from 'react'

// Copies text to the clipboard and exposes a temporary `copied` flag
export function useCopyToClipboard(resetDelay = 2000) {
    const [copied, setCopied] = useState(false)
    const timeoutRef = useRef(null)

    // Clear the pending timeout on unmount
    useEffect(() => () => clearTimeout(timeoutRef.current), [])

    const copy = async (text) => {
        try {
            await navigator.clipboard.writeText(text)
            setCopied(true)
            clearTimeout(timeoutRef.current)
            timeoutRef.current = setTimeout(() => setCopied(false), resetDelay)
        } catch (error) {
            console.error('Failed to copy:', error)
        }
    }

    return { copied, copy }
}