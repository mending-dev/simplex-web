import { DynamicIcon } from 'lucide-react/dynamic'
import site from '../config/site.json'
import SectionWrapper from './SectionWrapper'
import { useServerStatus } from '../hooks/useServerStatus'

// Default icons (lucide names) used when an item has no "icon" in site.json
const defaultIcons = {
    status: 'activity',
    players: 'users',
    text: 'package',
    ip: 'globe',
}

// Dot color per server state
const dotColors = {
    online: 'bg-success',
    offline: 'bg-danger',
    maintenance: 'bg-warning',
}

export default function ServerInfo() {
    const { server, serverInfo } = site
    const url = server.statusApi.replace('{ip}', server.ip)
    const { data, loading } = useServerStatus(url, server.refreshInterval)

    // The maintenance flag in site.json overrides the API result
    let state = 'offline'
    if (server.maintenance) state = 'maintenance'
    else if (data?.online) state = 'online'
    const isLoading = loading && !server.maintenance

    const renderValue = (item) => {
        switch (item.type) {
            case 'status':
                if (isLoading) return serverInfo.loading
                return (
                    <span className="flex items-center gap-2">
            <span
                className={`h-2.5 w-2.5 rounded-full ${dotColors[state]} ${
                    state === 'online' ? 'animate-pulse' : ''
                }`}
            />
                        {serverInfo.status[state]}
          </span>
                )
            case 'players':
                if (isLoading) return serverInfo.loading
                if (state !== 'online') return '—'
                return serverInfo.playersFormat
                    .replace('{online}', data.players?.online ?? 0)
                    .replace('{max}', data.players?.max ?? 0)
            case 'text':
                return item.value
            case 'ip':
                return <span className="break-all">{server.ip}</span>
            default:
                return null
        }
    }

    return (
        <SectionWrapper id="server" className="py-12">
            {/* Cards grow to fill each row: max 4 per row on desktop, 2 on tablet, 1 on mobile */}
            <div className="flex flex-wrap gap-4">
                {serverInfo.items.map((item, index) => (
                    <div
                        key={`${item.type}-${index}`}
                        className="basis-full grow rounded-xl border border-border bg-surface p-6 sm:basis-[calc(50%_-_0.5rem)] lg:basis-[calc(25%_-_0.75rem)]"
                    >
                        <div className="flex items-center gap-3 text-muted">
                            <DynamicIcon
                                name={item.icon ?? defaultIcons[item.type] ?? 'package'}
                                size={18}
                                className="text-primary"
                                fallback={() => <span className="inline-block h-[18px] w-[18px]" />}
                            />
                            <span className="text-sm">{item.label}</span>
                        </div>
                        <div className="mt-3 text-2xl font-bold">{renderValue(item)}</div>
                    </div>
                ))}
            </div>
        </SectionWrapper>
    )
}