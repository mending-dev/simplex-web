import { ShoppingCart } from 'lucide-react'
import site from '../config/site.json'
import Button from './Button'
import DiscordIcon from './DiscordIcon'
import Reveal from './Reveal'

// Computed once at module load, keeps the component render pure
const currentYear = new Date().getFullYear()

export default function Footer() {
    const { footer, server, links } = site

    // Replace the {year} and {name} placeholders from site.json
    const copyright = footer.copyright
        .replace('{year}', currentYear)
        .replace('{name}', server.name)

    return (
        <footer className="border-t border-border px-6 py-10">
            <Reveal className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 md:flex-row">
                <div className="text-center md:text-left">
                    <p className="text-sm text-foreground">{copyright}</p>
                    <p className="mt-1 text-xs text-muted">{footer.disclaimer}</p>
                </div>

                <div className="flex items-center gap-3">
                    <Button variant="secondary" size="sm" href={links.discord}>
                        <DiscordIcon size={16} />
                        {footer.buttons.discord}
                    </Button>
                    <Button variant="secondary" size="sm" href={links.shop}>
                        <ShoppingCart size={16} />
                        {footer.buttons.shop}
                    </Button>
                </div>
            </Reveal>
        </footer>
    )
}