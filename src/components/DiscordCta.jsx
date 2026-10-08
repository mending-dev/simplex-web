import site from '../config/site.json'
import SectionWrapper from './SectionWrapper'
import Button from './Button'
import DiscordIcon from './DiscordIcon'

export default function DiscordCta() {
    const { discordCta, links } = site

    return (
        <SectionWrapper id="discord">
            <div className="relative overflow-hidden rounded-2xl border border-border bg-surface px-6 py-16 text-center sm:px-12">
                {/* Background glow */}
                <div className="pointer-events-none absolute -top-24 left-1/2 h-64 w-96 -translate-x-1/2 rounded-full bg-primary/20 blur-3xl" />

                <div className="relative">
                    <DiscordIcon size={44} className="mx-auto text-primary" />
                    <h2 className="mt-6 text-3xl font-bold sm:text-4xl">{discordCta.title}</h2>
                    <p className="mx-auto mt-4 max-w-xl text-muted">{discordCta.text}</p>
                    <Button href={links.discord} className="mt-8">
                        {discordCta.button}
                    </Button>
                </div>
            </div>
        </SectionWrapper>
    )
}