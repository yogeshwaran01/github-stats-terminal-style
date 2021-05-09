from flask import Flask, jsonify, make_response, render_template, request
from github.GithubException import (RateLimitExceededException,
                                    UnknownObjectException)

from github_utils import get_stats, gh
from themes.themes import THEMES, get_theme

app = Flask(__name__)


@app.route("/<username>")
def render_svg(username):
    theme = request.args.get('theme')
    try:
        userdata = get_stats(username)
    except UnknownObjectException:
        return jsonify({"error": "username not found"})
    except RateLimitExceededException:
        return jsonify({"error": "Rate limit exceeded"})
    res = make_response(render_template(
        "template.svg", data=userdata, theme=get_theme(theme)
    ))
    res.mimetype = "image/svg+xml"
    return res


@app.route('/api/rate')
def render_ratelimt():
    return jsonify({'rate-limit': gh.rate_limiting[0]})


@app.route('/api/themes')
def render_themes():
    return jsonify(list(THEMES.keys()))


if __name__ == "__main__":
    app.run()
