<h1 align='center'>GitHub Stats Terminal Style</h1>
<p align='center'>Dynamically Generate GitHub Stats as like Terminal Interface </p>

<p align='center'>
  <img align="center" src="./github_stats.svg">
</p>

## Usage

1. Create a New Repository using this Template or click [here](https://github.com/yogeshwaran01/github-stats-terminal-style/generate) to create.
2. Create the personal Acess token. Check this [link](https://docs.github.com/en/github/authenticating-to-github/keeping-your-account-and-data-secure/creating-a-personal-access-token) to create personal access token.
3. Add a New Repository secret to your repo. Name of the secret is must be `GHT` and valve is your personal access token. Checkout this [link](https://docs.github.com/en/actions/reference/encrypted-secrets) to add new repositiry secret.

The File `github_stats.svg` is svg image of your github stats. you can copy the link of the image and use it any where. By default it update daily at `2:47 UTC` you can also can this by change the cron in `/.github/workflows/main.yml` by using [Cron Generator](https://crontab.guru/).

## Themes

Now only Nine themes are only available.

By default random theme is assigned every day.

you can change the theme by change the command in file `/.github/workflows/main.yml`

change

```bash
node updater.js ${{ github.repository_owner }}
```

to this

```bash
node updater.js ${{ github.repository_owner }} <themeName>
```

|                           **Theme Sample**                            | **Theme Name** |
| :-------------------------------------------------------------------: | :------------: |
|        <img align="center" src="./themes/atom.svg" alt="atom">        |      atom      |
|     <img align="center" src="./themes/default.svg" alt="default">     |    default     |
|     <img align="center" src="./themes/dracula.svg" alt="dracula">     |    dracula     |
|      <img align="center" src="./themes/github.svg" alt="github">      |     github     |
|  <img align="center" src="./themes/googledark.svg" alt="googledark">  |   googledark   |
| <img align="center" src="./themes/googlelight.svg" alt="googlelight"> |  googlelight   |
|     <img align="center" src="./themes/monokai.svg" alt="monokai">     |    monokai     |
|  <img align="center" src="./themes/powershell.svg" alt="powershell">  |   powershell   |
|      <img align="center" src="./themes/ubuntu.svg" alt="Ubuntu">      |    ubunutu     |

Contributions, issue and pull requests are welcome

<h3 align='center'>Made With Python :heart:</h3>
