# Color Themes

The colors of the website are defined in theme files. You can switch between them with a single setting, and you can create your own.

Theme switching happens in the config only. Visitors of your website can't change the theme.

## Choosing a theme

Open `src/config/site.json` and set the name of the theme:

```json
"theme": "emerald-dark"
```

The name is the file name from `src/config/themes/` **without** `.json`. Save the file and the page updates.

If the name doesn't exist, the browser console (`F12`) lists all available themes, and the page falls back to default colors.

## Available themes

Every palette is available as a dark and a light version.

| Palette | Dark | Light | Accent color |
| --- | --- | --- | --- |
| Emerald (default) | `emerald-dark` | `emerald-light` | Green |
| Ocean | `ocean-dark` | `ocean-light` | Blue |
| Violet | `violet-dark` | `violet-light` | Purple |
| Rose | `rose-dark` | `rose-light` | Red-pink |
| Amber | `amber-dark` | `amber-light` | Gold-orange |
| Slate | `slate-dark` | `slate-light` | Neutral black, white and gray |

## Creating your own theme

1. Go to `src/config/themes/`.
2. **Copy** an existing file, for example `emerald-dark.json`.
3. **Rename** the copy, for example to `my-theme.json`. Use only lowercase letters, numbers and hyphens.
4. Open the new file and change the colors (see below).
5. Set `"theme": "my-theme"` in `src/config/site.json`.

That's all. The new file is detected automatically.

## Theme file structure

```json
{
  "colorScheme": "dark",
  "colors": {
    "primary": "#10b981",
    "primary-hover": "#34d399",
    "on-primary": "#022c22",
    "background": "#050b09",
    "surface": "#0b1713",
    "surface-alt": "#10211b",
    "border": "#1c3a2f",
    "foreground": "#ecfdf5",
    "muted": "#8fb3a3",
    "success": "#10b981",
    "warning": "#f59e0b",
    "danger": "#ef4444"
  }
}
```

### colorScheme

`"dark"` or `"light"`. This tells the browser how to style its own elements, such as the scrollbar. Use `"dark"` for dark themes and `"light"` for light themes.

### Colors

All colors are written as hex codes (for example `#10b981`).

| Color | Used for |
| --- | --- |
| `primary` | Main accent: primary button, icons, highlights, links |
| `primary-hover` | Primary button when the mouse is over it |
| `on-primary` | Text and icons **on top of** the primary color |
| `background` | Background of the whole page |
| `surface` | Cards, boxes and buttons |
| `surface-alt` | Alternative surface color for custom elements |
| `border` | Thin lines around cards and the footer line |
| `foreground` | Main text color |
| `muted` | Secondary text such as subtitles and descriptions |
| `success` | Status "Online" |
| `warning` | Status "Maintenance" |
| `danger` | Status "Offline" |

## Tips for good themes

- **Readability first.** `foreground` must have strong contrast to `background`, and `on-primary` must be clearly readable on `primary`.
- **Dark themes:** use a very dark `background`, a slightly lighter `surface` and an even lighter `border`.
- **Light themes:** use a near-white `background`, a pure white `surface` and a soft `border`.
- **Keep the three status colors recognizable** (green, orange, red), so visitors understand the server state at a glance.
- **Pick colors with a tool.** Websites like [tailwindcss.com/docs/colors](https://tailwindcss.com/docs/colors) offer ready-made color scales you can copy.
- **Test every section.** Check the hero, cards, staff badges, vote cards, Discord banner and footer.

## Advanced: adding a new color

If you want to add a new color key in a theme file, you must also register it in `src/index.css` inside the `@theme { ... }` block, for example:

```css
--color-highlight: #ffffff;
```

After that you can use it in components as `bg-highlight` or `text-highlight`.

## Next step

- [Deploy](deploy.md)