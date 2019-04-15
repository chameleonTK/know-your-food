import csv
import simplejson as json
import progressbar

from random import randint

products = "dataset/Products.csv"
nutrients = "dataset/Nutrients.csv"
servingSize = "dataset/Serving_size.csv"

data = {}
nutr = set()
ingredients = set()
nLimit = None

with open(products, 'r') as fin:  
    reader = csv.reader(fin)
    id = 0
    bar = progressbar.ProgressBar(maxval=239091, widgets=[progressbar.Bar('=', '[', ']'), ' ', progressbar.Percentage()])
    bar.start()
    for row in reader:
        id += 1
        bar.update(id)
        if id == 1:
            continue
        
        if nLimit is not None and id >= nLimit:
            break

        NDB_NO = row[0]
        data[NDB_NO] = {
            "NDB_NO": NDB_NO,
            # "nutrients": []
        }

        data[NDB_NO]["name"] = row[1]
        data[NDB_NO]["data_source"] = row[2]
        data[NDB_NO]["data_available"] = row[6]
        data[NDB_NO]["ingredients"] = row[7]
        data[NDB_NO]["Serving_Size"] = None
        data[NDB_NO]["Serving_Size_UOM"] = None
        data[NDB_NO]["Household_Serving_Size"] = None
        data[NDB_NO]["Household_Serving_Size_UOM"] = None
        data[NDB_NO]["Preparation_State"] = None
        data[NDB_NO]["nutrients"] = {}
        # data[NDB_NO]["ingredients"] = row[7].split(",")
        # ingredients.update(row[7].split(","))
        # data[NDB_NO]["allergy"] = {
        #     "eggs": False, #Dairy and Egg Products (1)
        #     "milk": False, #Dairy and Egg Products (1)
        #     "peanuts": False, #Legumes and Legume Products (16)
        #     "treenuts": False, #Nuts and Seeds (12)
        #     "fish": False, #Finfish and Shellfish Products (15)
        #     "shellfish": False, #Finfish and Shellfish Products (15)
        #     "wheat": False, #wheat
        #     "soy": False, #Legumes and Legume Products (16)
        # }
        
        # data[NDB_NO]["has_ingredients"] ={
        #     "fruits": False, #Fruits and fruit juices (9)
        #     "vegetable": False, #Vegetables and Vegetable Products (11)
        #     "nuts": False, #Nuts and Seeds (12)
        #     "egg": False, #Dairy and Egg Products (1)
        #     "chicken": False, #Poultry Products (5)
        #     "pork": False, #Pork Products (10)
        #     "beef": False, #Beef Products (13)
        #     "lamp": False, #Lamb, Veal and Game (17)
        #     "fish": False, #Finfish and Shellfish Products (15)
        #     "seafood": False, #Finfish and Shellfish Products (15)
        # }

        # data[NDB_NO]["food_category"] = ""

    bar.finish()

with open(servingSize, 'r') as fin:
    reader = csv.reader(fin)
    bar = progressbar.ProgressBar(maxval=237912, widgets=[progressbar.Bar('=', '[', ']'), ' ', progressbar.Percentage()])
    bar.start()
    id = 0
    for row in reader:
        id += 1
        bar.update(id)

        if id == 1:
            continue
        
        if nLimit is not None and id >= nLimit*100:
            break
        
        NDB_NO = row[0]

        if NDB_NO in data:
            data[NDB_NO]["Serving_Size"] = row[1]
            data[NDB_NO]["Serving_Size_UOM"] = row[2]
            data[NDB_NO]["Household_Serving_Size"] = row[3]
            data[NDB_NO]["Household_Serving_Size_UOM"] = row[4]
            data[NDB_NO]["Preparation_State"] = row[5]
    bar.finish()

with open(nutrients, 'r') as fin:
    reader = csv.reader(fin)
    bar = progressbar.ProgressBar(maxval=3231490, widgets=[progressbar.Bar('=', '[', ']'), ' ', progressbar.Percentage()])
    bar.start()
    id = 0
    for row in reader:
        id += 1
        bar.update(id)

        if id == 1:
            continue
        
        # if nLimit is not None and id >= nLimit*1000:
        #     break
        
        nutr.add(row[2])
        NDB_NO = row[0]

        if NDB_NO in data:
            data[NDB_NO]["nutrients"][row[2]] = {
                "Nutrient_Code": row[1],
                "Nutrient_Name": row[2],
                "Derivation_Code": row[3],
                "Output_Value": row[4],
                "Output_UOM": row[5],
            }

    bar.finish()

with open('nutrients.json', 'w') as outfile:
    outfile.write(json.dumps(list(nutr), sort_keys=True, indent=4))

# print(len(data))
# with open('p1_food.json', 'w') as outfile:
#     outfile.write("[\n")
#     id = 0
#     for values in data.values():
#         # outfile.write(json.dumps(data.values(), sort_keys=True, indent=4))
#         if id ==0:
#             outfile.write(json.dumps(values))
#         else:
#             outfile.write(", \n"+json.dumps(values))
#         id += 1
        
#     outfile.write("\n]\n")


keys = ['NDB_NO', 'name', 'data_source', 'data_available', 'ingredients', 'Serving_Size', 'Serving_Size_UOM', 'Household_Serving_Size', 'Household_Serving_Size_UOM', 'Preparation_State']
lnutr = list(nutr)
sample = []

fsample = open('p1_food_sample.csv', 'w')
swriter = csv.writer(fsample)

with open('p1_food.csv', 'w') as fout:
    writer = csv.writer(fout)
    colNames = keys[:]
    for n in lnutr:
        colNames.append(n+"[Output_Value]")
        colNames.append(n+"[Output_UOM]")
        colNames.append(n+"[Derivation_Code]")

    swriter.writerow(colNames)
    writer.writerow(colNames)
    for id in data:
        d = data[id]
        
        dd = [d[k] for k in keys]
        NDB_NO = id
        for n in lnutr:
            if n in data[NDB_NO]["nutrients"]:
                dd.append(data[NDB_NO]["nutrients"][n]["Output_Value"])
                dd.append(data[NDB_NO]["nutrients"][n]["Output_UOM"])
                dd.append(data[NDB_NO]["nutrients"][n]["Derivation_Code"])
            else:
                dd.append(None)
                dd.append(None)
                dd.append(None)

        if randint(0, 9)%10 == 0:
            swriter.writerow(dd)
        writer.writerow(dd)

fsample.close()
