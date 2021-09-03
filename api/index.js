const express = require("express")
const nunjucks = require('nunjucks')

const GithubUser = require("../src/github")
const themes = require("../src/theme")

const app = express();

nunjucks.configure('', {
    express: app,
    autoescape: true
})


app.set('view engine', 'svg')

app.get("/api", (req, res) => {

    let username = req.query.username || "yogeshwaran01"
    let theme = req.query.theme || "ubuntu"

    let user = new GithubUser.GithubUser(username)
    user.fetchContent()
        .then(() => {
            res.set({
                'Content-Type': "image/svg+xml; charset=utf-8",
                "Cache-Control": "public, max-age=7200",
                "Expires": new Date(new Date().getTime() + 120 * 60000).toUTCString()
            })
            res.render("template.svg", {
                data: user,
                theme: themes.getTheme(theme)
            })
        })
        .catch((e) => {
            res.send("<h1>Not Found</h1>")
            console.log(e);
        })

}

)

module.exports = app;
