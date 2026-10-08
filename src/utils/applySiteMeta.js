import site from '../config/site.json'

// Applies language, page title and meta description from site.json
export function applySiteMeta() {
    document.documentElement.lang = site.language
    document.title = site.meta.title

    let description = document.querySelector('meta[name="description"]')
    if (!description) {
        description = document.createElement('meta')
        description.name = 'description'
        document.head.appendChild(description)
    }
    description.content = site.meta.description
}