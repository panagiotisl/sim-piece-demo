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
def load_file_to_db_using_algorithm():
    error = request.args['error']
    filenames = request.args['filenames'].split(',')
    filenames.sort()
    time.sleep(1)
    return jsonify(uncompressed=5.3, simpiece=1.2)
