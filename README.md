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

The file `github_stats.svg` is an svg image of your github stats. You can copy the link of the image and use it anywhere. By default it updates daily at `2:47 UTC`. You can also change this by changing the cron in `/.github/workflows/main.yml` by using [Cron Generator](https://crontab.guru/).

## Themes

Currently only nine themes are available. The default theme is the ubuntu theme. You can change the theme by changing the command in `/.github/workflows/main.yml`.

```bash
node updater.js ${{ github.repository_owner }} <themeName>
```

To use a random theme, do not specify any arguments.

|                           **Theme Sample**                            | **Theme Name** |         **Theme Sample**        |  **ThemeName** |
| :-------------------------------------------------------------------: | :------------: | :------------------------------:| :-------------: |
|      <img align="center" src="./themes/ubuntu.svg" alt="ubuntu">      |     ubuntu     | <img align="center" src="./themes/hacker.svg" alt="hacker">  |   hacker   |
|        <img align="center" src="./themes/atom.svg" alt="atom">        |      atom      | <img align="center" src="./themes/googledark.svg" alt="googledark">  |   googledark   |
|     <img align="center" src="./themes/default.svg" alt="default">     |    default     | <img align="center" src="./themes/googlelight.svg" alt="googlelight"> |  googlelight   |
|     <img align="center" src="./themes/dracula.svg" alt="dracula">     |    dracula     | <img align="center" src="./themes/monokai.svg" alt="monokai">     |    monokai     |
|      <img align="center" src="./themes/github.svg" alt="github">      |     github     | <img align="center" src="./themes/powershell.svg" alt="powershell">  |   powershell   |

## Contributions

Contributions, issue and pull requests are welcome

## Credits

Svg Generated from [termtosvg](https://github.com/nbedos/termtosvg)
