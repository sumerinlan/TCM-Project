# TCM-Project

## Overview
Our team chose to implement the model that predicts diseases and Traditional Chinese herb based on the symptoms that the patients have referencing the paper "Herb recommendation system for Traditional Chinese Medicine" (http://times.cs.uiuc.edu/czhai/pub/TCM.pdf)

2) Documentation of how the software is implemented with sufficient detail so that others can have a basic understanding of your code for future extension or any further improvement.
## Software implementation
Our project are composed of two main parts - the back end data processing and front end data visualization. The detailed descriptions of the main parts are as the following:
* ### Model training
   The training data files are located under `data\`. The main training data set is `data\HIS_Tuple.txt` where each line is of the form `diseases symptoms herbs` where the each entry is indexes separated by `:`. The mapping from index to actual diseases, symptoms, and herbs can be found at `dis_dct.txt`, `sym_dct.txt`, and `herb_dict.txt`. We follow train our model following the EM algorithm provided in the paper. Specifically, we have the following steps for training:
   * E step:
      * Pr(d|s,h,t) = c * P<sup>n</sup>(d) * P<sup>n</sup>(t|d) * P<sup>n</sup>(s|d) * P<sup>n</sup>(h|d)
   * M step:
      * P<sup>n+1</sup>(d) = c * SUM<sub>t,h,s</sub> I(t,s,h) * P<sup>n</sup>(d|s,h,t)
      * P<sup>n+1</sup>(t|d) = c * SUM<sub>h,s</sub> I(t,s,h) * P<sup>n</sup>(d|s,h,t)
      * P<sup>n+1</sup>(s|d) = c * SUM<sub>t,h</sub> I(t,s,h) * P<sup>n</sup>(d|s,h,t)
      * P<sup>n+1</sup>(h|d) = c * SUM<sub>t,s</sub> I(t,s,h) * P<sup>n</sup>(d|s,h,t)

      Since the while data set contains 9000+ records and there are about 10k possible values for diseases, herbs, and symptoms, the computation overhead is too much. Instead, we extracted top 92 popular diseases, most frequent 500 symptoms and herbs and first 985 records as the training data for our model. The detailed training code is located at `/src/TCM_Model_training.ipynb`. We then store the parameter of our model in pickle file under `training_result\`.


* ### Disease/herb prediction
   Using the tuned model parameter, we are now able to predict the diseases of the patient based on symptoms. In order to predict the diseases, we used the following method suggested in the paper: Pr(d|{s1,s2, ... ,sn}) = c * Pr(s1|d) * ... * Pr(sn|d) * Pr(d). Given the symptoms, we compute the rank of all possible diseases and return the top 10 ranked diseases. For each disease, we recommend herbs based on our model parameter Pr(h|d). The commendation function is written in `src/server.py` which servers as the server for our front end visualization.

* ### Front end
   We also implement front end user interface that interacts with out back end server. The patients are prompted to input their symptoms and we then display top 10 most possible diseases and 4 herbs for each disease. In order to make our website more user friendly, we also add the feature of auto-completion where users can just type in few characters and the system will infer related symptoms. It's particular useful when the user is not sure about the exact description of his/her symptoms.

## Usage
Our entire application is developed using `python3`. In order to run the application, one would need to run the server first by executing `python3 src/server.py`. To access the front end user interface of our application, simply open `index.html` using one of the web browser.

## Contribution
