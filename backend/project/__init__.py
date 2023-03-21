import os
import subprocess
import time
import random
import pandas as pd
from os import listdir
from os.path import isfile, join
import re
import gzip
from threading import Lock
import matplotlib.pyplot as plt

from flask import (
    Flask,
    jsonify,
    send_from_directory,
    request,
)
from flask_cors import CORS, cross_origin

app = Flask(__name__)
app.config.from_object("project.config.Config")
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

default_algorithm = 'uncompressed'
path = "/datasets/"
dates = pd.date_range(start="2019-01-01",end="2019-12-31")
columns = ["windSpeedMean", "windSpeedMinimum", "windSpeedMaximum", "windSpeedVariance", "windSpeedNumPts", "windSpeedExpUncert", "windSpeedStdErMean", "windSpeedFinalQF", "windDirMean", "windDirVariance", "windDirNumPts", "windDirExpUncert", "windDirStdErMean", "windDirFinalQF"]
chunk_size = 1000


def file_size(filename):
    file_stats = os.stat(filename)
    return file_stats.st_size / (1024 * 1024)

@app.route("/")
@cross_origin()
def hello_world():
    csvfiles = [f for f in listdir(path) if isfile(join(path, f)) and f.endswith("csv.gz")]
    csvfiles.sort()
    csvfiles = [{"name": f, "size": str(f'{float(file_size(path + f)):.2f}') + 'MB'} for f in csvfiles]
    return jsonify(files=csvfiles)


@app.route("/load/")
@cross_origin()
def load_file_to_db_using_error():
    error = request.args['error']
    filenames = request.args['filenames'].split(',')
    filenames.sort()
    time.sleep(1)
    return jsonify(uncompressed=5.3, simpiece=1.2)

@app.route("/select/")
@cross_origin()
def select_file_from_db_using_error():
    error = request.args['error']
    filenames = request.args['filenames'].split(',')
    filenames.sort()
    time.sleep(1)
    return { "labels": [ '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18' ],
            "datasets": [
                {
                "label": 'Uncompressed',
                "data": [12.3, 12.4, 12.3, 12.2, 12.1, 11.0, 10.9, 9.5, 9.3, 9.1, 10.1, 11.1, 11.2, 11.2, 11.2, 11.1, 11.0, 11.0]
                },
                {
                "label": 'Sim-Piece',
                "data": [12.35, 12.41, 12.32, 12.22, 12.11, 11.07, 10.93, 9.4, 9.35, 9.12, 10.15, 11.12, 11.27, 11.25, 11.29, 11.11, 11.11, 11.01]
                }],
            "rmse": 1.04,
            "mae": 0.98
            }

@app.route("/forecast/")
@cross_origin()
def forecast_file_using_error():
    error = request.args['error']
    filenames = request.args['filenames'].split(',')
    filenames.sort()
    time.sleep(1)
    return { "labels": [ '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18' ],
            "datasets": [
                {
                "label": 'Original',
                "data": [12.3, 12.4, 12.3, 12.2, 12.1, 11.0, 10.9, 9.5, 9.3, 9.1, 10.1, 11.1, 11.2, 11.2, 11.2]
                },
                {
                "label": 'Uncompressed Forecast',
                "data": [None, None, None, None, None, None, None, None, None, None, None, None, None, None, 11.2, 11.05, 11.05, 11.01]
                },
                {
                "label": 'Sim-Piece Forecast',
                "data": [None, None, None, None, None, None, None, None, None, None, None, None, None, None, 11.2, 11.11, 11.11, 11.01]
                }],
            "rmse": 1.04,
            "mae": 0.98
            }

@app.route("/knn/")
@cross_origin()
def knn_file_using_error():
    error = request.args['error']
    filenames = request.args['filenames'].split(',')
    filenames.sort()
    time.sleep(1)
    return { "labels": [ '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20' ],
            "datasets": [
                {
                "label": 'Original',
                "data": [None, None, None, None, None, None, None, None, None, None, None, None, None, None, None, 15, 16, 18, 15, 16 ]
                },
                {
                "label": 'Top-1',
                "data": [15.1, 16, 18.2, 15.4, 16, None, None, None, None, None, None, None, None, None, None, None, None, None, None, None ]
                },
                {
                "label": 'Top-2',
                "data": [None, None, None, None, None, 15.9, 16.9, 19, 17, 14, None, None, None, None, None, None, None, None, None, None ]
                }],
            "recall": 80.00
            }

