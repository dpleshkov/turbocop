from SupremeWebParser import *

parser = SupremeWebParser()
parser.target_ids = [172849]
parser.target_style_ids = [25810]
parser.target_size_names = ["Large"]
parser.target_categories = ["Shirts", "new"]

while parser.matches <= 0:
    parser.scan_for_item()