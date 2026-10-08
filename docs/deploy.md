# Deploy

This page shows you how to put your website online.

## How it works

Your website is a **static website**. When you run

```bash
npm run build
```

Vite creates a folder called **`dist`** containing plain HTML, CSS, JavaScript and your images. There is no server code and no database. Any hosting that can serve static files will work.

Deploying always means the same thing: get the content of `dist` onto a host and point a domain at it.

## Before you go live

1. Server name, IP, links and texts are final
2. Placeholder images are replaced (logo, hero background, About images)
3. Vote links point to your own voting pages
4. Favicon is in place 
5. You tested the build locally with `npm run test`
6. You checked the page on a phone

## Which option fits you?

| Option | Difficulty | Cost | Good for |
| --- | --- | --- | --- |
| [Vercel](#option-1-vercel) | Very easy | Free plan | Beginners, automatic updates |
| [Netlify](#option-2-netlify) | Very easy | Free plan | Beginners, drag and drop upload |
| [Cloudflare Pages](#option-3-cloudflare-pages) | Easy | Free plan | Fast worldwide delivery |
| [Linux VPS with Nginx](#option-4-linux-vps-with-nginx) | Medium | Your server | Full control, same machine as other services |
| [Docker](#option-5-docker) | Medium | Your server | Container setups |
| [Web hosting via FTP](#option-6-web-hosting-via-ftp) | Easy | Your hosting | You already have a web hosting package |
| [GitHub Pages](#option-7-github-pages) | Easy | Free | Only with a custom domain |

If you are unsure, start with **Vercel**.

---

## Option 1: Vercel

Vercel builds and hosts your site for free and updates it automatically whenever you push changes to GitHub.

1. Upload your project to a GitHub repository.
2. Create an account on [vercel.com](https://vercel.com) and log in with GitHub.
3. Click **Add New > Project** and select your repository.
4. Vercel detects Vite automatically. The settings should be:
    - **Build Command:** `npm run build`
    - **Output Directory:** `dist`
5. Click **Deploy**. After a minute, your site is online at a `*.vercel.app` address.

**Using your own domain:** Open your project, go to **Settings > Domains**, add your domain and follow the DNS instructions shown there.

**Updating:** Change your config, commit and push to GitHub. Vercel deploys the new version automatically.

**Alternative without GitHub (CLI):**

```bash
npm install -g vercel
vercel
```

Run `vercel --prod` to publish to production.

---

## Option 2: Netlify

**Drag and drop (no account setup with Git needed):**

1. Run `npm run build` on your computer.
2. Open [app.netlify.com/drop](https://app.netlify.com/drop).
3. Drag the **`dist`** folder into the page. Your site is online immediately.

**With Git (automatic updates):**

1. Create a site via **Add new site > Import an existing project** and pick your repository.
2. Set **Build command** to `npm run build` and **Publish directory** to `dist`.
3. Click **Deploy**.

Custom domains are added under **Domain management**.

---

## Option 3: Cloudflare Pages

1. Push your project to GitHub.
2. In the Cloudflare dashboard open **Workers & Pages** and create a new **Pages** project connected to Git.
3. Select your repository and set:
    - **Build command:** `npm run build`
    - **Build output directory:** `dist`
4. Click **Save and Deploy**.

If your domain's DNS is managed by Cloudflare, connecting it is especially simple under **Custom domains**.

---

## Option 4: Linux VPS with Nginx

This guide uses Ubuntu or Debian. You need a VPS, its IP address and a domain.

### 1. Point your domain to the server

At your domain provider, create these DNS records:

| Type | Name | Value |
| --- | --- | --- |
| A | `@` | Your server IP |
| A | `www` | Your server IP |

DNS changes can take a few minutes up to a few hours.

### 2. Connect to the server

```bash
ssh your-user@YOUR_SERVER_IP
```

### 3. Install Nginx

```bash
sudo apt update
sudo apt install -y nginx
```

### 4. Create the website folder

```bash
sudo mkdir -p /var/www/minecraft-landing
sudo chown -R $USER:$USER /var/www/minecraft-landing
```

### 5. Build and upload the website

On **your own computer**, in the project folder:

```bash
npm run build
```

Then upload the content of `dist` to the server.

macOS and Linux:

```bash
rsync -avz --delete dist/ your-user@YOUR_SERVER_IP:/var/www/minecraft-landing/
```

Windows (PowerShell) or any system:

```bash
scp -r dist/* your-user@YOUR_SERVER_IP:/var/www/minecraft-landing/
```

You can also use a graphical tool like WinSCP or FileZilla and copy the files into `/var/www/minecraft-landing/`.

### 6. Configure Nginx

Create the configuration file:

```bash
sudo nano /etc/nginx/sites-available/minecraft-landing
```

Paste the following and replace `example.com` with your domain:

```nginx
server {
    listen 80;
    listen [::]:80;
    server_name example.com www.example.com;

    root /var/www/minecraft-landing;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    # Cache built assets for a long time (file names change on every build)
    location /assets/ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

Save with `Ctrl + O`, `Enter`, and exit with `Ctrl + X`. Then enable the site:

```bash
sudo ln -s /etc/nginx/sites-available/minecraft-landing /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

`nginx -t` must report that the syntax is OK. If the default Nginx welcome page still appears, remove the default site and reload:

```bash
sudo rm /etc/nginx/sites-enabled/default
sudo systemctl reload nginx
```

### 7. Open the firewall

Allow SSH **first**, otherwise you can lock yourself out:

```bash
sudo ufw allow OpenSSH
sudo ufw allow 'Nginx Full'
sudo ufw enable
```

Your Minecraft server port (default `25565`) is not affected by Nginx. If you run the Minecraft server on the same machine, open that port separately if needed.

### 8. Enable HTTPS (free certificate)

```bash
sudo apt install -y certbot python3-certbot-nginx
sudo certbot --nginx -d example.com -d www.example.com
```

Follow the prompts. Certbot adjusts the Nginx configuration and renews the certificate automatically. You can test the renewal with:

```bash
sudo certbot renew --dry-run
```

Your website is now available at `https://example.com`.

### Updating the website

Whenever you change something: run `npm run build` again and repeat the upload from step 5.

---

## Option 5: Docker

If you prefer containers, create a file called `Dockerfile` in the project folder:

```dockerfile
# Stage 1: build the website
FROM node:22-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Stage 2: serve the built files with Nginx
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
```

Build and run it:

```bash
docker build -t minecraft-landing .
docker run -d --name minecraft-landing -p 80:80 --restart unless-stopped minecraft-landing
```

To update, rebuild the image, remove the old container (`docker rm -f minecraft-landing`) and start it again.

For HTTPS, put a reverse proxy such as Caddy, Traefik or Nginx Proxy Manager in front of the container.

---

## Option 6: Web hosting via FTP

If you already have a classic web hosting package (for example from your domain provider):

1. Run `npm run build`.
2. Connect to your hosting with an FTP/SFTP tool such as FileZilla.
3. Upload the **content** of the `dist` folder (not the folder itself) into the web root, usually called `public_html` or `htdocs`.

Most providers offer a free HTTPS certificate in their control panel.

---

## Option 7: GitHub Pages

GitHub Pages works best with a **custom domain** or a repository named `your-username.github.io`.

For addresses like `your-username.github.io/repository-name`, the website runs in a sub-folder. In that case the image paths starting with `/` (for example `/images/logo.png`) don't work without extra configuration. If you are a beginner, prefer one of the other options.

---

## After deploying

- Open your domain on desktop and phone and check every section.
- Check that the server status, staff names and heads load.
- Test the copy IP button, the Discord and shop links and all vote links.
- When you change `site.json` or a theme later, **build and deploy again**. The config is bundled into the website during the build.

## Troubleshooting

**The website shows the old version**
Clear the browser cache with `Ctrl + Shift + R`. Check that you uploaded the new build.

**Images are missing**
Check that the files are in `public/images/` and that the paths in `site.json` start with `/images/` and match the file name exactly (including upper and lower case).

**Server status shows offline although the server is online**
Check `server.ip` (and the port, if you use one) in `site.json`. Bedrock servers need the Bedrock status API, see [Configuration](configuration.md#server).

**Nginx shows `502`, `403` or the wrong page**
Run `sudo nginx -t` and check that `root` points to the folder that contains `index.html`.