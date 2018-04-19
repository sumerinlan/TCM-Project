#!/usr/bin/env python
# -*- coding: utf-8 -*-

import sys
import json

reload(sys)
sys.setdefaultencoding('utf-8')

data = {}

count = 0

with open("../data/" + sys.argv[1] + ".txt") as f:
	line = f.readline()
	while line:
		# print(line)
		# count += 1
		# if count > 6:
		# 	break
		line = line.strip()
		for i in range(len(line) - 1, -1, -1):
			if line[i] < '0' or line[i] > '9':
				k = i
				break
		index = int(line[k + 1:])
		# print(index, line[k])
		# if line[k] == '\t':
		word = line[:k].strip()
		# else:
			# print(line[:k].strip()[:-2])
			# print(index, len(line[:k].strip()))
			# break
			# word = line[:k-1].strip()
		data[word] = index
		line = f.readline()
	print(index)

with open("../data/" + sys.argv[1] + ".json", "w") as f:
	json.dump(data, f, ensure_ascii=False)
