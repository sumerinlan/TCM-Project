# TCM-Project

## Overview
Our team chose to implement the model that predicts diseases and Traditional Chinese herb based on the symptoms that the patients have referencing the paper "Herb recommendation system for Traditional Chinese Medicine" (http://times.cs.uiuc.edu/czhai/pub/TCM.pdf)

2) Documentation of how the software is implemented with sufficient detail so that others can have a basic understanding of your code for future extension or any further improvement.
## Software implementation
Our project are composed of two main parts - the back end data processing and front end data visualization.
* ### Model training
The training data files are located under `data\`. The main training data set is `data\HIS_Tuple.txt` where each line is of the form `diseases symptoms herbs` where the each entry is indexes separated by `:`. The mapping from index to actual diseases, symptoms, and herbs can be found at `dis_dct.txt`, `sym_dct.txt`, and `herb_dict.txt`. We follow train our model following the EM algorithm provided in the paper. Specifically, we have the following steps for training:
   * E step:
      * ![E Step](./E_Step.png)

   * M step:
      *   ![M Step](https://github.com/sumerinlan/TCM-Project/blob/master/M_step.png =50x)
