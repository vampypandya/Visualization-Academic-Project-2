import random
import pandas as pd
import numpy as np
from flask import jsonify
from scipy.spatial.distance import cdist
from sklearn.cluster import KMeans
from sklearn.preprocessing import StandardScaler
from kneed import KneeLocator


def findK():
    df = pd.read_csv('static/data/generated_Stratdata.csv')
    k = range(1, 20)
    clusters = [KMeans(n_clusters=c, init='k-means++').fit(df) for c in k]
    centr_lst = [cc.cluster_centers_ for cc in clusters]

    k_distance = [cdist(df, cent, 'euclidean') for cent in centr_lst]
    distances = [np.min(kd, axis=1) for kd in k_distance]
    avg_within = [np.sum(dist) / df.shape[0] for dist in distances]
    kn = KneeLocator(k, avg_within, curve='convex', direction='decreasing')
    print(kn.knee)
    toBeSaved = []
    for i in range(len(avg_within)):
        toBeSaved.append((i+1,avg_within[i]))
    df = pd.DataFrame(toBeSaved)
    filename = 'static/data/clusters.csv'
    df.columns = ['size', 'value']
    df.to_csv(filename)
    return jsonify(data=str(avg_within), k=str(kn.knee))
