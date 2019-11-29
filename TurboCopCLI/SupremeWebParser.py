# Copyright 2019 Dmitry Pleshkov. All Rights Reserved
# This file cannot be re-distributed without prior permission of the copyright holder

from json import loads as json_loads
from urllib.request import urlopen
from webbrowser import open as web_open


class SupremeWebParser:
    def __init__(self):
        self.target_ids = []
        self.target_names = []
        self.target_categories = []
        self.target_style_ids = []
        self.target_style_names = []
        self.target_size_ids = []
        self.target_size_names = []
        self.matches = 0

    def scan_for_style(self, item_id, category):
        item_info = urlopen("https://www.supremenewyork.com/shop/%s.json" % item_id).read().decode()
        item = json_loads(item_info)
        for style in item["styles"]:
            for style_id in self.target_style_ids:
                if style["id"] == style_id:
                    for size in style["sizes"]:
                        for size_id in self.target_size_ids:
                            if size["id"] == size_id:
                                print("Found matching style")
                                web_open("https://www.supremenewyork.com/shop/%s/%s/%s?turbocop_size_id=%s" % (category, item_id, style_id, size_id))
                                self.matches += 1
                        for size_name in self.target_size_names:
                            if size["name"] == size_name:
                                print("Found matching style")
                                web_open("https://www.supremenewyork.com/shop/%s/%s/%s?turbocop_size_id=%s" % (category, item_id, style_id, size["id"]))
                                self.matches += 1
            for style_name in self.target_style_names:
                if style["name"] == style_name:
                    web_open("https://www.supremenewyork.com/%s/%s/%s" % (category, item_id, style["id"]))

    def scan_for_item(self):
        mobile_stock = urlopen("https://www.supremenewyork.com/mobile_stock.json").read().decode()
        stock = json_loads(mobile_stock)
        for category in self.target_categories:
            for item in stock["products_and_categories"][category]:
                for target_id in self.target_ids:
                    if item["id"] == target_id:
                        print("Found matching item, now scanning for style")
                        self.scan_for_style(target_id, category)
                for target_name in self.target_names:
                    if item["name"] == target_name:
                        print("Found matching item, now scanning for style")
                        self.scan_for_style(item["id"], category)
