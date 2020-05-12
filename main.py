from flask import Flask, render_template, request
from generate_randomData import generate_random, generate_stratified, generate_originaldata
from clusters import findK
from screePlot import generateScreePlot, generateCollectiveScreePlotData
import numpy as np
import pandas as pd
from sklearn.preprocessing import StandardScaler
from flask import jsonify

app = Flask(__name__)


@app.route("/")
def home():
    return render_template("index.html")


@app.route("/generate_Originaldata")
def generate_Originaldata():
    print("Yaha bhi nahi?")
    return generate_originaldata()


@app.route("/generate_Randomdata")
def generate_Randomdata():
    return generate_random()

@app.route("/generate_OriginalScreePlotData")
def generate_OriginalScreePlotData():
    return generateScreePlot('original')

@app.route("/generate_ScreePlotData")
def generate_ScreePlotData():
    return generateScreePlot('random')


@app.route("/generate_StratScreePlotData")
def generate_StratScreePlotData():
    return generateScreePlot('stratified')


@app.route("/generate_collectiveScreePlotData")
def generate_collectiveScreePlotData():
    print("Mile kya")
    return generateCollectiveScreePlotData()


@app.route("/strat_findK")
def strat_findK():
    return findK()


@app.route("/generate_Stratdata", methods=['POST'])
def generate_Stratdata():
    k = request.json['k']
    return generate_stratified(k)





if __name__ == "__main__":
    app.run(debug=True)
