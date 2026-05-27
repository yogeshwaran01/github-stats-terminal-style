# ⚡ Vercel Serverless API Build & Deployment Documentation

This guide describes how to build, run locally, and deploy the dynamic serverless SVG stats API on Vercel.

---

## 🏗️ How the API Works

The Vercel serverless stats engine consists of:
1. **`api/stats.ts`**: The serverless entrypoint handler that intercept query options (`&theme=`, `&headerStyle=`, `&mock=`) and maps them to our TS generator engine.
2. **In-Memory Rendering**: Executes statistical simulations completely in RAM using `generateSvgString` to avoid local read/write disk constraints.
3. **CORS & Edge-Caching**: Serves dynamic visual SVGs directly using `image/svg+xml` content headers and fast cache-invalidation controls (`s-maxage=3600`).

---

## 🛠️ Step 1: Install Vercel CLI

Ensure you have the Vercel CLI installed globally on your local machine:
```bash
npm install -g vercel
```

---

## 💻 Step 2: Run Local Development Server

You can test and preview the serverless API and the configurator playground together on your local machine using the Vercel Development Environment:

1. In the root of your project directory, execute the development command:
   ```bash
   vercel dev
   ```
   > **Note on NPM Scripts**: We renamed the CLI watch command inside `package.json` to `"dev:cli"` (run using `npm run dev:cli`). This prevents Vercel Dev from intercepting a default `"dev"` script and trying to run the nodemon CLI loop instead of starting the serverless API listener.
2. The CLI will spin up a local development server combining the static configurator (`index.html`) and the serverless functions (`api/stats.ts`) under the same local proxy (usually `http://localhost:3000`).
3. Open your browser and navigate to `http://localhost:3000`. 
4. The visual playground configurator will now fetch and display **genuine, live compiled SVG previews in real-time** served directly by your local TypeScript backend handler!

---

## 🚀 Step 3: Deploy to Vercel (Production)

Once you are satisfied with local tests, deploy your backend API to Vercel production:

1. **Trigger Vercel Login** (if you haven't linked your account):
   ```bash
   vercel login
   ```
2. **Execute Deployment**:
   ```bash
   vercel --prod
   ```
3. Vercel will bundle the TypeScript codebase, resolve dependencies, and give you a live production deployment domain (e.g. `https://github-stats-terminal-your-username.vercel.app`).
4. Now, any developer can embed a dynamic SVG stats card inside their Profile README using your domain link!
   ```markdown
   ![GitHub Stats Card](https://github-stats-terminal-your-username.vercel.app/api/stats?username=your-username&theme=tokyonight)
   ```

---

## 🔒 Step 4: Configure GitHub Access Token (Optional but Recommended)

By default, unauthenticated requests to the GitHub API are rate-limited to **60 queries per hour**. To avoid hits and secure **5,000 requests per hour** for your serverless deployment:

1. Generate a classic GitHub **Personal Access Token (PAT)** with no specific scopes required (since it is only reading public profile data).
2. Navigate to your Vercel Dashboard, select your project, and click **Settings** → **Environment Variables**.
3. Create a new environment variable:
   * **Key**: `GHT` (or `GITHUB_TOKEN`)
   * **Value**: Your Personal Access Token string
4. Click **Save** and redeploy the project to activate the variable. The serverless function will automatically detect and authenticate with your token!

---

## 🎨 Setting Custom Commands via URL Parameters

Our Vercel Serverless API natively supports executing custom commands directly via the URL. This is done by combining two parameters:

1. **`commands`**: Include your custom command name in the comma-separated prompt execution list (e.g. `&commands=whoami,cat bio,exit`).
2. **`customCommands`**: A URL-encoded JSON object mapping your custom command names to their printed faked outputs.

### Example Embed Code:
If you want to run a custom command `cat bio` that outputs `Software Engineer @ Google`, your URL parameters will look like this:
```
/api/stats?username=your-username&commands=whoami,neofetch,cat bio,exit&customCommands={"cat bio":"Software Engineer @ Google"}
```
*(The configurator web app will automatically URL-encode this query string perfectly for you when copying the README markdown embed!)*
