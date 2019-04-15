import csv
import simplejson as json
import progressbar
import re

data = {}
ingredients = set()
foodGroupKeywords = {}

with open("p2_keywords_food_group.csv", 'r') as fin:  
    reader = csv.reader(fin)
    id = 0
    for row in reader:
        id += 1
        if id == 1:
            continue

        if row[0] not in foodGroupKeywords:
            foodGroupKeywords[row[0]] = []
        
        foodGroupKeywords[row[0]].append(row[1])
        
suffix = "_sample"
keys = []
colNames = [
    "allergy_eggs_milk",
    "allergy_soy_peanuts",
    "allergy_treenuts",
    "allergy_fish_shellfish",
    "allergy_wheat",
    
    "has_fruits",
    "has_vegetable",
    "has_nuts",
    "has_egg",
    "has_chicken",
    "has_pork",
    "has_beef",
    "has_lamp",
    "has_seafood",
]

foodGroupKeywords["allergy_eggs_milk"] = foodGroupKeywords["1"] + ["egg", "milk"]
foodGroupKeywords["allergy_soy_peanuts"] = foodGroupKeywords["16"] + ["soy", "peanut"]
foodGroupKeywords["allergy_treenuts"] = foodGroupKeywords["12"] + ["treenut", "nuts"]
foodGroupKeywords["allergy_fish_shellfish"] = foodGroupKeywords["15"] + ["fish", "seafood", "shellfish", "crab", "shrimp", "prawn"]
foodGroupKeywords["allergy_wheat"] = ["wheat"]
foodGroupKeywords["allergy_treenuts"] = foodGroupKeywords["12"] + ["treenut"]

foodGroupKeywords["has_fruits"] = foodGroupKeywords["9"] + ["fruits"]
foodGroupKeywords["has_vegetable"] = foodGroupKeywords["11"] + ["vegetable"]
foodGroupKeywords["has_nuts"] = foodGroupKeywords["12"] + ["treenut", "nuts"]
foodGroupKeywords["has_egg"] = foodGroupKeywords["1"] + ["egg"]
foodGroupKeywords["has_chicken"] = foodGroupKeywords["5"] + ["chicken"]
foodGroupKeywords["has_pork"] = foodGroupKeywords["10"] + ["pork"]
foodGroupKeywords["has_beef"] = foodGroupKeywords["13"] + ["beef"]
foodGroupKeywords["has_lamp"] = foodGroupKeywords["17"] + ["lamp"]
foodGroupKeywords["has_seafood"] = foodGroupKeywords["15"] + ["fish", "seafood"]

data = []

with open("p1_food"+suffix+".csv", 'r') as fin:  
    n = 0
    reader = csv.reader(fin)
    bar = progressbar.ProgressBar(maxval=239091, widgets=[progressbar.Bar('=', '[', ']'), ' ', progressbar.Percentage()])
    bar.start()
    for row in reader:
        n += 1
        bar.update(n)
        if n == 1:
            keys = row
            continue

        d = {}
        # l = row.strip()
        # try:
        #     if l[-1] == ",":
        #         d = json.loads(l[0:-1])
        #     else:
        #         d = json.loads(l)
        # except:
        #     continue

        # ing = row[4]
        # # ing = re.sub(r'\(([^\,]*?)\,+([^\,]*?)\)', r'(\1 \2)', ing)
        # ing = re.sub(r'[\(\[\{]([^\)\}\]]*?)[\)\]\}]', r', \1,', ing)
        # ing = re.sub(r'\.', r',', ing)
        # ing = re.sub(r'[\(\[\{\)\]\}]', r'', ing)
        
        # sp = ing.split(",")
        # ingredients.update([s.strip() for s in sp])

        newColValue = {}

        ll = row[4].lower()
        for col in colNames:
            newColValue[col] = False
            for keywords in foodGroupKeywords[col]:
                if keywords in ll:
                    newColValue[col] = True
        
        for col in colNames:
            row.append(newColValue[col])

        data.append(row)

    bar.finish()
    print(n)

with open('p3_food_with_allergy'+suffix+'.csv', 'w') as fout:
    writer = csv.writer(fout)
    writer.writerow(keys+colNames)
    writer.writerows(data)