#!/usr/local/bin/python3

from time import sleep
from webbrowser import open as web_open
from termcolor import cprint
from json import loads as json_loads
from urllib.request import urlopen
from sys import exit as sys_exit

cprint("Welcome to TurboCop™.", "red")
cprint("Program Version: Nov 28 2019 dev release", "yellow")
cprint("Would you like to cop by item ID or item name?", "cyan")
search_mode = input("[id, name] > ")
while search_mode not in ("id", "name"):
    search_mode = input("Please enter either \"id\" or \"name\" > ")
cprint("How many different items are you buying?", "cyan")

item_id = 1
item_name = "Handbag"
if search_mode == "id":
    cprint("Please enter target item ID.", "cyan")
    item_id = input("> ")
elif search_mode == "name":
    cprint("Please enter exact item name (as seen in mobile_stock.json).", "cyan")
    item_name = input("> ")

if search_mode == "id":
    while True:
        mobile_stock = urlopen("https://www.supremenewyork.com/mobile_stock.json")
        stock = mobile_stock.read().decode()
        if item_id in stock:
            cprint("Found! Opening shop webpage.")
            web_open("https://www.supremenewyork.com/shop/%s" % item_id)
            sys_exit()
        print("Not found, retrying...")
        sleep(0.1)
elif search_mode == "name":
    while True:
        mobile_stock = urlopen("https://www.supremenewyork.com/mobile_stock.json")
        stock = mobile_stock.read().decode()
        stock_json = json_loads(stock)
        products = stock_json["products_and_categories"]
        for category in products:
            for item in products[category]:
                if item["name"] == item_name:
                    cprint("Found! Opening shop webpage.")
                    web_open("https://www.supremenewyork.com/shop/%s" % item["id"])
                    sys_exit()
        print("Not found, retrying...")
        sleep(0.1)
