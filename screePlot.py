from functools import reduce

import numpy as np
import pandas as pd
from sklearn.preprocessing import StandardScaler
from flask import jsonify
from sklearn.decomposition import PCA
import json
import math
from kneed import KneeLocator
from sklearn import cluster, metrics
from scipy.spatial.distance import cdist
from sklearn.cluster import KMeans
from sklearn.manifold import MDS
from sklearn import preprocessing
import os.path


def getNumComponents(type):
    if type == 'random':
        return 6
    if type == 'stratified':
        return 6
    if type == 'original':
        return 6


def findK(type):
    if type == 'random':
        filename = 'static/data/generated_Randomdata.csv'
    if type == 'stratified':
        filename = 'static/data/generated_Stratdata.csv'
    if type == 'original':
        filename = 'static/data/generated_Originaldata.csv'
    filename = 'static/data/PCAEigenValues_' + type + '.csv'
    data = pd.read_csv(filename)
    data = data.select_dtypes(exclude=['O', 'bool'])
    data = data.dropna()
    data = data.dropna(axis='columns')
    scaler = StandardScaler()
    data = scaler.fit_transform(data)
    # return jsonify('True')
    k = range(1, 30)
    features = data
    clusters = [KMeans(n_clusters=c, init='k-means++').fit(features) for c in k]
    centr_lst = [cc.cluster_centers_ for cc in clusters]

    k_distance = [cdist(features, cent, 'euclidean') for cent in centr_lst]
    clust_indx = [np.argmin(kd, axis=1) for kd in k_distance]
    distances = [np.min(kd, axis=1) for kd in k_distance]
    avg_within = [np.sum(dist) / features.shape[0] for dist in distances]

    kn = KneeLocator(k, avg_within, curve='convex', direction='decreasing')
    print(kn.knee)
    return kn.knee


def generateScreePlot(type):
    if type == 'random':
        datafile = 'static/data/generated_Randomdata.csv'
        data = pd.read_csv(datafile)
        data = data.drop(columns=['Unnamed: 0'])
    elif type == 'stratified':
        datafile = 'static/data/generated_Stratdata.csv'
        data = pd.read_csv(datafile)
        data = data.drop(columns=['Unnamed: 0'])
    elif type == 'original':
        datafile = 'static/data/generated_Originaldata.csv'
        data = pd.read_csv(datafile)
        data = data.drop(columns=['Unnamed: 0'])

    print(data.shape)
    print(data)
    col_headers = data.columns.values
    print(col_headers)
    principal_compo_analy = PCA()
    principal_compo_analy.fit_transform(data)
    Eigen_values2 = principal_compo_analy.explained_variance_
    Components = principal_compo_analy.components_
    Components_df2 = pd.DataFrame(Components)
    Eigen_Set2 = []
    print(Eigen_values2)

    prev = 0
    xx = []
    for i in range(len(Eigen_values2)):
        xx.append(Eigen_values2[i])
    totalSum = sum(xx)
    Eigen_valuesX = [x / totalSum for x in xx]
    for i in range(len(Eigen_valuesX)):
        Eigen_Set2.append((i + 1, Eigen_valuesX[i], prev + Eigen_valuesX[i]))
        prev += Eigen_valuesX[i]
    eigen_df = pd.DataFrame(Eigen_Set2)
    filename = 'static/data/PCAEigenValues_' + type + '.csv'
    eigen_df.columns = ['variable', 'Eigenvalues', 'cumulative']

    eigen_df.to_csv(filename)

    k = getNumComponents(type)
    print(k)
    sq_sum_1 = {}
    for i in range(len(Components[0])):
        sumX = 0
        for j in range(k):
            sumX += math.pow(Components[j][i], 2)
        s = col_headers[i]
        sq_sum_1[s] = sumX

    tup_list = []
    print(col_headers)
    for i in range(len(col_headers)):
        tup_list.append((col_headers[i], sq_sum_1[col_headers[i]]))
    tup_list = sorted(tup_list, key=lambda x: -1 * x[1])

    file_name = 'static/data/ScreeLoadings_' + type + '.csv'
    tupDF = pd.DataFrame(tup_list)
    tupDF.columns = ['variable', 'Sum of Squared Loadings']
    tupDF.to_csv(file_name)

    top3File = 'static/data/TopPCA_' + type + '.csv'
    top3feat = []
    for i in range(3):
        top3feat.append(tup_list[i][0])

    to_save = data[top3feat]
    to_save.to_csv('static/data/TopPCA_' + type + '.csv')

    pca = PCA(n_components=k)
    pca.fit(data)
    data = pca.transform(data)
    data_frame = pd.DataFrame(data)

    data_frame.columns = ['PC' + str(i) for i in range(k)]
    # filename = './data/PCA2_stratified.csv'
    # x = data_frame.values  # returns a numpy array
    # min_max_scaler = preprocessing.MinMaxScaler()
    # x_scaled = min_max_scaler.fit_transform(x)
    # data_frame = pd.DataFrame(x_scaled)

    data_frame.to_csv('static/data/PCA_' + type + '.csv')
    print(eigen_df['Eigenvalues'])
    xxx = []
    prev = 0
    cumu = []
    for val in eigen_df['Eigenvalues']:
        crt = float(abs(val))
        xxx.append(crt.real)
        cumu.append(prev + crt.real)
        prev += crt.real

    # MDS Euclidean
    euclidFilename = 'static/data/MDSEuclidean_' + type + '.csv'
    if not os.path.isfile(euclidFilename):
        print("MDS Euclid not present")
        mds = MDS(n_components=2, dissimilarity='euclidean')
        df_new = pd.DataFrame(mds.fit_transform(data_frame))
        df_new.columns = ['PC1', 'PC2']
        df_new.to_csv('static/data/MDSEuclidean_' + type + '.csv')

    # MDS Correlation
    corrFilename = 'static/data/MDSCorrelation_' + type + '.csv'
    if not os.path.isfile(corrFilename):
        print("MDS Corr not present")
        dis_mat = metrics.pairwise_distances(data_frame, metric='correlation')
        mds = MDS(n_components=2, dissimilarity='precomputed')
        df = pd.DataFrame(mds.fit_transform(dis_mat))
        df.columns = ['PC1', 'PC2']
        df.to_csv('static/data/MDSCorrelation_' + type + '.csv')
    print('Completed')
    return jsonify(data=str(xxx), k=str(k), data2=str(cumu))
    # cov_mat = np.cov(data.T)
    # eig_values, eig_vectors = np.linalg.eig(cov_mat)
    #
    # # Sorting Eigen Values
    # idx = eig_values.argsort()[::-1]
    # eig_values = eig_values[idx]
    # xxx = []
    # for val in eig_values:
    #     crt = float(abs(val))
    #
    #     xxx.append(crt.real)
    # eig_vectors = eig_vectors[:, idx]
    # return jsonify(data=str(xxx), k=4)


def getEigenValue(data):
    cov_mat = np.cov(data.T)
    eig_values, eig_vectors = np.linalg.eig(cov_mat)

    # Sorting Eigen Values
    idx = eig_values.argsort()[::-1]
    eig_values = eig_values[idx]
    xxx = []
    for val in eig_values:
        crt = float(abs(val))

        xxx.append(crt.real)
    eig_vectors = eig_vectors[:, idx]
    return str(xxx), 4


def generateCollectiveScreePlotData():
    typeNames = ['original', 'random', 'stratified']
    dic = {}
    dfList = [pd.read_csv('static/data/PCAEigenValues_' + type + '.csv') for type in typeNames]
    print(dfList)
    df_merged = reduce(lambda left, right: pd.merge(left, right, on=['variable'],
                                                    how='outer'), dfList)
    # x = pd.DataFrame.merge(dfList)
    print(df_merged)

    df_merged.to_csv('static/data/MergedPCA.csv')
    return jsonify("success",'True')
