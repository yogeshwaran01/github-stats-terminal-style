<h1 align='center'>📺 GitHub Stats Terminal Style </h1>
<p align='center'><strong>Transform your GitHub Profile or Repository Readme into a dynamic, premium animated terminal simulator.</strong></p>

<p align="center">
  <a href="https://github.com/yogeshwaran01/github-stats-terminal-style/actions/workflows/main.yml">
    <img src="https://github.com/yogeshwaran01/github-stats-terminal-style/actions/workflows/main.yml/badge.svg" alt="Update Github Stats" title="Terminal Style GitHub Stats">
  </a>
  <img src="https://img.shields.io/github/license/yogeshwaran01/github-stats-terminal-style" alt="License">
  <img src="https://img.shields.io/github/stars/yogeshwaran01/github-stats-terminal-style" alt="Stars">
</p>

<p align='center'>
  <img align="center" src="./github_stats.svg" alt="GitHub Stats Terminal Style Preview" width="800">
</p>

This engine compiles high-fidelity **interactive SVGs** featuring a professional terminal interface layout. It simulates a **real-time character-by-character typing execution** using pure CSS keyframes, bringing your profile repository to life with dynamic telemetry stats and modern aesthetic themes.

---

## ⚡ 3-Minute Quick Start (No Setup Required!)

The absolute fastest way to display your live terminal statistics is via our hosted **Serverless SVG API**. No forks, personal access tokens, or GitHub Actions required!

Simply copy the markdown below and paste it into your README:

```markdown
[![GitHub Stats Terminal](https://github-stats-terminal-style-five.vercel.app/api/stats?username=your-username&theme=tokyonight)](https://github.com/your-username)
```

> [!TIP]
> **Supported query parameters:**
>
> - `username`: Your GitHub account name.
> - `theme`: Theme styling (e.g. `dracula`, `tokyonight`, `catppuccin`, `nord`, `gruvbox`).
> - `headerStyle`: Title bar frame style: `mac` (dots), `windows` (icons), or `retro` (borderless).
> - `hostname`: Change the CLI prompt hostname (e.g. `hostname=dev.io`).
> - `typingSpeed`: Typing latency in milliseconds per character (default: `80`).

---

## 🎮 Visual Configurator Playground

Want to design your terminal card interactively? Use our **Visual Web Configurator** to custom-build your card in your browser!

> **✨ [Launch the Visual Web Playground](https://github-stats-terminal-style-five.vercel.app/)**
>
> - Toggle visuals, border controls, speeds, and hostnames in a beautiful dark glassmorphic UI.
> - **Interactive Command Reordering:** Drag, drop, and rearrange execution sequences (Move ▲ / Move ▼).
> - **Custom Command Builder:** Map your own custom statements (e.g. `cat bio.txt` ➔ `Full Stack Dev @ Google`) and view live SVG compilation.
> - **Single-Click Exports:** Instantly copy your responsive `config.json` or pre-encoded Markdown code block.

---

## 📦 GitHub Actions Workflow Integration

You can integrate this stats card generator into any of your existing repository workflows (e.g., to automatically commit the terminal stats SVG card directly to your project or profile README branch).

Create a file named `.github/workflows/github-stats.yml` in your target repository:

```yaml
name: Update Terminal Stats Card

on:
  schedule:
    # Run once every 24 hours at midnight
    - cron: '0 0 * * *'
  workflow_dispatch: # Allows manual execution from the Actions tab

permissions:
  contents: write # Required to push the updated SVG back to the repo

jobs:
  build-stats:
    runs-on: ubuntu-latest

    steps:
      # Step 1: Checkout the repository
      - name: Checkout Repository
        uses: actions/checkout@v4
        with:
          persist-credentials: true
          fetch-depth: 0

      # Step 2: Compile the SVG Card using our Action
      - name: Generate SVG Terminal Stats Card
        uses: yogeshwaran01/github-stats-terminal-style@master
        with:
          username: ${{ github.repository_owner }}
          theme: tokyonight
          headerStyle: mac
          commands: whoami,neofetch,languages,uptime,exit
          outputPath: assets/github_stats.svg

      # Step 3: Commit and Push the updated SVG card back to repository
      - name: Commit and Push Changes
        run: |
          git config --global user.name "github-actions[bot]"
          git config --global user.email "github-actions[bot]@users.noreply.github.com"
          git add assets/github_stats.svg
          git diff --quiet && git diff --staged --quiet || (git commit -m "chore: update terminal stats card [skip ci]" && git push)
```

Inside your `README.md`, you can then embed the compiled card statically:
```markdown
![My GitHub Terminal Stats](assets/github_stats.svg)
```

---

### 🛠️ Input Options Configurations

Customize the Action behavior using the following parameter options (`with:`):

| Parameter | Description | Default | Example |
| :--- | :--- | :--- | :--- |
| `username` | The GitHub username to gather profile statistics. | `${{ github.repository_owner }}` | `yogeshwaran01` |
| `token` | Access Token used to authenticate. Higher API rates. | `${{ github.token }}` | `${{ secrets.GHT }}` |
| `theme` | Visual color palette theme. | `dracula` | `tokyonight`, `catppuccin`, `nord`, `gruvbox` |
| `headerStyle`| Styling of window decoration borders. | `mac` | `mac`, `windows`, `retro` |
| `typingSpeed`| Keypress simulation speed in milliseconds. | `80` | `100` |
| `hostname` | Simulated custom hostname in command prompts. | `github.com` | `archlinux` |
| `commands` | Comma-separated list of terminal prompts to run. | `whoami,neofetch,languages,uptime,exit` | `whoami,neofetch,languages,top-repos,ps,exit` |
| `outputPath` | Target path where the final SVG card is saved. | `github_stats.svg` | `assets/terminal_stats.svg` |
| `sourceType` | Stats target context (`user` or `repo`). | `user` | `repo` |
| `target` | Explicit username or `owner/repo` override target. | `${{ github.repository_owner }}` | `yogeshwaran01/github-stats-terminal-style` |

---


## 🛠️ Production Setup Guides

If you prefer to automate SVG rendering inside your repository workflows or self-host your own high-capacity serverless API, choose from the integration options below:

### Option A: Automate with the GitHub Action (Recommended)

This runs high-capacity compilation inside a repository workflow and writes the static SVG locally to your branch.

1. **Fork or Template:** [Fork this repository](https://github.com/yogeshwaran01/github-stats-terminal-style/fork) or use it as a template.
2. **Generate classic Personal Access Token (PAT):**
   - Navigate to **GitHub Settings** ➔ **Developer settings** ➔ **Personal access tokens** ➔ **Tokens (classic)**.
   - Generate a token with the ✅ `repo` and ✅ `workflow` scopes. Copy it immediately.
3. **Add Token as Secret:**
   - Go to your forked repository's **Settings** ➔ **Secrets and variables** ➔ **Actions**.
   - Add a new repository secret named `GHT` and paste your PAT as the value.
4. **Enable Workflow Permissions:**
   - Navigate to **Settings** ➔ **Actions** ➔ **General** ➔ **Workflow permissions**.
   - Select **Read and write permissions** and click **Save**.
5. **Run Workflow:**
   - Go to the **Actions** tab, click **Update Github Stats** workflow on the left, and click **Run workflow**.
   - A fresh `github_stats.svg` will compile in your repository root!

### Option B: Host Your Own Serverless API on Vercel

Want custom backend control with unlimited API endpoints? Read the [Vercel Deployment Guide](docs/vercel-deployment.md) to launch your own rate-limit-free serverless proxy in 2 steps!

---

## 💻 Local Setup & Development Guide

Follow these steps to compile, run, test, and contribute to this project locally on your machine.

### 1. Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- [npm](https://www.npmjs.com/) package manager

### 2. Installation & Compilation

Clone the repository and install all dependencies:

```bash
git clone https://github.com/yogeshwaran01/github-stats-terminal-style.git
cd github-stats-terminal-style
npm install
```

Build the TypeScript files:

- **One-time compilation:** `npm run build` (compiles source into `/dist`)
- **CLI Dev Watcher:** `npm run dev:cli` (automatically watches files and rebuilds via `nodemon`)

### 3. Running Offline Graphics Tests (No GitHub Token Required!)

Generate high-fidelity visual cards immediately without hitting GitHub API limits using faked mock profile metadata:

```bash
npx ts-node test_graphics.ts
```

This writes a beautiful sample `github_stats.svg` directly in the project root. Double-click it to inspect graphics and fonts in your browser.

### 4. Running the CLI Engine Manually

To execute the SVG generator engine locally from the CLI:

```bash
# Set your active GitHub Personal Access Token
export GHT="your_classic_github_token_here"

# Profile Mode: Compile overall user profile stats
npx ts-node bin/github-stats-terminal.ts --user your-github-username

# Repository Mode: Compile individual repository statistics
npx ts-node bin/github-stats-terminal.ts --repo owner/repository-name

# Bulk Config Mode: Process all configs in terminalConfigs/ into terminals/
npx ts-node bin/github-stats-terminal.ts --bulk
```

### 5. Running the Serverless API Locally

To test the Serverless API and the Web Configurator Playground locally on your machine:

```bash
# 1. Install the Vercel CLI globally
npm i -g vercel

# 2. Fire up the local dev server
vercel dev
```

Open **`http://localhost:3000`** in your browser. Changing your local code in `index.html` or `api/stats.ts` will live-reload automatically!

---

## 🐚 Configuration & Customized Commands

Customize your layout prompts and command behaviors by configuring a `.github-stats-config.json` inside your repository root:

| Property         | Type       | Description                                                                          | Default                                                              |
| :--------------- | :--------- | :----------------------------------------------------------------------------------- | :------------------------------------------------------------------- |
| `sourceType`     | `string`   | Data ingestion type: `"user"` (GitHub profile stats) or `"repo"` (repository stats). | `"user"`                                                             |
| `target`         | `string`   | Target profile username or `owner/repo` path.                                        | _username_                                                           |
| `theme`          | `string`   | Visual terminal theme (see table below).                                             | `"dracula"`                                                          |
| `headerStyle`    | `string`   | Title bar design: `mac` (dots), `windows` (icons), or `retro` (borderless).          | `"mac"`                                                              |
| `hostname`       | `string`   | CLI prompt hostname (e.g. `user@hostname`).                                          | `"github.com"`                                                       |
| `typingSpeed`    | `number`   | Time in milliseconds per simulated keystroke.                                        | `80`                                                                 |
| `commands`       | `string[]` | Ordered list of commands to run (see supported command list below).                  | `["whoami", "neofetch", "languages", "top-repos", "uptime", "exit"]` |
| `customCommands` | `object`   | Key-value pairs mapping custom CLI strings to mock faked text outputs.               | `{}`                                                                 |

### Supported Terminal Commands

- **`whoami`**: Prints the full user profile name or repository workspace namespace.
- **`neofetch`**: Displays a custom NeoFetch-style statistics layout alongside a retro GitHub ASCII logo.
- **`languages`**: Renders a beautiful horizontal progress bar breaking down top used languages.
- **`git-log`**: _(Repository mode only)_ Renders the 5 most recent commits with styled Git SHA hashes and commit messages.
- **`top-repos`**: _(User profile mode only)_ Renders a structured ASCII table showing your top 5 starred repositories.
- **`ps`**: Renders a active Linux process monitor mapping repositories as system processes.
- **`uptime`**: Calculates active account or repository lifespan in years and days since creation.
- **`exit`**: Simulates graceful shell terminal session exit.
- **Custom Commands**: Any custom string (e.g. `cat bio.txt`) that maps to a custom text response defined inside `customCommands`.

---

## 🎨 Visual Themes

| Theme Name        | Background | Foreground | Accent    |
| :---------------- | :--------- | :--------- | :-------- |
| 💜 **dracula**    | `#282a36`  | `#f8f8f2`  | `#bd93f9` |
| 🌌 **tokyonight** | `#1a1b26`  | `#a9b1d6`  | `#7aa2f7` |
| 🐱 **catppuccin** | `#24273a`  | `#cad3f5`  | `#c6a0f6` |
| ❄️ **nord**       | `#2e3440`  | `#d8dee9`  | `#88c0d0` |
| 🍂 **gruvbox**    | `#282828`  | `#ebdbb2`  | `#fe8019` |
| 🍊 **monokai**    | `#272822`  | `#f8f8f2`  | `#f92672` |
| 🌿 **hacker**     | `#000000`  | `#00ff00`  | `#00ff00` |
| 💻 **powershell** | `#012456`  | `#cccccc`  | `#17b2ff` |
| 🦊 **ubuntu**     | `#300a24`  | `#eeeeec`  | `#df4b1f` |
| 🤍 **github**     | `#ffffff`  | `#24292e`  | `#0366d6` |

---

## 📅 Scheduling Updates

The GitHub Action workflow updates your SVG statistics automatically once a day at `02:47 UTC`. To adjust this frequency, edit the crontab inside `.github/workflows/main.yml`:

```yaml
on:
  schedule:
    - cron: "47 2 * * *" # Trigger daily at 02:47 UTC
```

---

## 🤝 Contributing

Contributions are welcome! If you want to submit a new theme, fix a layout bug, or add a new built-in command:

1. Fork the project.
2. Create a feature branch (`git checkout -b feature/CoolAccent`).
3. Commit your modifications.
4. Open a dynamic Pull Request!

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

<p align="center"><strong>Made with ❤️ by Yogeshwaran</strong></p>
