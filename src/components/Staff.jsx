import site from '../config/site.json'
import SectionWrapper from './SectionWrapper'
import SectionHeading from './SectionHeading'
import { useStaffNames } from '../hooks/useStaffNames'

// Card width (w-44 = 176px) + right margin (mr-6 = 24px)
const ITEM_WIDTH = 200
// Minimum cards per half of the track so it always covers wide screens
const MIN_ITEMS = 12

export default function Staff() {
    const { staff } = site
    const names = useStaffNames(staff.members, staff.profileApi)

    if (staff.members.length === 0) return null

    // Repeat members until one half of the track is wider than the screen
    const repeat = Math.ceil(MIN_ITEMS / staff.members.length)
    const half = Array.from({ length: repeat }, () => staff.members).flat()
    // Render the half twice so the -50% animation loops seamlessly
    const track = [...half, ...half]
    const duration = (half.length * ITEM_WIDTH) / staff.scrollSpeed

    // Builds the badge colors for a rank, falls back to the theme's primary color
    const getRankStyle = (rank) => {
        const color = staff.ranks[rank] ?? 'var(--color-primary)'
        return {
            color,
            backgroundColor: `color-mix(in srgb, ${color} 15%, transparent)`,
            borderColor: `color-mix(in srgb, ${color} 40%, transparent)`,
        }
    }

    // Shows "..." while loading and the fallback text if the lookup failed
    const getName = (uuid) => {
        if (!(uuid in names)) return '...'
        return names[uuid] ?? staff.unknownName
    }

    return (
        <SectionWrapper id="staff" className="overflow-hidden py-24">
            <SectionHeading title={staff.title} subtitle={staff.subtitle} />

            <div className="overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
                <div
                    className="flex w-max animate-marquee"
                    style={{ '--marquee-duration': `${duration}s` }}
                >
                    {track.map((member, index) => (
                        <div
                            key={index}
                            // The second half is a visual duplicate only
                            aria-hidden={index >= half.length}
                            className="mr-6 w-44 shrink-0 rounded-xl border border-border bg-surface p-5 text-center"
                        >
                            <img
                                src={staff.avatarApi.replace('{uuid}', member.uuid)}
                                alt=""
                                width="96"
                                height="96"
                                className="mx-auto h-24 w-24 rounded-lg"
                            />
                            <p className="mt-4 truncate font-semibold">{getName(member.uuid)}</p>
                            <span
                                className="mt-2 inline-block rounded-full border px-3 py-0.5 text-xs font-semibold uppercase tracking-wide"
                                style={getRankStyle(member.rank)}
                            >
                {member.rank}
              </span>
                        </div>
                    ))}
                </div>
            </div>
        </SectionWrapper>
    )
}