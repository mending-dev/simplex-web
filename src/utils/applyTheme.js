import site from '../config/site.json'

// Loads every JSON file in src/config/themes (key = file path)
const themes = import.meta.glob('../config/themes/*.json', {
    eager: true,
    import: 'default',
})

// Applies the theme selected in site.json -> theme (file name without .json)
export function applyTheme() {
    const theme = themes[`../config/themes/${site.theme}.json`]

    if (!theme) {
        const available = Object.keys(themes).map((path) =>
            path.split('/').pop().replace('.json', ''),
        )
        console.error(
            `Theme "${site.theme}" not found. Available themes: ${available.join(', ')}`,
        )
        return
    }

    const root = document.documentElement

    // Lets the browser style scrollbars and form controls to match the theme
    if (theme.colorScheme) root.style.colorScheme = theme.colorScheme

    Object.entries(theme.colors).forEach(([key, value]) => {
        root.style.setProperty(`--color-${key}`, value)
    })
}