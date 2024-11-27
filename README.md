# Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser
to see the result.

## Env Variables

In order to upload files to the server, follow the following steps:

1. Create a new `.env.local` file (if not available)
2. Add the following variable: `NEXT_PUBLIC_SERVER_URL`
3. Add value of your server endpoint in addition to the port and params
4. Restart the application
