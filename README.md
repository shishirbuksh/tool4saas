# Tool4SaaS

A massive collection of 169 free, client-side productivity utilities for developers and creators. Built with Next.js, Material UI, and deployed via PM2 on CloudPanel.

## Features
- 🚀 **169 Tools**: Generators, calculators, converters, and formatters across 12 categories.
- 🔒 **Privacy-First**: All tools run entirely client-side in the browser. No data is sent to a backend.
- ⚡ **Lightning Fast**: Pre-rendered static pages using Next.js App Router and Turbopack.
- 🎨 **Beautiful UI**: Built with Material UI v16 (App Router optimized).
- 🌙 **Dark Mode**: Automatic theme switching with system preferences.

## Tech Stack
- Next.js (App Router, Turbopack)
- React
- Material UI (MUI)
- TypeScript
- PM2 (Production Process Manager)

## Getting Started

### Local Development
```bash
npm install
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) with your browser.

### Production Deployment (CloudPanel / Ubuntu VPS)
The recommended deployment strategy is using PM2 on a Node.js 22 server.

```bash
# Set environment variables
echo 'NEXT_PUBLIC_SITE_URL=https://tool4saas.com' > .env
echo 'HOSTNAME=127.0.0.1' >> .env

# Build and Start
npm install
npm run build
pm2 start npm --name "tool4saas" -- start
```
