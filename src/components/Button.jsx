const variants = {
    primary: 'bg-primary text-on-primary hover:bg-primary-hover',
    secondary:
        'border border-border bg-surface text-foreground hover:border-primary hover:text-primary',
}

const sizes = {
    md: 'px-6 py-3',
    sm: 'px-4 py-2 text-sm',
}

// Renders a link when `href` is set, otherwise a button
export default function Button({
   variant = 'primary',
   size = 'md',
   href,
   onClick,
   children,
   className = '',
}) {
    const classes = `inline-flex cursor-pointer items-center justify-center gap-2 rounded-lg font-semibold transition ${sizes[size]} ${variants[variant]} ${className}`

    if (href) {
        return (
            <a href={href} target="_blank" rel="noopener noreferrer" className={classes}>
                {children}
            </a>
        )
    }

    return (
        <button type="button" onClick={onClick} className={classes}>
            {children}
        </button>
    )
}