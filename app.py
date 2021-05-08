from flask import Flask, jsonify, make_response, render_template
from github.GithubException import RateLimitExceededException
from github.GithubException import UnknownObjectException

from github_utils import get_stats

app = Flask(__name__)


@app.route("/<username>")
def render_svg(username):
    try:
        userdata = get_stats(username)
    except UnknownObjectException:
        return jsonify({"error": "username not found"})
    except RateLimitExceededException:
        return jsonify({"error": "Rate limit exceeded"})
    res = make_response(render_template("template.svg", data=userdata))
    res.mimetype = "image/svg+xml"
    return res


if __name__ == "__main__":
    app.run(debug=True)
