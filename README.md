<h1 align='center'>GitHub Stats Terminal Style</h1>
<p align='center'>Dynamically generate GitHub stats looking like a Terminal Interface </p>

<p align="center" >
  <a href="https://github.com/yogeshwaran01/github-stats-terminal-style/actions/workflows/main.yml">
    <img src="https://github.com/yogeshwaran01/github-stats-terminal-style/actions/workflows/main.yml/badge.svg" alt="Update Github Stats" title="Terminal Style GitHub Stats">
  </a>
</p>

<p align='center'>
  <img align="center" src="./github_stats.svg">
</p>

## Usage

1. Create a new repository using this template or click [here](https://github.com/yogeshwaran01/github-stats-terminal-style/generate) to create.
2. Create the personal access token. Checkout this [link](https://docs.github.com/en/github/authenticating-to-github/keeping-your-account-and-data-secure/creating-a-personal-access-token) to create a personal access token.
3. Add a new repository secret to your repo. The name of the secret must be `GHT` and the value is your personal access token (PAT). Checkout this [link](https://docs.github.com/en/actions/reference/encrypted-secrets) to add a new repository secret.
4. Enable `Allow GitHub Actions to create and approve pull requests` in General Action Settings
<details>
  <summary><b>&nbsp;&nbsp;More Details</b></summary>
  <br/>
  <p> 

### 🔑 Authentication & Permissions  
To allow GitHub Actions to commit and push changes, follow these steps:
### Setting Up Personal Access Token (PAT)  
1️⃣ Go to **Settings** → **Developer settings** → **Personal access tokens**.  
2️⃣ Click on **Generate a new token (classic)**.  
3️⃣ Select the required scopes:  
   - ✅ `repo` → Full control of private repositories.  
   - ✅ `workflow` → Allows GitHub Actions to trigger workflows.
 
**⚠️ Important:** Copy the token as it will disappear once you leave the page.  

### Adding the Token as a Secret  
1️⃣ Go to **Repository Settings** → **Secrets and Variables** → **Actions**.  
2️⃣ Click **New Repository Secret**.  
3️⃣ Name it **GHT** and paste the copied PAT in the input box.  
4️⃣ Save it.  

**⚠️ Security Tip:** Never expose your PAT publicly. Store it securely as it grants repo modification permissions.  

### Grant Workflow Permissions  
1️⃣ Go to your **GitHub Repository Settings**.  
2️⃣ Navigate to **Actions** under **Code and Automation**.  
3️⃣ Select **General** from the dropdown.  
4️⃣ Scroll down to **Workflow Permissions**.  
5️⃣ Choose **Read and write permissions**.  
6️⃣ Save the settings. ✅  

---  

## Running Workflows  
 **Manual Execution**  
1️⃣ Navigate to the **Actions** tab in your repository.  
2️⃣ Under **All Workflows**, select the `main.yml` file to run.  
3️⃣ Click **Run Workflow** to manually trigger the workflow for testing.  

 **Automated Execution**  
The workflows are scheduled to run **automatically at defined UTC times**.  
After a successful run, your generated files can be embedded into your **README** file. 📄 </p>

</details>


The file `github_stats.svg` is an svg image of your github stats. You can copy the link of the image and use it anywhere. By default it updates daily at `2:47 UTC`. You can also change this by changing the cron in `/.github/workflows/main.yml` by using [Cron Generator](https://crontab.guru/).

## Themes

Currently only nine themes are available. The default theme is the ubuntu theme. You can change the theme by changing the command in `/.github/workflows/main.yml`.

```bash
node updater.js ${{ github.repository_owner }} <themeName>
```

To use a random theme, do not specify any arguments.

|                           **Theme Sample**                            | **Theme Name** |         **Theme Sample**        |  **ThemeName** |
| :-------------------------------------------------------------------: | :------------: | :------------------------------:| :-------------: |
|      <img align="center" src="https://cdn.jsdelivr.net/gh/yogeshwaran01/github-stats-terminal-style@latest/themes/ubuntu.svg" alt="ubuntu">      |     ubuntu     | <img align="center" src="https://cdn.jsdelivr.net/gh/yogeshwaran01/github-stats-terminal-style@latest/themes/hacker.svg" alt="hacker">  |   hacker   |
|        <img align="center" src="https://cdn.jsdelivr.net/gh/yogeshwaran01/github-stats-terminal-style@latest/themes/atom.svg" alt="atom">        |      atom      | <img align="center" src="https://cdn.jsdelivr.net/gh/yogeshwaran01/github-stats-terminal-style@latest/themes/googledark.svg" alt="googledark">  |   googledark   |
|     <img align="center" src="https://cdn.jsdelivr.net/gh/yogeshwaran01/github-stats-terminal-style@latest/themes/default.svg" alt="default">     |    default     | <img align="center" src="https://cdn.jsdelivr.net/gh/yogeshwaran01/github-stats-terminal-style@latest/themes/googlelight.svg" alt="googlelight"> |  googlelight   |
|     <img align="center" src="https://cdn.jsdelivr.net/gh/yogeshwaran01/github-stats-terminal-style@latest/themes/dracula.svg" alt="dracula">     |    dracula     | <img align="center" src="https://cdn.jsdelivr.net/gh/yogeshwaran01/github-stats-terminal-style@latest/themes/monokai.svg" alt="monokai">     |    monokai     |
|      <img align="center" src="https://cdn.jsdelivr.net/gh/yogeshwaran01/github-stats-terminal-style@latest/themes/github.svg" alt="github">      |     github     | <img align="center" src="https://cdn.jsdelivr.net/gh/yogeshwaran01/github-stats-terminal-style@latest/themes/powershell.svg" alt="powershell">  |   powershell   |

## Contributions

Contributions, issue and pull requests are welcome

## Credits

Svg Generated from [termtosvg](https://github.com/nbedos/termtosvg)
