<h1 align='center'>GitHub Stats Terminal Style</h1>
<p align='center'>Transform your GitHub Profile into a developer's workspace.</p>

<p align="center" >
  <a href="https://github.com/yogeshwaran01/github-stats-terminal-style/actions/workflows/main.yml">
    <img src="https://github.com/yogeshwaran01/github-stats-terminal-style/actions/workflows/main.yml/badge.svg" alt="Update Github Stats" title="Terminal Style GitHub Stats">
  </a>
</p>

<p align='center'>
  <img align="center" src="./github_stats.svg?v=latest">
</p>


This repository generates a dynamic SVG card that displays your GitHub statistics with a **terminal interface aesthetic**. Unlike static images, this card features a slick **typing animation**, making your profile feel alive and active.

It is fully automated using GitHub Actions, so your stats are always up-to-date without any manual work.

## ✨ Features

- **📺 Terminal Aesthetic:** Mimics a real CLI environment.
- **⌨️ Typing Animation:** Stats appear as if they are being typed in real-time.
- **🎨 Multiple Themes:** Includes 10+ themes like Ubuntu, Dracula, Monokai, and Hacker.
- **🔄 Fully Automated:** Updates daily via GitHub Actions.
- **⚡ Lightweight:** Optimized SVG format for fast loading.

---

## 🚀 Setup Guide

Follow these steps to add this to your profile in less than 5 minutes.

### 1. Create a Repository
You can either [fork this repository](https://github.com/yogeshwaran01/github-stats-terminal-style/fork) or use it as a template to create a new one.

### 2. Generate a Personal Access Token (PAT)
To allow the script to read your stats and update the SVG, you need a GitHub Token.

1. Go to **Settings** → **Developer settings** → **Personal access tokens** → **Tokens (classic)**.
2. Click **Generate new token (classic)**.
3. Select the following scopes:
   - ✅ `repo` (Full control of private repositories)
   - ✅ `workflow` (Update GitHub Action workflows)
4. Click **Generate token** and **copy it immediately**.

### 3. Add the Token as a Secret
1. Go to your repository's **Settings** tab.
2. Navigate to **Secrets and variables** → **Actions**.
3. Click **New repository secret**.
4. **Name:** `GHT`
5. **Value:** Paste the token you copied in Step 2.
6. Click **Add secret**.

### 4. Enable Workflow Permissions
1. Go to **Settings** → **Actions** → **General**.
2. Scroll down to **Workflow permissions**.
3. Select **Read and write permissions**.
4. Click **Save**.

### 5. Run the Workflow
1. Go to the **Actions** tab in your repository.
2. Click on the **Update Github Stats** workflow on the left.
3. Click **Run workflow**.

Once finished, a file named `github_stats.svg` will be generated in your repository!

---

## 🎨 Themes & Customization

You can change the appearance of your terminal by modifying the workflow file.

1. Open `.github/workflows/main.yml`.
2. Look for the step running `node dist/bin/github-stats-terminal.js`.
3. Change the command to use your desired theme:

```bash
node dist/bin/github-stats-terminal.js ${{ github.repository_owner }} <themeName>
```

|                                                             **Theme Sample**                                                             | **Theme Name** |                                                                **Theme Sample**                                                                | **ThemeName** |
| :--------------------------------------------------------------------------------------------------------------------------------------: | :------------: | :--------------------------------------------------------------------------------------------------------------------------------------------: | :-----------: |
|  <img align="center" src="https://cdn.jsdelivr.net/gh/yogeshwaran01/github-stats-terminal-style@latest/themes/ubuntu.svg" alt="ubuntu">  |     ubuntu     |     <img align="center" src="https://cdn.jsdelivr.net/gh/yogeshwaran01/github-stats-terminal-style@latest/themes/hacker.svg" alt="hacker">     |    hacker     |
| <img align="center" src="https://cdn.jsdelivr.net/gh/yogeshwaran01/github-stats-terminal-style@latest/themes/dracula.svg" alt="dracula"> |    dracula     |    <img align="center" src="https://cdn.jsdelivr.net/gh/yogeshwaran01/github-stats-terminal-style@latest/themes/monokai.svg" alt="monokai">    |    monokai    |
|  <img align="center" src="https://cdn.jsdelivr.net/gh/yogeshwaran01/github-stats-terminal-style@latest/themes/github.svg" alt="github">  |     github     | <img align="center" src="https://cdn.jsdelivr.net/gh/yogeshwaran01/github-stats-terminal-style@latest/themes/powershell.svg" alt="powershell"> |  powershell   |

```bash
node dist/bin/github-stats-terminal.js ${{ github.repository_owner }} <themeName>
```

## 📅 Scheduling Updates

By default, the stats update every day at 02:47 UTC. To change this:

1. Open .github/workflows/main.yml.
2. Edit the cron line:

```yaml
on:
  schedule:
    # Runs every day at 2:47 UTC
    - cron: '47 2 * * *'
```

You can use [crontab.guru](https://crontab.guru/) to generate a custom schedule.

## 📦 Usage in Profile
Once your `github_s❤️tats.svg` is generated, you can add it to your profile README.md or anywhere

## 🤝 Contributing

Contributions are welcome! If you want to add a new theme or feature:
1. Fork the project.
2. Create your feature branch (git checkout -b feature/AmazingTheme).
3. Commit your changes.
4. Open a Pull Request.

## 📄 License
This project is licensed under the [MIT License](https://github.com/yogeshwaran01/github-stats-terminal-style/blob/master/LICENSE).


**Thank You ❤️**