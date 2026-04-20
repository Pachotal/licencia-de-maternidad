# Licencia Maternidad

[cloudflarebutton]

A modern web application for managing maternity leave tracking, built with Cloudflare Workers and React. This full-stack app features a responsive UI, API backend, and seamless deployment on Cloudflare.

## Features

- **Responsive Design**: Mobile-first UI with Tailwind CSS and shadcn/ui components.
- **Full-Stack Architecture**: React frontend with Hono backend running on Cloudflare Workers.
- **State Management**: TanStack Query for data fetching, Zustand for client state.
- **Theming**: Dark/light mode support with automatic system preference detection.
- **Error Handling**: Global error boundaries and client-side error reporting.
- **Sidebar Layout**: Collapsible sidebar for navigation (customizable).
- **Type-Safe**: End-to-end TypeScript with proper type definitions for Workers.
- **Performance Optimized**: Vite bundling, code splitting, and Cloudflare caching.

## Tech Stack

- **Frontend**: React 18, TypeScript, Vite, Tailwind CSS, shadcn/ui, Lucide React
- **Backend**: Hono, Cloudflare Workers, Workers KV/Durable Objects ready
- **Data**: TanStack Query, React Hook Form, Zod validation
- **UI/UX**: Framer Motion, Sonner toasts, Radix UI primitives
- **Dev Tools**: Bun, ESLint, TypeScript ESLint, Wrangler
- **Other**: Immer, UUID, Recharts for charts, Embla Carousel

## Quick Start

### Prerequisites

- [Bun](https://bun.sh/) (recommended package manager)
- [Cloudflare CLI (Wrangler)](https://developers.cloudflare.com/workers/wrangler/install-and-update/)
- Cloudflare account

### Installation

1. Clone the repository:
   ```
   git clone <your-repo-url>
   cd licencia-maternidad-kqsuzbnsrxo6c8ryyl2o3
   ```

2. Install dependencies:
   ```
   bun install
   ```

3. Generate Worker types:
   ```
   bun run cf-typegen
   ```

## Development

### Local Development

Start the development server:
```
bun dev
```

The app runs on `http://localhost:3000` (or `$PORT`). Frontend and Worker API are hot-reloaded.

### Adding API Routes

Edit `worker/userRoutes.ts` to add custom endpoints:
```typescript
app.get('/api/example', (c) => c.json({ message: 'Hello World' }));
```

### Customizing UI

- Replace `src/pages/HomePage.tsx` with your pages.
- Use `src/components/layout/AppLayout.tsx` for sidebar layouts.
- Add routes in `src/main.tsx`.
- shadcn/ui components are pre-installed; extend via `npx shadcn-ui@latest add <component>`.

### Building for Production

```
bun run build
```

## Deployment

Deploy to Cloudflare Pages/Workers with one command:
```
bun run deploy
```

This builds the assets and deploys via Wrangler.

[cloudflarebutton]

### Custom Domain & Environment Variables

Configure in `wrangler.jsonc` or via Cloudflare Dashboard:
```
wrangler deploy --env production
```

Set bindings (KV, D1, R2) in Wrangler secrets:
```
wrangler secret put MY_SECRET
```

## Scripts

| Script | Description |
|--------|-------------|
| `bun dev` | Start dev server |
| `bun build` | Build for production |
| `bun lint` | Run ESLint |
| `bun preview` | Preview production build |
| `bun deploy` | Deploy to Cloudflare |
| `bun cf-typegen` | Generate Worker types |

## Project Structure

```
├── src/              # React frontend
├── worker/           # Hono API backend
├── shared/           # Shared types/utils (add as needed)
├── tailwind.config.js # Theme customization
└── wrangler.jsonc    # Cloudflare config
```

## Contributing

1. Fork the repo.
2. Create a feature branch (`git checkout -b feature/AmazingFeature`).
3. Commit changes (`git commit -m 'Add some AmazingFeature'`).
4. Push to branch (`git push origin feature/AmazingFeature`).
5. Open a Pull Request.

## License

MIT License. See [LICENSE](LICENSE) for details.