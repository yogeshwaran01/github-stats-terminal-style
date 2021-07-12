<h1 align='center'>GitHub Stats Terminal Style</h1>
<p align='center'>Dynamically Generate GitHub Stats as like Terminal Interface </p>

<p align='center'>
  <img align="center" src="./github_stats.svg">
</p>

## Usage

Create a New Repository using this Template or click [here](https://github.com/yogeshwaran01/github-stats-terminal-style/generate) to create. `github_stats.svg` is svg image of your github stats. you can copy the link of the image and use it any where. By default it update daily at `2:47 UTC` you can also can this by change the cron in `/.github/workflows/main.yml` by using [Cron Generator](https://crontab.guru/).

## Themes

Now only Nine themes are only available.

you can change the theme by change the command in file `/.github/workflows/main.yml`

change

```bash
python3 update_stats.py ${{ github.repository_owner }}
```

to this

```bash
python3 update_stats.py ${{ github.repository_owner }} --theme <Theme Name>
```

- ubuntu
- dracula
- monokai
- atom
- github
- googledark
- googlelight
- powershell

Contributions, issue and pull requests are welcome

<h3 align='center'>Made With Python :heart:</h3>
