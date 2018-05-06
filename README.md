# TCM-Project

## Overview
Our team chose to implement the model that predicts diseases and Traditional Chinese herb based on the symptoms that the patients have referencing the paper "Herb recommendation system for Traditional Chinese Medicine" (http://times.cs.uiuc.edu/czhai/pub/TCM.pdf)

2) Documentation of how the software is implemented with sufficient detail so that others can have a basic understanding of your code for future extension or any further improvement.
## Software implementation
Our project are composed of two main parts - the back end data processing and front end data visualization.
* ### Model training
The training data files are located under `data\`. The main training data set is `data\HIS_Tuple.txt` where each line is of the form `diseases symptoms herbs` where the each entry is indexes separated by `:`. The mapping from index to actual diseases, symptoms, and herbs can be found at `dis_dct.txt`, `sym_dct.txt`, and `herb_dict.txt`. We follow train our model following the EM algorithm provided in the paper. Specifically, we have the following steps for training:
   * E step:
      * ![E Step](https://github.com/sumerinlan/TCM-Project/blob/master/E_step.png)

   * M step:
      *   ![M Step](https://github.com/sumerinlan/TCM-Project/blob/master/M_step.png)

Since the while data set contains 9000+ records and there are about 10k possible values for diseases, herbs, and symptoms, the computation overhead is too much. In stead, we extracted top 93 popular diseases, most frequent 500 symptoms and herbs and first 985 records as the training data for our model.
