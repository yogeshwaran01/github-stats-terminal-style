<h1 align='center'>📺 GitHub Stats Terminal Style</h1>
<p align='center'>Transform your GitHub Profile or Repository Readme into a dynamic, animated developer's terminal workspace.</p>

<p align="center" >
  <a href="https://github.com/yogeshwaran01/github-stats-terminal-style/actions/workflows/main.yml">
    <img src="https://github.com/yogeshwaran01/github-stats-terminal-style/actions/workflows/main.yml/badge.svg" alt="Update Github Stats" title="Terminal Style GitHub Stats">
  </a>
</p>

<p align='center'>
  <img align="center" src="./github_stats.svg?v=latest">
</p>

This repository generates a dynamic SVG card that displays your GitHub statistics with a **premium terminal interface aesthetic**. Unlike static images, this card features a slick **typing animation**, making your profile feel alive and active.

It is fully automated using GitHub Actions, so your stats are always up-to-date without any manual work.

---

## ✨ Complete Features

- **📺 Terminal Aesthetic:** Mimics a high-fidelity console shell environment with clean borders, title bars, and command prompts.
- **⌨️ Typing Animation:** Commands are simulated typing character-by-character in real-time, followed by responsive output printing.
- **🎨 Curated Theme Palettes:** Choose from 10+ professional developer themes (e.g. Tokyonight, Dracula, Catppuccin, Monokai, Nord).
- **📐 Dynamic Window Scaling (No Truncation):** Auto-scales the SVG height dynamically based on the exact line count written. Large outputs (like long git logs) will never be cut off or truncated!
- **🔄 Fully Automated:** Set up once and run daily on a cron schedule via GitHub Actions to keep stats fresh.
- **⚡ Lightweight & Responsive:** Highly optimized SVG format utilizing pure CSS keyframes for minimal load times.
- **📂 Bulk Configuration Engine:** Support for rendering multiple SVGs at once. Place multiple JSON configuration files inside a `terminalConfigs/` directory, and the tool will batch-generate all of them into a dedicated `terminals/` folder!

---

## 🛠️ Easy Setup Guide (You or Your Repositories)

### Option A: Setup for your Profile (User Stats)
This generates stats for your overall GitHub user account (commits, issues, PRs, followers, language breakdown, and top repositories).

1. **Fork or Template:** [Fork this repository](https://github.com/yogeshwaran01/github-stats-terminal-style/fork) or use it as a template to create a new repository.
2. **Generate classic Personal Access Token (PAT):**
   - Navigate to **Settings** → **Developer settings** → **Personal access tokens** → **Tokens (classic)**.
   - Generate a new classic token with the ✅ `repo` and ✅ `workflow` scopes. Copy it immediately.
3. **Add Token as Secret:**
   - Go to your new repository's **Settings** → **Secrets and variables** → **Actions**.
   - Add a new repository secret named `GHT` and paste your token as the value.
4. **Enable Workflow Permissions:**
   - Go to **Settings** → **Actions** → **General** → **Workflow permissions**.
   - Select **Read and write permissions** and click **Save**.
5. **Execute:**
   - Navigate to the **Actions** tab, click **Update Github Stats** workflow on the left, and click **Run workflow**. 
   - A file named `github_stats.svg` will be generated in your repository root!

### Option B: Setup for a Specific Repository (Single Repo Stats)
This generates stats for a single repository (stars, forks, watchers, open issues, repository size, license, precise repository language byte breakdown, and the 5 most recent commit logs!).

1. Follow the same steps as above to create the repository, PAT, secrets, and permissions.
2. Add a configuration file named `your_repo.json` in the terminalConfig folder.
3. Configure it as follows to target your repository:
   ```json
   {
     "sourceType": "repo",
     "target": "your-username/your-repository-name",
     "theme": "tokyonight",
     "headerStyle": "windows",
     "commands": ["whoami", "neofetch", "languages", "git-log", "uptime", "ps", "exit"]
   }
   ```
4. Update the workflow, without any args
   ```
      - name: Generate Terminal SVG
        run: |
          GHT=${{ secrets.GHT }} node dist/bin/github-stats-terminal.js 
        env:
          GHT: ${{ secrets.GHT }}
   ```
6. Run the workflow. It will automatically detect the repo configuration and generate the repository SVG!
7. You can add mutiple config in terminal folder, to cretate bulk SVG terminals.
---

### ⚙️ Configuration Properties

| Property | Type | Description | Default |
| :--- | :--- | :--- | :--- |
| `sourceType` | `string` | Data ingestion source: `"user"` (GitHub profile stats) or `"repo"` (specific repository stats). | `"user"` |
| `target` | `string` | Profile username or `owner/repo` string path representing the stats target. | *Defaults to username* |
| `theme` | `string` | Visual color palette (see themes below). | `"dracula"` |
| `headerStyle` | `string` | Terminal title bar decoration: `mac` (dots), `windows` (icons), or `retro` (borderless). | `"mac"` |
| `hostname` | `string` | Custom hostname printed in prompt (e.g. `user@hostname`). | `"github.com"` |
| `typingSpeed` | `number` | Time in milliseconds per simulated character typed. | `100` |
| `commands` | `string[]` | Ordered list of commands to run (see supported command list below). | `["whoami", "neofetch", "languages", "top-repos", "ps", "uptime", "exit"]` |
| `customCommands` | `object` | Key-value pairs mapping custom CLI strings to mock faked text outputs. | `{}` |

### 🐚 Supported Terminal Commands

* **`whoami`**: Prints the profile full name (user mode) or full repository namespace (repo mode).
* **`neofetch`**: Displays a custom NeoFetch-style graphic with the target profile/repo statistics and custom GitHub ASCII logo.
* **`languages`**: Renders a beautiful horizontal ASCII progress bar breakdown of top used languages.
* **`git-log`**: *(Repo context only)* Renders the 5 most recent commits on the current branch (SHA hash, author, date, and commit message) with classic Git color accents.
* **`top-repos`**: *(User context only)* Generates a CLI-styled data table listing your top 5 repositories sorted by stargazers.
* **`ps`**: Renders a faked Linux process status monitor showing active repositories as system processes.
* **`uptime`**: Prints faked system uptime calculated from the account or repository creation date.
* **`exit`**: Gracefully simulates shell session exit.
* **Custom Commands**: Any custom string (e.g., `cat bio.txt`) mapping directly to static text outputs specified in `customCommands`.

### 🎨 Available Themes

| Theme Name | Background | Foreground | Theme Name | Background | Foreground |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **dracula** | `#282a36` | `#f8f8f2` | **catppuccin** | `#24273a` | `#cad3f5` |
| **ubuntu** | `#300a24` | `#eeeeec` | **nord** | `#2e3440` | `#d8dee9` |
| **hacker** | `#000000` | `#00ff00` | **gruvbox** | `#282828` | `#ebdbb2` |
| **powershell**| `#012456` | `#cccccc` | **tokyonight** | `#1a1b26` | `#a9b1d6` |
| **monokai** | `#272822` | `#f8f8f2` | **github** | `#ffffff` | `#24292e` |

---

## 💻 Developer Setup Guide (Dev & Contribution)

To compile, extend, or run this project locally on your machine:

### 1. Prerequisites
- [Node.js](https://nodejs.org/) (v16+)
- [npm](https://www.npmjs.com/)

### 2. Installation
Clone the repository and install developer dependencies:
```bash
git clone https://github.com/yogeshwaran01/github-stats-terminal-style.git
cd github-stats-terminal-style
npm install
```

### 3. Local Development Build
You can build the TypeScript files using the compiler scripts:
- **One-time build:** `npm run build` (compiles source into `/dist`)
- **Watch mode:** `npm run build:watch` (automatically rebuilds as you edit files)

### 4. Running CLI Manually
To execute the stats generator engine manually (requires an active GitHub PAT set in the `GHT` environment variable):

* **Direct Username Positional (User Profile Mode):**
  ```bash
  GHT="your_github_token" npx ts-node bin/github-stats-terminal.ts your-github-username
  ```
  *(Always resolves to user profile stats mode for `your-github-username`.)*
* **Explicit User Profile Flag (`--user`):**
  ```bash
  GHT="your_github_token" npx ts-node bin/github-stats-terminal.ts --user your-github-username
  ```
  *(Explicitly runs user profile stats mode for `your-github-username`.)*
* **Explicit Repository Flag (`--repo`):**
  ```bash
  GHT="your_github_token" npx ts-node bin/github-stats-terminal.ts --repo owner/repository-name
  ```
  *(Explicitly runs repository stats mode for `owner/repository-name`.)*
* **Explicit Bulk Configurations Flag (`--bulk`):**
  ```bash
  GHT="your_github_token" npx ts-node bin/github-stats-terminal.ts --bulk
  ```
  *(Processes all configuration files in `terminalConfigs/` and saves output SVGs inside the `terminals/` folder.)*
* **No Arguments (Zero Options):**
  ```bash
  GHT="your_github_token" npx ts-node bin/github-stats-terminal.ts
  ```
  *(Smart fallback: Automatically defaults to `--bulk` mode if the `terminalConfigs/` directory exists and has JSON configuration files. Otherwise, displays the help usage menu.)*

---

## 📅 Scheduling Updates

By default, the stats update every day at 02:47 UTC. To customize this schedule:
1. Open `.github/workflows/main.yml`.
2. Edit the crontab expression inside the schedule triggers:
   ```yaml
   on:
     schedule:
       - cron: '47 2 * * *'
   ```

## 🤝 Contributing

Contributions are welcome! If you want to add a new theme or feature:
1. Fork the project.
2. Create your feature branch (`git checkout -b feature/AmazingTheme`).
3. Commit your changes.
4. Open a Pull Request.

## 📄 License
This project is licensed under the [MIT License](https://github.com/yogeshwaran01/github-stats-terminal-style/blob/master/LICENSE).

**Thank You ❤️**
