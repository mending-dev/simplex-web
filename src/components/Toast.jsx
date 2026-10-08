import { Check } from 'lucide-react'

// Small notification that slides in at the top of the screen
export default function Toast({ show, message }) {
    return (
        <div
            role="status"
            aria-live="polite"
            className={`pointer-events-none fixed left-1/2 top-6 z-50 flex -translate-x-1/2 items-center gap-2 rounded-lg border border-primary bg-surface px-5 py-3 font-medium text-foreground shadow-lg transition-all duration-300 ${
                show ? 'translate-y-0 opacity-100' : '-translate-y-4 opacity-0'
            }`}
        >
            <Check size={18} className="text-primary" />
            {message}
        </div>
    )
}