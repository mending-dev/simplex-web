# Simplex - Landing Page Template

A modern, minimalist and fully configurable landing page for your Minecraft server. Built with React, Vite and Tailwind CSS.

You do **not** need to know how to code to use it: every text, link, image, color and list on the page is controlled through simple JSON files.

<!-- Add a screenshot here, e.g. ![Preview](docs/preview.png) -->

## Features

- **Hero** with logo, slogan, background image and buttons (copy server IP, Discord, shop)
- **Live server status** (online, offline, maintenance), online player count and supported versions
- **About** section with image cards
- **Staff carousel** with player heads, usernames and colored ranks
- **Vote** section with links to voting sites
- **Discord call-to-action** banner and a clean footer
- **Color themes**: switch between ready-made light and dark themes with one setting
- Smooth scrolling and fade-in animations
- Fully responsive (mobile, tablet, desktop)

## What you can customize

| What | Where |
| --- | --- |
| All texts, links, server IP, section content, language | `src/config/site.json` |
| Color Theme | `src/config/themes/*.json` |
| Logo, favicon, background and card images | `public/images/` |
| Info cards, About cards, staff members, ranks, vote links | `src/config/site.json` (add or remove entries) |
| Or rewrite the whole site using JavaScript (JSX) | `src/` |

## Quick start

```bash
git clone https://github.com/mending-dev/simplex-web.git
cd minecraft-landing-page
npm install
npm run test
```

Then open the address shown in the terminal (usually `http://localhost:4173`).

## Documentation

| Page | Content |
| --- | --- |
| [Getting Started](docs/getting-started.md) | Download, installation and project structure |
| [Configuration](docs/configuration.md) | Every setting in `site.json`, texts, server data and APIs |
| [Color Themes](docs/color-themes.md) | Available themes and how to create your own |
| [Deploy](docs/deploy.md) | Put your website online (Vercel, VPS, Docker and more) |

## Tech stack

- [React](https://react.dev) and [Vite](https://vite.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [Lucide](https://lucide.dev) icons
- [Lenis](https://lenis.darkroom.engineering) for smooth scrolling

## Used services

- [mcsrvstat.us](https://mcsrvstat.us) for the server status and player count
- [MCHeads](https://mcheads.org) for player heads
- [PlayerDB](https://playerdb.co) to resolve usernames from UUIDs


## License

Worlds is licensed under the MIT License. See [LICENSE](LICENSE) for details.