import site from '../config/site.json'
import SectionWrapper from './SectionWrapper'
import SectionHeading from './SectionHeading'

export default function About() {
    const { about } = site

    return (
        <SectionWrapper id="about">
            <SectionHeading title={about.title} subtitle={about.subtitle} />

            {/* One card per entry in site.json -> about.cards */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {about.cards.map((card, index) => (
                    <article
                        key={`${card.title}-${index}`}
                        className="group overflow-hidden rounded-xl border border-border bg-surface transition hover:border-primary"
                    >
                        <div className="aspect-video overflow-hidden">
                            <img
                                src={card.image}
                                alt={card.title}
                                loading="lazy"
                                className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                            />
                        </div>
                        <div className="p-6">
                            <h3 className="text-xl font-semibold">{card.title}</h3>
                            <p className="mt-3 text-muted">{card.text}</p>
                        </div>
                    </article>
                ))}
            </div>
        </SectionWrapper>
    )
}