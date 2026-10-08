import { ThumbsUp, ArrowUpRight } from 'lucide-react'
import site from '../config/site.json'
import SectionWrapper from './SectionWrapper'
import SectionHeading from './SectionHeading'

export default function Vote() {
    const { vote } = site

    return (
        <SectionWrapper id="vote">
            <SectionHeading title={vote.title} subtitle={vote.subtitle} />

            {/* One card per entry in site.json -> vote.links */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {vote.links.map((link, index) => (
                    <a
                        key={`${link.name}-${index}`}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-center gap-4 rounded-xl border border-border bg-surface p-5 transition hover:border-primary"
                    >
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <ThumbsUp size={22} />
            </span>
                        <span className="min-w-0 flex-1">
              <span className="block truncate font-semibold">{link.name}</span>
              <span className="block text-sm text-primary">{vote.buttonLabel}</span>
            </span>
                        <ArrowUpRight
                            size={20}
                            className="shrink-0 text-muted transition group-hover:text-primary"
                        />
                    </a>
                ))}
            </div>
        </SectionWrapper>
    )
}