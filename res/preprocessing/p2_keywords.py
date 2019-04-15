import csv
import simplejson as json
import progressbar

products = "dataset/FOOD NAME.csv"

data = []
with open(products, 'r', encoding='ISO-8859-1') as fin:  
    reader = csv.reader(fin)
    id = 0
    bar = progressbar.ProgressBar(maxval=6000, widgets=[progressbar.Bar('=', '[', ']'), ' ', progressbar.Percentage()])
    bar.start()
    for row in reader:
        id += 1
        bar.update(id)
        if id == 1:
            print(row)
            continue

        group = row[2]
        names = row[4].split(",")
        if int(group) in [1, 16, 12, 15, 16, 9, 11, 5, 10, 13, 17]:
            for n in names:
                data.append((group, n.strip().lower()))
                break

    bar.finish()


data = list(set(data))
print(len(data))
with open('p2_keywords_food_group.csv', 'w') as outfile:
    id = 0
    outfile.write("Group, Name\n")
    for values in data:
        outfile.write(",".join(values)+"\n")
        id += 1