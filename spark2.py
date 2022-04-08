import pyspark
import sys
import re
import json
import findspark

findspark.init()

if len(sys.argv) != 5:
    raise Exception(
        "Exactly 4 arguments are required: <inputUri><frequency><whichKey><outputUri>"
    )

inputUri = sys.argv[1]
frequency = sys.argv[2]  # frequency = 1 to 2 (the time of testcase)
whichKey = sys.argv[3]  # whichKey = 0 to 2 (the key in wordlist)
outputUri = sys.argv[4]

store_file = ""
if frequency == "1":
    if whichKey == "0":
        store_file = "hw3-res-10.txt"
    elif whichKey == "1":
        store_file = "hw3-res-11.txt"
    elif whichKey == "2":
        store_file = "hw3-res-12.txt"
elif frequency == "2":
    if whichKey == "0":
        store_file = "hw3-res-20.txt"
    elif whichKey == "1":
        store_file = "hw3-res-21.txt"
    elif whichKey == "2":
        store_file = "hw3-res-22.txt"

tmp_dict = dict()
max_val = -10
max_str = ""
cur_key = ""

# takes an input, provides an output pairing
def myMapFunc(x):
    val = 0
    clean_x = re.sub(r"[^\w\s]", "", x)
    clean_x = "".join(clean_x.split())
    clean_x = clean_x.lower()

    with open("q3_testcase.json") as json_file:
        data = json.load(json_file)

    for e in clean_x:
        if e in data["weights"]:
            val += data["weights"][e]

    keys_list = data["wordlist"]
    key = keys_list[int(whichKey)]
    weight = 0

    if key in clean_x:
        if key in tmp_dict:
            if val > tmp_dict[key]:
                tmp_dict[key] = val

                with open(store_file, "r") as file_1:
                    line_weight = file_1.readline()
                    if line_weight:
                        weight = int(line_weight)

                with open(store_file, "a") as file_2:
                    if val > weight:
                        file_2.write(str(val))
                        file_2.write("\n")
                        file_2.write(key)
                        file_2.write("\n")
                        file_2.write(x)
                        file_2.write("\n")

        else:
            tmp_dict[key] = val
            with open(store_file, "a") as file_3:
                file_3.write(str(val))
                file_3.write("\n")
                file_3.write(key)
                file_3.write("\n")
                file_3.write(x)
                file_3.write("\n")

        return (key, val)
    else:
        return ("", 0)


# Merge two volumes with a common key - operation must be .... and commit
def myReduceFunc(v1, v2):
    return max(v1, v2)


sc = pyspark.SparkContext()
print("Spark Context initialized")
# textFile -> take the address of a text file, return it as an RDD (hadoop dataset) of strings
lines = sc.textFile(sys.argv[1])
# Flatmap --> Apply a function to each element of the dataset, then flatten the result
sentence = lines.flatMap(lambda line: line.split("\n"))
sentenceCounts = sentence.map(myMapFunc).reduceByKey(myReduceFunc)
print("Operation complete")
sentenceCounts.saveAsTextFile(sys.argv[4])
print("Output saved as text file.")
print("True")
