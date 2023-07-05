import os
from flask import Flask, send_from_Directory

app = Flask(__name__)

@app.route("/", defaults={"path": ""})
@app.route("/static/<path:path>")
@app.route('/with_parameters')
def serve_static(path):
    return send_from_Directory('static', '../github_stats.svg')

if __name__ == "__main__":
    app.run(host="0.0.0.0", debug=True, port=os.getenv("PORT") or 5000)