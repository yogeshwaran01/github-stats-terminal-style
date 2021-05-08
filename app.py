from flask import Flask, make_response, render_template

from github_utils import get_stats

app = Flask(__name__)

@app.route("/")
def reder():
    res = make_response(render_template('template.svg'))
    res.mimetype = "image/svg+xml"
    return res

if __name__ == "__main__":
    app.run(debug=True)
