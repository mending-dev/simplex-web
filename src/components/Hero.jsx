import { useState } from 'react'
import { Copy, Check, ShoppingCart } from 'lucide-react'
import site from '../config/site.json'
import Button from './Button'
import DiscordIcon from './DiscordIcon'
import Reveal from './Reveal'
import Toast from './Toast'
import { useCopyToClipboard } from '../hooks/useCopyToClipboard'

export default function Hero() {
    const { hero, server, links } = site
    const { copied, copy } = useCopyToClipboard(2500)
    const [logoFailed, setLogoFailed] = useState(false)

    return (
        <section
            id="home"
            className="relative flex min-h-[75svh] items-center justify-center overflow-hidden px-6"
        >
            {/* Background image with dark overlay for readability */}
            <img
                src={hero.backgroundImage}
                alt=""
                fetchPriority="high"
                className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-linear-to-b from-background/70 via-background/60 to-background" />

            <Reveal className="relative z-10 mx-auto max-w-3xl text-center">
                {/* Logo image, falls back to text if the image fails to load */}
                <h1 className="flex justify-center">
                    {logoFailed ? (
                        <span className="text-5xl font-extrabold tracking-tight sm:text-7xl">
              {hero.logo.alt}
            </span>
                    ) : (
                        <img
                            src={hero.logo.image}
                            alt={hero.logo.alt}
                            onError={() => setLogoFailed(true)}
                            className="max-h-40 w-auto max-w-full drop-shadow-2xl sm:max-h-56"
                        />
                    )}
                </h1>

                <p className="mt-6 text-lg text-muted sm:text-xl">{hero.slogan}</p>

                <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
                    <Button variant="secondary" href={links.discord}>
                        <DiscordIcon size={20} />
                        {hero.buttons.discord}
                    </Button>

                    {/* Copy IP button: the IP is the label, so the width never changes */}
                    <Button onClick={() => copy(server.ip)}>
                        {copied ? <Check size={20} /> : <Copy size={20} />}
                        {server.ip}
                    </Button>

                    <Button variant="secondary" href={links.shop}>
                        <ShoppingCart size={20} />
                        {hero.buttons.shop}
                    </Button>
                </div>
            </Reveal>

            {/* Toast stays outside Reveal, because transforms break fixed positioning */}
            <Toast show={copied} message={hero.copyNotice} />
        </section>
    )
}