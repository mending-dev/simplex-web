import { useEffect } from 'react'
import Lenis from 'lenis'

// Enables smooth (eased) mouse wheel scrolling for the whole page
export function useSmoothScroll() {
    useEffect(() => {
        // Respect the user's reduced motion setting
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

        const lenis = new Lenis({ autoRaf: true })
        return () => lenis.destroy()
    }, [])
}