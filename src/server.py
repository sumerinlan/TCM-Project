from http.server import BaseHTTPRequestHandler, HTTPServer
from urllib.parse import urlparse, parse_qs
import json
import pickle
import numpy as np

# HTTPRequestHandler class
class testHTTPServer_RequestHandler(BaseHTTPRequestHandler):

    # Send header
    def _set_headers(self):
        self.send_response(200, 'OK')
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Content-type','text/json')
        self.end_headers()

    # GET
    def do_GET(self):

        params = parse_qs(urlparse(self.path).query)
        print(params)

        if ('symptoms' not in params):
            self._set_headers()
            self.wfile.write(bytes(json.dumps({"diseases":[], "herbs":[]}), "utf8"))
            return

        # Get symptoms
        symptoms = params['symptoms'][0].split('\'')
        symptoms_index = []
        for symptom in symptoms:
            for index in sym_dict:
                if sym_dict[index] == symptom:
                    symptoms_index.append(index)
                    continue
        print(symptoms_index)

        # Predict diseases
        diseases = predict_diseases(symptoms_index)
        diseases_name = [dis_dict[d] for d in diseases]
        print(diseases_name)

        # Predict herbs based on diseases
        herbs = predict_herbs(diseases)
        herbs_name = []
        for x in herbs:
            herb_name = [herb_dict[y] for y in x]
            herbs_name.append(herb_name)
        print(herbs_name)

        ret = {}
        for i in range(len(diseases_name)):
            ret[diseases_name[i]] = herbs_name[i]

        print(ret)
        # send the headers
        self._set_headers()
        self.wfile.write(bytes(json.dumps(ret), "utf8"))
        return

def run():
    print('starting server...')

    # Server settings
    # Choose port 8080, for port 80, which is normally used for a http server, you need root access
    server_address = ('', 8080)
    httpd = HTTPServer(server_address, testHTTPServer_RequestHandler)
    print('running server...')
    httpd.serve_forever()


# Helper function that parses a text file into a dictionary
def parse_dict(file_name):
    with open('../data/'+file_name) as file:
        lines = file.readlines()
    lines = [line.strip().split() for line in lines]
    dict = {}
    for line in lines:
        if len(line) == 2:
            dict[int(line[1])] = line[0]
    return dict

# Helper function that takes in symptom list and predicts diseases
def predict_diseases(sym_list):
    diseases = {}
    # For each disease, compute Pr(d|{s1,s2,...,sn})
    for d in key_dis:
        dis_prob = 0.0
        for s in sym_list:
            dis_prob += np.log(P_s_d[d][s])
        dis_prob += np.log(P_d[d])
        diseases[d] = dis_prob

    dis_rank = [(d, diseases[d]) for d in sorted(diseases, key=diseases.get, reverse=True)]
    ret = []
    for i in range(10):
        ret.append(dis_rank[i][0])
    return ret

# Helper function that takes in disease list and predicts herbs for corresponding diseases
def predict_herbs(diseases):
    herbs = []
    for disease in diseases:
        potential_herbs = list(P_h_d[disease].items())
        potential_herbs = sorted(potential_herbs, key=lambda herb: herb[1], reverse=True)
        herb_for_one_disease = []
        for i in range(4):
            herb_for_one_disease.append(potential_herbs[i][0])
        herbs.append(herb_for_one_disease)
    return herbs

if __name__ == "__main__":
    # Get the dictionary
    sym_dict = parse_dict('sym_dct.txt')
    herb_dict = parse_dict('herb_dct.txt')
    dis_dict = parse_dict('dis_dct.txt')

    # Load the training result
    P_d = pickle.load( open( "../training_result/P_d.p", "rb" ) )
    P_t_d = pickle.load( open( "../training_result/P_t_d.p", "rb" ) )
    P_s_d = pickle.load( open( "../training_result/P_s_d.p", "rb" ) )
    P_h_d = pickle.load( open( "../training_result/P_h_d.p", "rb" ) )
    key_dis = pickle.load( open( "../training_result/key_dis", "rb"))
    key_herb = pickle.load( open("../training_result/key_herb", "rb"))
    key_sym = pickle.load( open("../training_result/key_sym", "rb"))

    run()
