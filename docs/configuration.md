# Configuration

All content of the website is controlled by one file: **`src/config/site.json`**. You never need to edit the code to change texts, links or lists.

Colors live in separate files. See the [Color Themes](color-themes.md) page.

## JSON basics

JSON files are strict. A single typo can break the page. Keep these rules in mind:

- Texts are written in **double quotes**: `"Hello"`
- Entries in a list or object are separated by a **comma**, but there is **no comma after the last entry**
- `true` and `false` are written **without** quotes
- Comments are **not** allowed in JSON
- Use `/` in image paths, never `\`

If the page breaks after an edit, check the terminal. It shows which line of the JSON file has a problem.

> Tip: Use an editor like Visual Studio Code. It underlines JSON mistakes in red.

## Changes need a rebuild

While you run `npm run dev`, changes show up instantly but its recommended to run `npm run test` since dynamic content could load the page slower. For your live website, you must run `npm run build` again and upload the new `dist` folder (see [Deploy](deploy.md)). Platforms like Vercel do this automatically when you push your changes.

## Where to put images

Put your images into `public/images/`. In `site.json` you reference them with a path starting with `/`:

```json
"image": "/images/about-1.jpg"
```

You can also use a full web address such as `https://example.com/image.jpg`.

## Settings at a glance

| Key | Controls |
| --- | --- |
| `language` | Language code of the page |
| `theme` | Active color theme |
| `meta` | Browser tab title and search engine description |
| `server` | Server name, IP, status API, maintenance mode |
| `links` | Discord and shop URLs |
| `hero` | Top section |
| `serverInfo` | Status cards below the hero |
| `about` | About cards |
| `staff` | Staff carousel |
| `vote` | Vote links |
| `discordCta` | Discord banner |
| `footer` | Footer |

## Language

```json
"language": "en"
```

This sets the language of the page for browsers and search engines (the `lang` attribute). It does **not** translate anything automatically. To change the language of the page, set this value (for example `"de"`) **and** translate the texts in `site.json`.

## Theme

```json
"theme": "emerald-dark"
```

The name of a file from `src/config/themes/` without `.json`. All themes and how to create your own are explained on the [Color Themes](color-themes.md) page.

## Meta

```json
"meta": {
  "title": "MyServer | Minecraft Server",
  "description": "Join MyServer, the ultimate Minecraft survival experience."
}
```

| Key | Description |
| --- | --- |
| `title` | Text in the browser tab |
| `description` | Short description shown by search engines |

## Server

```json
"server": {
  "name": "MyServer",
  "ip": "play.example.com",
  "maintenance": false,
  "statusApi": "https://api.mcsrvstat.us/3/{ip}",
  "refreshInterval": 60
}
```

| Key | Description |
| --- | --- |
| `name` | Your server name. Used in the footer copyright |
| `ip` | Server address. Shown on the copy button and used to look up the status |
| `maintenance` | `true` shows the status "Maintenance" regardless of the real server state |
| `statusApi` | Address of the status API. `{ip}` is replaced with your `ip` |
| `refreshInterval` | How often the status is refreshed, in seconds |

If your server uses a custom port, add it to the IP, for example `play.example.com:25566`.

For **Bedrock** servers use this status API instead:

```json
"statusApi": "https://api.mcsrvstat.us/bedrock/3/{ip}"
```

## Links

```json
"links": {
  "discord": "https://discord.gg/example",
  "shop": "https://shop.example.com"
}
```

These links are used by all Discord and shop buttons on the page (hero, Discord banner and footer).

## Hero

```json
"hero": {
  "backgroundImage": "/images/hero-bg.jpg",
  "logo": {
    "image": "/images/logo.png",
    "alt": "MyServer"
  },
  "slogan": "Build. Survive. Conquer.",
  "copyNotice": "Server IP copied to clipboard!",
  "buttons": {
    "discord": "Discord",
    "shop": "Shop"
  }
}
```

| Key | Description |
| --- | --- |
| `backgroundImage` | Large background image of the top section |
| `logo.image` | Your logo (a PNG with transparent background works best) |
| `logo.alt` | Description of the logo. If the logo image can't be loaded, this text is shown instead |
| `slogan` | Text below the logo |
| `copyNotice` | Message shown after a visitor clicks the IP button |
| `buttons.discord` / `buttons.shop` | Button labels |

The middle button always shows your server IP and copies it when clicked.

## Server info cards

```json
"serverInfo": {
  "loading": "Loading...",
  "playersFormat": "{online} / {max}",
  "status": {
    "online": "Online",
    "offline": "Offline",
    "maintenance": "Maintenance"
  },
  "items": [
    { "type": "status", "label": "Server Status", "icon": "activity" },
    { "type": "players", "label": "Players Online", "icon": "users" },
    { "type": "text", "label": "Supported Versions", "value": "1.20 - 1.21", "icon": "package" },
    { "type": "ip", "label": "Server IP", "icon": "globe" }
  ]
}
```

| Key | Description |
| --- | --- |
| `loading` | Text while the status is loading |
| `playersFormat` | Format of the player count. `{online}` and `{max}` are replaced |
| `status` | Labels for the three server states |
| `items` | The cards. Add, remove or reorder entries freely |

Each entry in `items` has:

| Key | Description |
| --- | --- |
| `type` | What the card shows (see below) |
| `label` | Small title of the card |
| `icon` | Optional. Name of an icon (see below) |
| `value` | Only for type `text`: the text to display |

Available types:

| Type | Shows |
| --- | --- |
| `status` | Online, offline or maintenance with a colored dot |
| `players` | Current and maximum players |
| `ip` | Your server IP |
| `text` | Any text you like, for example the game mode |

**Adding your own card:**

```json
{ "type": "text", "label": "Game Mode", "value": "Survival", "icon": "swords" }
```

**Cards resize automatically.** They fill the available width, with a maximum of 4 per row on desktop. If you remove one card, the remaining cards become wider.

**Choosing icons:** Use the name of any icon from [lucide.dev/icons](https://lucide.dev/icons), written in lowercase with hyphens (for example `gamepad-2`, `shield`, `swords`). If you leave `icon` out, a default icon for the type is used. If a name doesn't exist, no icon is shown.

## About cards

```json
"about": {
  "title": "About Us",
  "subtitle": "What makes our server special.",
  "cards": [
    {
      "image": "/images/about-1.jpg",
      "title": "Survival",
      "text": "Explore a vast world, build your base and survive together with the community."
    }
  ]
}
```

Add one object per card to `cards`. There is no limit. The cards are arranged in 3 columns on desktop, 2 on tablets and 1 on phones.

## Staff

```json
"staff": {
  "title": "Our Team",
  "subtitle": "The people who keep the server running.",
  "avatarApi": "https://api.mcheads.org/head/{uuid}/256",
  "profileApi": "https://playerdb.co/api/player/minecraft/{uuid}",
  "unknownName": "Unknown",
  "scrollSpeed": 50,
  "ranks": {
    "Owner": "#ef4444",
    "Admin": "#f97316",
    "Moderator": "#3b82f6",
    "Builder": "#a855f7"
  },
  "members": [
    { "uuid": "069a79f4-44e9-4726-a5be-fca90e38aaf5", "rank": "Owner" },
    { "uuid": "853c80ef-3c37-49fd-aa49-938b674adae6", "rank": "Admin" }
  ]
}
```

| Key | Description |
| --- | --- |
| `avatarApi` | Address for the player heads. `{uuid}` is replaced. The number at the end is the texture size |
| `profileApi` | Address used to look up the username from the UUID |
| `unknownName` | Text shown if a username can't be loaded |
| `scrollSpeed` | Speed of the carousel in pixels per second. Higher is faster |
| `ranks` | Rank names and their colors (hex color codes) |
| `members` | The team. Each member has a `uuid` and a `rank` |

**Adding a member:** Add an entry with the player's UUID and a rank. You don't have to type the username, because it is loaded automatically. You can find a UUID by looking up a username on [NameMC.com](https://namemc.com) or [Laby.net](https://laby.net).

**Order:** The order in `members` is the order in the carousel.

**Ranks and colors:** The `rank` of a member must match a name in `ranks` **exactly** (including upper and lower case). If a rank isn't listed in `ranks`, the primary color of your theme is used. To add a new rank, add a line to `ranks`:

```json
"Helper": "#14b8a6"
```

The carousel scrolls automatically and repeats endlessly, even with only a few members.

## Vote

```json
"vote": {
  "title": "Vote for Us",
  "subtitle": "Support the server and get rewarded.",
  "buttonLabel": "Vote now",
  "links": [
    { "name": "Minecraft Server List", "url": "https://minecraft-server-list.com" }
  ]
}
```

Add or remove entries in `links`. Each entry needs a `name` and the `url` of **your server's voting page** on that site. The URLs in the default config are placeholders.

## Discord banner

```json
"discordCta": {
  "title": "Join our Discord",
  "text": "Chat with the community, get support and stay up to date.",
  "button": "Join Discord"
}
```

The button uses `links.discord`.

## Footer

```json
"footer": {
  "copyright": "© {year} {name}. All rights reserved.",
  "disclaimer": "Not affiliated with Mojang Studios or Microsoft.",
  "buttons": {
    "discord": "Discord",
    "shop": "Shop"
  }
}
```

In `copyright`, `{year}` is replaced with the current year and `{name}` with `server.name`.

## Favicon and browser tab

- Place your favicon at `public/favicon.png` (at least 64x64 pixels).
- If you use a different file name, change the `<link rel="icon" ...>` line in `index.html`.
- The tab title comes from `meta.title`.

## External APIs

The website uses three free public services. They are called from the visitor's browser.

| Service | Used for | Setting |
| --- | --- | --- |
| [mcsrvstat.us](https://mcsrvstat.us) | Server status, player count | `server.statusApi` |
| [MCHeads](https://mcheads.org) | Player head images | `staff.avatarApi` |
| [PlayerDB](https://playerdb.co) | Username from UUID | `staff.profileApi` |

Good to know:

- **Placeholders:** `{ip}` and `{uuid}` are replaced automatically. Keep them in the address.
- **Switching providers:** `avatarApi` accepts any image address that contains `{uuid}`. `statusApi` must return the same data format as mcsrvstat.us (version 3), and `profileApi` the same format as PlayerDB. Otherwise the data can't be read.
- **Be gentle:** These are free services. Don't set `refreshInterval` too low. The default of 60 seconds is a good value.
- **If the status API is unreachable,** the page shows the server as offline.

## Advanced: remove or reorder sections

The order of the sections is defined in `src/App.jsx`:

```jsx
<main>
  <Hero />
  <ServerInfo />
  <About />
  <Staff />
  <Vote />
  <DiscordCta />
</main>
```

To hide a section, delete its line (and its `import` line at the top of the file). To reorder sections, move the lines.