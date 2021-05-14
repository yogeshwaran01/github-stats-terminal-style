from datetime import datetime, timedelta

from flask import Flask, jsonify, make_response, render_template, request
from flask_compress import Compress
from flask_cors import CORS
from github.GithubException import RateLimitExceededException
from github.GithubException import UnknownObjectException

from github_utils import get_stats, gh
from themes.themes import THEMES, get_theme

app = Flask(__name__)
compress = Compress(app)
CORS(app)

app.config["COMPRESS_MIMETYPES"] = ["image/svg+xml", "application/json"]


@app.route("/<username>")
def render_svg(username):
    theme = request.args.get("theme")
    try:
        userdata = get_stats(username)
    except UnknownObjectException:
        return jsonify({"error": "username not found"})
    except RateLimitExceededException:
        return jsonify({"error": "Rate limit exceeded"})
    res = make_response(
        render_template("template.svg", data=userdata, theme=get_theme(theme))
    )
    res.mimetype = "image/svg+xml"
    expire_time = datetime.now() + timedelta(minutes=120)
    res.add_etag()
    res.headers.update(
        {
            "Expires": expire_time.strftime("%a, %d %b %Y %H:%M:%S GMT"),
            "Cache-Control": f"public, max-age={int(60 * 120)}",
        }
    )
    return res


@app.route("/api/rate")
def render_ratelimt():
    return jsonify({"rate-limit": gh.rate_limiting[0]})


@app.route("/api/themes")
def render_themes():
    res = jsonify(list(THEMES.keys()))
    res.mimetype = "application/json"
    return res


if __name__ == "__main__":
    app.run()
