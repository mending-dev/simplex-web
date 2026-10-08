# Getting Started

This page shows you how to download the project, install it and run it on your own computer.

## Requirements

- **Node.js 20.19 or newer** (or 22.12 or newer). Check your version with `node -v`. If you don't have Node.js, download the LTS version from [nodejs.org](https://nodejs.org).
- **npm** (it is installed together with Node.js).
- **Git** (optional, only needed for the Git download method).
- A code editor. [Visual Studio Code](https://code.visualstudio.com) is a good free choice.

## 1. Download the project

Choose **one** of the two methods.

### Option A: Git (recommended)

```bash
git clone https://github.com/your-name/minecraft-landing-page.git
cd minecraft-landing-page
```

The advantage of Git is that you can pull updates later.

### Option B: Download as ZIP

1. Open the repository page on GitHub.
2. Click **Code**, then **Download ZIP**.
3. Extract the ZIP file to a folder of your choice.
4. Open that folder in your editor.

## 2. Install the dependencies

Open a terminal **inside the project folder**. In Visual Studio Code you can do this with **Terminal > New Terminal**. Then run:

```bash
npm install
```

This downloads everything the website needs into a folder called `node_modules`. You only have to do this once.

## 3. Start the development server

```bash
npm run dev
```

The terminal shows an address, usually `http://localhost:5173`. Open it in your browser.

- Every time you save a change in a config file, the page updates automatically.
- The first start can take a little longer because icons are prepared once.
- Press `Ctrl + C` in the terminal to stop the server.

## 4. Make your first change

1. Open `src/config/site.json`.
2. Change `server.name` and `server.ip` to your own server.
3. Save the file and look at your browser: the page has updated.

Continue with the [Configuration](configuration.md) page to learn about all settings.

## Project structure

You only need to touch the folders marked with an arrow.

```text
minecraft-landing-page/
├── public/
│   └── images/            <- your logo, favicon and images
├── src/
│   ├── config/
│   │   ├── site.json      <- all texts, links and server data
│   │   └── themes/        <- color themes (one JSON file per theme)
│   ├── components/        Page sections (code)
│   ├── hooks/             Helper logic (code)
│   └── utils/             Helper functions (code)
├── index.html
├── package.json
└── vite.config.js
```

## Available commands

| Command | What it does |
| --- | --- |
| `npm install` | Installs all dependencies (once) |
| `npm run dev` | Starts the development server for editing |
| `npm run build` | Creates the final website in the `dist` folder |
| `npm run preview` | Shows the built website locally, to test it before uploading |
| `npm run test` | Build the website locally and preview (preferred over `npm run dev`) |
| `npm run lint` | Checks the code for problems |

## Checklist before you continue

1. Server name and IP are set
2. Discord and shop links are set
3. Your logo is placed at `public/images/logo.png`
4. Your favicon is placed at `public/favicon.png`
5. The placeholder images (from picsum.photos) are replaced with your own

## Troubleshooting

**`node` or `npm` is not recognized**
Node.js is not installed or the terminal was opened before the installation. Install Node.js and open a new terminal.

**An error mentions an unsupported Node.js version**
Update Node.js to version 20.19+ or 22.12+.

**The port is already in use**
Vite automatically picks the next free port. Use the address shown in the terminal.

**The page is blank or shows an error**
Open the browser console with `F12` and check the terminal. The most common cause is a typo in a JSON file, such as a missing comma. See [Configuration](configuration.md#json-basics).

**Updating with Git**
Run `git pull`. If you changed config files yourself, Git may report a conflict. In that case keep your own values and take over only the new entries.