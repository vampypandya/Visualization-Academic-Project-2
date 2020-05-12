from flask import jsonify
import pandas as pd
import random
from sklearn import cluster
from sklearn.cluster import KMeans
from sklearn.preprocessing import StandardScaler

def generate_originaldata():
    print("Idhar hun")
    d = 25
    filename = "ufcdata/data2.csv"

    df = pd.read_csv(filename)
    print("Padha Idhar hun")
    df = df.drop('CUST_ID', 1)
    df = df[2000:3000]
    print("Kaha 2 hai?")
    df = (df - df.mean()) / df.std()
    print("Kaha hai bhai?")
    df = df.fillna(df.mean())
    print("Kaha hai?")
    if df.to_csv(path_or_buf='static/data/generated_Originaldata.csv'):
        print("Successfull")
        return jsonify(success=True)
    return jsonify(success=False)


def generate_random():
    mult = 0.25
    filename = "ufcdata/data2.csv"
    df = pd.read_csv(filename)
    df = df.drop('CUST_ID', 1)
    df = (df - df.mean()) / df.std()
    df = df.fillna(df.mean())
    rows = random.sample(list(df.index), int(len(df) * mult))
    df = df.iloc[rows]
    if df.to_csv(path_or_buf='static/data/generated_Randomdata.csv'):
        return jsonify(success=True)
    return jsonify(success=False)


def generate_stratified(k_val):
    print("Aaya hun yaha")
    d = 25
    k_val = 7
    df = pd.read_csv('ufcdata/data2.csv')
    print(df.columns)
    df = df.drop('CUST_ID', 1)
    df = df[:2000]
    df = (df - df.mean()) / df.std()
    df = df.fillna(df.mean())
    # header_list = list(df.columns)
    # scaler = StandardScaler()
    # df = scaler.fit_transform(df)

    k = range(1, 30)
    km = cluster.KMeans(n_clusters=3)
    km.fit(df)
    df['kmean'] = km.labels_
    result_data_frame = pd.DataFrame([], columns=df.columns.values)
    for i in range(3):
        temp = df.loc[df['kmean'] == i]
        length = len(temp.index)
        random_index = random.sample(range(length), int(length * 0.8))
        random_data_frame = temp.iloc[random_index]
        result_data_frame = result_data_frame.append(random_data_frame)
    result_data_frame = result_data_frame.drop('kmean', 1)
    # clusters = [KMeans(n_clusters=c, init='k-means++').fit(features) for c in k]
    # centr_lst = [cc.cluster_centers_ for cc in clusters]
    #
    # kidx = k_val
    #
    # data_df = pd.DataFrame(features, columns=header_list)
    #
    # kmeans = KMeans(n_clusters=kidx)
    # kmeans.fit(features)
    # kmeans_centres = kmeans.cluster_centers_
    # labels = kmeans.labels_
    # data_df["labels_list"] = pd.Series(labels)
    #
    # samples_required = 1000
    # each_cluster_max = int(1000 / kidx)
    #
    # frequency_cnt = data_df['labels_list'].value_counts()
    #
    # for i in range(kidx):
    #     data_df[data_df['labels_list'] == i] = data_df[data_df['labels_list'] == i][
    #                                            :min(frequency_cnt[i], each_cluster_max)]
    # # data_df = data_df.dropna()
    # # df = data_df.select_dtypes(exclude=['O', 'bool'])
    # # df = df.select_dtypes('float')
    # # data = df.iloc[:, 0:d]
    # data_df = data_df[:2000]
    result_data_frame.to_csv(path_or_buf='static/data/generated_Stratdata.csv')
    return jsonify(success=True)
