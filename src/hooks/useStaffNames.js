import { useEffect, useState } from 'react'

// Resolves Minecraft usernames from UUIDs via PlayerDB.
// Returns a map: { [uuid]: name } (name is null if the lookup failed)
export function useStaffNames(members, profileApi) {
    const [names, setNames] = useState({})

    useEffect(() => {
        let cancelled = false

        members.forEach(async ({ uuid }) => {
            let name = null
            try {
                const response = await fetch(profileApi.replace('{uuid}', uuid))
                if (!response.ok) throw new Error(`HTTP ${response.status}`)
                const profile = await response.json()
                // PlayerDB response format: { data: { player: { username } } }
                name = profile?.data?.player?.username ?? null
            } catch (error) {
                console.error(`Failed to load profile for ${uuid}:`, error)
            }
            if (!cancelled) {
                setNames((previous) => ({ ...previous, [uuid]: name }))
            }
        })

        return () => {
            cancelled = true
        }
    }, [members, profileApi])

    return names
}