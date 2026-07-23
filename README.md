# Mezmure MERN

EOTC Mezmure song library built with React, Express, and MongoDB Atlas.

## Local development

1. Install all workspace dependencies:

   ```bash
   npm run install:all
   ```

2. Copy `server/.env.example` to `server/.env` and set `MONGODB_URI` and
   `JWT_SECRET`. Never commit this file.

3. Start the API and Vite client together:

   ```bash
   npm run dev
   ```

The client runs at `http://localhost:5173`; Vite proxies `/api` requests to the
Express API at `http://localhost:8004`.
