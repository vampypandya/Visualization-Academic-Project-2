function original_generatedata() {
    // var result = doesFileExist("static/data/generated_Originaldata.csv");
    // console.log(result);
    // if (result == false) {
    $.ajax({
        type: "GET",
        url: '/generate_Originaldata',
        dataType: "json",
        contentType: 'application/json;charset=UTF-8',
        success: function (data) {
            console.log(data);
        }
    });

    document.getElementById("successful_dataOriginal").style.display = "block";
}

function random_generatedata() {
    // var result = doesFileExist("static/data/generated_Randomdata.csv");
    // document.getElementById("generate_random").disabled = true;
    // console.log(result);
    // if (result == false) {
    $.ajax({
        type: "GET",
        url: '/generate_Randomdata',
        dataType: "json",
        contentType: 'application/json;charset=UTF-8',
        success: function (data) {


            console.log(data);
        }
    });
    // }

    document.getElementById("successful_data").style.display = "block";
    document.getElementById("after_generateRandom").style.display = "block";
}

function strat_generatedata() {
    // var result = doesFileExist("static/data/generated_Stratdata.csv");
    // console.log(result);
    // console.log(result);
    // document.getElementById("afterFindingK").disabled = true;
    k = document.getElementById("generate_strat").value;
    // if (result == false) {
    $.ajax({
        type: "POST",
        url: '/generate_Stratdata',
        contentType: 'application/json;charset=UTF-8',
        data: JSON.stringify({'k': k.toString()}),
        success: function (data) {
            console.log(data);
        }
    });
    // }


    // document.getElementById("successful_data_strat").style.display = "block";
    // document.getElementById("after_generateStrat").style.display = "block";
    console.log('end Python')
}


function generate_originalScreePlot() {
    // document.getElementById("display_random").disabled = true;
    console.log('call Python')
    $.ajax({
        type: "GET",
        url: '/generate_OriginalScreePlotData',
        dataType: "json",
        contentType: 'application/json;charset=UTF-8',
        success: function (datas) {
            console.log(datas);
            var filename = "static/data/PCAEigenValues_original.csv"
            var data2 = JSON.parse(datas.data2);
            var k = datas.k;
            console.log(k);
            lastScreen = 'random1';
            var division = "screePlotDetails";
            generate_scree2Bar(filename, k, division);
        }
    });
    console.log('end Python')
}

function generate_randomScreePlot() {
    // document.getElementById("display_random").disabled = true;
    console.log('call Python')
    $.ajax({
        type: "GET",
        url: '/generate_ScreePlotData',
        dataType: "json",
        contentType: 'application/json;charset=UTF-8',
        success: function (datas) {
            console.log(datas);
            var filename = "static/data/PCAEigenValues_random.csv"
            var k = datas.k;
            console.log(k);
            lastScreen = 'random1';
            var division = "screePlotDetails";
            generate_scree2Bar(filename, k, division);
        }
    });
    console.log('end Python')
}

function generate_stratScreePlot() {
    // document.getElementById("display_random").disabled = true;
    console.log('call Python')
    $.ajax({
        type: "GET",
        url: '/generate_StratScreePlotData',
        dataType: "json",
        contentType: 'application/json;charset=UTF-8',
        success: function (datas) {
            // console.log(data);
            var data = "static/data/PCAEigenValues_stratified.csv"
            var k = datas.k;
            console.log(k);
            lastScreen = 'random1';
            var division = "screePlotDetails";
            generate_scree2Bar(data, k, division);
        }
    });
    console.log('end Python')
}

function strat_findK() {
    $.ajax({
        type: "GET",
        url: '/strat_findK',
        dataType: "json",
        contentType: 'application/json;charset=UTF-8',
        success: function (datas) {
            console.log(datas)
            var k = JSON.parse(datas.k);
            var data = JSON.parse(datas.data);
            var division = "screePlotDetails";
            console.log(data);
            console.log(k);
            filename = 'static/data/clusters.csv'
            generate_scree(filename, k, division);
            document.getElementById("generate_strat").value = k;
        }
    });
}

function generate_collectiveScreePlot() {
    console.log('call Python')
    $.ajax({
        type: "GET",
        url: '/generate_collectiveScreePlotData',
        dataType: "json",
        contentType: 'application/json;charset=UTF-8',
        success: function (datas) {
            // console.log(data);
            var data1 = 'static/data/PCAEigenValues_original.csv'
            var data2 = 'static/data/PCAEigenValues_random.csv'
            var data3 = 'static/data/PCAEigenValues_stratified.csv'
            var k1 = 6;
            var k2 = 6;
            var k3 = 6;
            var data = 'static/data/MergedPCA.csv'
            console.log(k1);
            // lastScreen = 'random1';
            generate_collectiveScree(data, k1, k2, k3);
        }
    });
    console.log('end Python')
}

