from flask import Flask, request
import flask
import json
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

url = "https://edwardtanguay.vercel.app/share/techItems.json"


@app.route("/")
def hello():
    return "Hello, World!"


@app.route(url, methods=["GET", "POST"])
def users():
    if request.method == "GET":
        with open(url, "r") as f:
            data = json.load(f)
            return data

    if request.method == "POST":
        received_data = request.get_json()
        print(f"received data: {received_data}")
        message = received_data['data']
        return_data = {
            "status": "success",
            "message": f"received: {message}"
        }
        return flask.Response(response=json.dumps(return_data), status=201)


if __name__ == "__main__":
    app.run("localhost", 3000)
