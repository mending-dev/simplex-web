import { useEffect, useRef, useState } from 'react'

// Fades and slides its children in once they enter the viewport
export default function Reveal({ children, className = '', delay = 0 }) {
    const ref = useRef(null)
    const [visible, setVisible] = useState(false)

    useEffect(() => {
        const element = ref.current
        if (!element) return

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setVisible(true)
                    observer.disconnect()
                }
            },
            { threshold: 0.1 },
        )

        observer.observe(element)
        return () => observer.disconnect()
    }, [])

    return (
        <div
            ref={ref}
            style={{ transitionDelay: `${delay}ms` }}
            className={`transition-all duration-700 ease-out motion-reduce:translate-y-0 motion-reduce:opacity-100 motion-reduce:transition-none ${
                visible ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
            } ${className}`}
        >
            {children}
        </div>
    )
}