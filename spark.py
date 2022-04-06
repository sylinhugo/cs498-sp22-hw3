import findspark

findspark.init()

import pyspark
import sys
import re

if len(sys.argv) != 3:
    raise Exception("Exactly 2 arguments are required: <inputUri><outputUri>")

inputUri = sys.argv[1]
outputUri = sys.argv[2]


# takes an input, provides an output pairing
def myMapFunc(x):
    clean_x = re.sub("[^a-zA-Z]+", "", x)
    res = len(clean_x)
    # return (len(x) - x.count(" ") - x.count(",") - x.count("."), 1)
    return (res, 1)


# Merge two volumes with a common key - operation must be .... and commit
def myReduceFunc(v1, v2):
    return v1 + v2


sc = pyspark.SparkContext()
print("Spark Context initialized")
# textFile -> take the address of a text file, return it as an RDD (hadoop dataset) of strings
lines = sc.textFile(sys.argv[1])
# Flatmap --> Apply a function to each element of the dataset, then flatten the result
# words = lines.flatMap(lambda line: line.split())
sentence = lines.flatMap(lambda line: line.split("\n"))
# wordCounts = words.map(myMapFunc).reduceByKey(myReduceFunc)
sentenceCounts = sentence.map(myMapFunc).reduceByKey(myReduceFunc)
print("Operation complete")
# wordCounts.saveAsTextFile(sys.argv[2])
sentenceCounts.saveAsTextFile(sys.argv[2])
print("Output saved as text file.")
