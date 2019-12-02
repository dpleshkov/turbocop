from SupremeWebParser import *

parser = SupremeWebParser()
parser.target_names = ["Scatter Text Crewneck", "International Headband"]
parser.target_style_names = ["Navy", "Orange"]
parser.target_size_names = ["Medium", "N/A"]
parser.target_categories = ["new"]
parser.target_matches = 2

'''parser = SupremeWebParser()
parser.target_names = ["Supreme®/Spitfire® OG Classic Wheels (Set of 4)", "Martin Wong/Supreme Big Heat Skateboard"]
parser.target_style_names = ["Green 52MM", 'Multicolor - 8.25\" x 32\"']
parser.target_size_names = ["8 1/4", "52MM"]
parser.target_categories = ["new", "Accessories", "Skate"]
parser.target_matches = 2'''#ignore this one

while parser.matches < 2:
    parser.scan_for_item()