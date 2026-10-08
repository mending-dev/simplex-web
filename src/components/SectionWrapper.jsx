import Reveal from './Reveal'

// Shared wrapper that gives every section the same spacing and max width.
// Pass `className` to override the default vertical padding.
export default function SectionWrapper({ id, className = 'py-24', children }) {
    return (
        <section id={id} className={`px-6 ${className}`}>
            <div className="mx-auto max-w-6xl">
                <Reveal>{children}</Reveal>
            </div>
        </section>
    )
}