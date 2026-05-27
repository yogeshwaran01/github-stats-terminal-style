# 📦 GitHub Action Integration Documentation

The **GitHub Stats Terminal Style** Action compiles dynamic terminal-style stats SVG files directly inside your GitHub Actions workflows. It allows you to automatically update your profile stats card on a schedule and commit it back to your profile repository.

---

## 🚀 Quick Start (Profile README)

To automatically compile and commit your personal stats card every day, create a file at `.github/workflows/github-stats.yml` in your profile repository (the repo matching your username, e.g., `username/username`):

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

      # Step 3: Commit and Push the updated SVG card
      - name: Commit and Push Changes
        run: |
          git config --global user.name "github-actions[bot]"
          git config --global user.email "github-actions[bot]@users.noreply.github.com"
          git add assets/github_stats.svg
          git diff --quiet && git diff --staged --quiet || (git commit -m "chore: update terminal stats card [skip ci]" && git push)
```

Now, inside your `README.md`, simply embed the generated card:
```markdown
![My GitHub Terminal Stats](assets/github_stats.svg)
```

---

## 🛠️ Input Options Configurations

Customize the action behavior using the following parameter options (`with:`):

| Parameter | Description | Default | Example |
| :--- | :--- | :--- | :--- |
| `username` | The GitHub username to gather profile statistics. | `${{ github.repository_owner }}` | `yogeshwaran01` |
| `token` | Access Token used to authenticate. Higher API rates. | `${{ github.token }}` | `${{ secrets.GHT }}` |
| `theme` | Visual color palette theme. | `dracula` | `tokyonight`, `catppuccin`, `nord`, `gruvbox`, `ubuntu`, `hacker` |
| `headerStyle`| Styling of window decoration borders. | `mac` | `mac` (traffic lights), `windows` (prompt), `retro` (borderless) |
| `typingSpeed`| Keypress simulation speed in milliseconds. | `80` | `100` |
| `hostname` | Simulated custom hostname in command prompts. | `github.com` | `archlinux` |
| `commands` | Comma-separated list of terminal prompts to run. | `whoami,neofetch,languages,uptime,exit` | `whoami,neofetch,languages,top-repos,ps,exit` |
| `outputPath` | Target path where the final SVG card is saved. | `github_stats.svg` | `assets/terminal_stats.svg` |
| `sourceType` | Stats target context (`user` or `repo`). | `user` | `repo` |
| `target` | Explicit username or `owner/repo` override target. | `${{ github.repository_owner }}` | `yogeshwaran01/github-stats-terminal-style` |

---

## 💡 Advanced Configurations Examples

### 1. Show Detailed Single Repository Telemetry
Create a dedicated SVG card detailing the repository statistics (git logs, sizes, commit shas, active repo processes) for a project:

```yaml
- name: Generate Repository Stats
  uses: yogeshwaran01/github-stats-terminal-style@master
  with:
    sourceType: repo
    target: yogeshwaran01/github-stats-terminal-style
    theme: catppuccin
    headerStyle: windows
    commands: whoami,neofetch,languages,git-log,ps,exit
    outputPath: repo_details.svg
```

### 2. High-Capacity Operations (Using Personal Access Token)
If you have high repository traffic or are executing this action across multiple pages, configure a custom Personal Access Token (PAT) as a repository secret:

```yaml
- name: Generate SVG Terminal Stats Card
  uses: yogeshwaran01/github-stats-terminal-style@master
  with:
    username: yogeshwaran01
    token: ${{ secrets.MY_PERSONAL_ACCESS_TOKEN }}
    theme: hacker
```

---

## 🎨 Supported Visual Themes List

* `dracula` (Default)
* `tokyonight`
* `catppuccin`
* `nord`
* `gruvbox`
* `ubuntu`
* `hacker`
* `atom`
* `powershell`
* `monokai`
* `github`
