import findspark

findspark.init()

import pyspark
import sys

if len(sys.argv) != 3:
    raise Exception("Exactly 2 arguments are required: <inputUri><outputUri>")

inputUri = sys.argv[1]
outputUri = sys.argv[2]


# takes an input, provides an output pairing
def myMapFunc(x):
    return (len(x), 1)


# Merge two volumes with a common key - operation must be .... and commit
def myReduceFunc(v1, v2):
    return v1 + v2


sc = pyspark.SparkContext()
print("Spark Context initialized")
# textFile -> take the address of a text file, return it as an RDD (hadoop dataset) of strings
lines = sc.textFile(sys.argv[1])
# Flatmap --> Apply a function to each element of the dataset, then flatten the result
sentence = lines.flatMap(lambda line: line.split("\n"))
sentenceCounts = sentence.map(myMapFunc).reduceByKey(myReduceFunc)
print("Operation complete")
sentenceCounts.saveAsTextFile(sys.argv[2])
print("Output saved as text file.")
