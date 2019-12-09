from flask import Flask, jsonify
from urllib.request import urlopen
from json import loads as json_loads
import os

app = Flask(__name__)


@app.route("/mobile_stock.json")
def proxy_mobile_stock():
    return jsonify(json_loads(urlopen("https://www.supremenewyork.com/mobile_stock.json").read()))

@app.route("/shop/<itemid>.json")
def proxy_item_json(itemid):
    return jsonify(json_loads(urlopen("https://www.supremenewyork.com/shop/%s.json"%itemid).read()))


if __name__ == "__main__":
    port = int(os.environ.get('PORT', 5000))
    app.run(port=port, host="0.0.0.0")
