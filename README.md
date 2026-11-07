# Mrmedics Web App

Health Beyond Border — Complete Healthcare in One App.

## Cloudflare Deployment Settings

When deploying to Cloudflare Pages or Cloudflare Workers (Static Assets):

1. **Build Command**:
   ```bash
   npm install && npm run build
   ```

2. **Deploy Command (CLI)**:
   ```bash
   npx wrangler deploy
   ```
   *Output directory*: `dist`

3. **Firebase Authentication Domain Reminder**:
   Add your deployed Cloudflare custom domain (e.g., `mr-medics-web.pages.dev` or your custom domain) to the **Authorized domains** list in Firebase Console:
   - Navigate to: **Firebase Console > Authentication > Settings > Authorized domains**
   - Click **Add domain** and enter your production URL.
