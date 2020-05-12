function changeDiv(curr) {
    console.log(curr);
    if (curr == 'Original Data') {
        document.getElementById("first").innerHTML = document.getElementById("orig_1").innerHTML;
        document.getElementById("orig_1").style.display = "block";
        lastScreen = 'first';
    } else if (curr == 'Random Sampling Data') {
        // console.log(document.getElementById("orig_2").innerHTML);
        document.getElementById("first").innerHTML = document.getElementById("random_1").innerHTML;
        document.getElementById("random_1").style.display = "block";
        lastScreen = 'first';
    } else if (curr == 'Stratified Sampling Data') {
        // console.log(document.getElementById("orig_2").innerHTML);
        document.getElementById("first").innerHTML = document.getElementById("strat_1").innerHTML;
        document.getElementById("strat_1").style.display = "block";
        lastScreen = 'first';
    }
}

function display_randomData() {
    console.log("Display");
    $.ajax({
        url: "static/data/generated_Randomdata.csv",
        dataType: "text",
        success: function (data) {
            var employee_data = data.split(/\r?\n|\r/);
            var table_data = '<table class="table table-bordered table-striped">';
            for (var count = 0; count < employee_data.length; count++) {
                var cell_data = employee_data[count].split(",");
                table_data += '<tr>';
                for (var cell_count = 0; cell_count < cell_data.length; cell_count++) {
                    if (count === 0) {
                        table_data += '<th>' + cell_data[cell_count] + '</th>';
                    } else {
                        table_data += '<td>' + cell_data[cell_count] + '</td>';
                    }
                }
                table_data += '</tr>';
            }
            table_data += '</table>';
            console.log(table_data);
            $('#display_randomDataTable').html(table_data);
        }
    });
}

function display_stratData() {
    console.log("Display");
    $.ajax({
        url: "static/data/generated_Stratdata.csv",
        dataType: "text",
        success: function (data) {
            var employee_data = data.split(/\r?\n|\r/);
            var table_data = '<table class="table table-bordered table-striped">';
            for (var count = 0; count < employee_data.length; count++) {
                var cell_data = employee_data[count].split(",");
                table_data += '<tr>';
                for (var cell_count = 0; cell_count < cell_data.length; cell_count++) {
                    if (count === 0) {
                        table_data += '<th>' + cell_data[cell_count] + '</th>';
                    } else {
                        table_data += '<td>' + cell_data[cell_count] + '</td>';
                    }
                }
                table_data += '</tr>';
            }
            table_data += '</table>';
            console.log(table_data);
            $('#display_stratDataTable').html(table_data);
        }
    });
}


function display_originalData() {
    console.log("Display");
    $.ajax({
        url: "static/data/generated_Originaldata.csv",
        dataType: "text",
        success: function (data) {
            var employee_data = data.split(/\r?\n|\r/);
            var table_data = '<table class="table table-bordered table-striped">';
            for (var count = 0; count < employee_data.length; count++) {
                var cell_data = employee_data[count].split(",");
                table_data += '<tr>';
                for (var cell_count = 0; cell_count < cell_data.length; cell_count++) {
                    if (count === 0) {
                        table_data += '<th>' + cell_data[cell_count] + '</th>';
                    } else {
                        table_data += '<td>' + cell_data[cell_count] + '</td>';
                    }
                }
                table_data += '</tr>';
            }
            table_data += '</table>';
            console.log(table_data);
            $('#display_originalDataTable').html(table_data);
        }
    });
}

function goBack() {
    console.log(lastScreen);
    document.getElementById("first").innerHTML = document.getElementById(lastScreen).innerHTML;
}

function doesFileExist(urlToFile) {
    var xhr = new XMLHttpRequest();
    xhr.open('HEAD', urlToFile, false);
    xhr.send();

    if (xhr.status == "404") {
        return false;
    } else {
        return true;
    }
}

function orig_top3() {
    console.log("Display");
    $.ajax({
        url: "static/data/TopPCA_original.csv",
        dataType: "text",
        success: function (data) {
            var employee_data = data.split(/\r?\n|\r/);
            var table_data = '<table class="table table-bordered table-striped">';
            for (var count = 0; count < employee_data.length; count++) {
                var cell_data = employee_data[count].split(",");
                table_data += '<tr>';
                for (var cell_count = 0; cell_count < cell_data.length; cell_count++) {
                    if (count === 0) {
                        table_data += '<th>' + cell_data[cell_count] + '</th>';
                    } else {
                        table_data += '<td>' + cell_data[cell_count] + '</td>';
                    }
                }
                table_data += '</tr>';

            }
            table_data += '</table>';
            console.log(table_data);
            $('#top3DisplayOriginal').html(table_data);
        }
    });
}

function random_top3() {
    console.log("Display");
    $.ajax({
        url: "static/data/TopPCA_random.csv",
        dataType: "text",
        success: function (data) {
            var employee_data = data.split(/\r?\n|\r/);
            var table_data = '<table class="table table-bordered table-striped">';
            for (var count = 0; count < employee_data.length; count++) {
                var cell_data = employee_data[count].split(",");
                table_data += '<tr>';
                for (var cell_count = 0; cell_count < cell_data.length; cell_count++) {
                    if (count === 0) {
                        table_data += '<th>' + cell_data[cell_count] + '</th>';
                    } else {
                        table_data += '<td>' + cell_data[cell_count] + '</td>';
                    }
                }
                table_data += '</tr>';

            }
            table_data += '</table>';
            console.log(table_data);
            $('#top3DisplayRandom').html(table_data);
        }
    });
}

function strat_top3() {
    console.log("Display");
    $.ajax({
        url: "static/data/TopPCA_stratified.csv",
        dataType: "text",
        success: function (data) {
            var employee_data = data.split(/\r?\n|\r/);
            var table_data = '<table class="table table-bordered table-striped">';
            for (var count = 0; count < employee_data.length; count++) {
                var cell_data = employee_data[count].split(",");
                table_data += '<tr>';
                for (var cell_count = 0; cell_count < cell_data.length; cell_count++) {
                    if (count === 0) {
                        table_data += '<th>' + cell_data[cell_count] + '</th>';
                    } else {
                        table_data += '<td>' + cell_data[cell_count] + '</td>';
                    }
                }
                table_data += '</tr>';

            }
            table_data += '</table>';
            console.log(table_data);
            $('#top3DisplayStrat').html(table_data);
        }
    });
}


function orig_top2PCA() {
    filename = 'static/data/PCA_original.csv';
    division = 'internal_orig_top2PCA';
    drawScatterPlot(filename, division, true);
}

function random_top2PCA() {
    filename = 'static/data/PCA_random.csv';
    division = 'internal_random_top2PCA';
    drawScatterPlot(filename, division, true);
}

function strat_top2PCA() {
    filename = 'static/data/PCA_stratified.csv';
    division = 'internal_strat_top2PCA';
    drawScatterPlot(filename, division, true);
}

function orig_MDSEuclidian() {
    filename = 'static/data/MDSEuclidean_original.csv';
    division = 'internal_origMDSEuclidian';
    drawScatterPlot(filename, division, true);
}

function random_MDSEuclidian() {
    filename = 'static/data/MDSEuclidean_random.csv';
    division = 'internal_randomMDSEuclidian';
    drawScatterPlot(filename, division, true);
}

function strat_MDSEuclidian() {
    filename = 'static/data/MDSEuclidean_stratified.csv';
    division = 'internal_stratMDSEuclidian';
    drawScatterPlot(filename, division, true);
}

function orig_MDSCorrelation() {
    filename = 'static/data/MDSCorrelation_original.csv';
    division = 'internal_origMDSCorrelation';
    drawScatterPlot(filename, division, true);
}

function random_MDSCorrelation() {
    filename = 'static/data/MDSCorrelation_random.csv';
    division = 'internal_randomMDSCorrelation';
    drawScatterPlot(filename, division, true);
}

function strat_MDSCorrelation() {
    filename = 'static/data/MDSCorrelation_stratified.csv';
    division = 'internal_stratMDSCorrelation';
    drawScatterPlot(filename, division, true);
}

function orig_top3Scatter() {
    filename = 'static/data/PCA_original.csv';
    nameFileName = 'static/data/TopPCA_original.csv';
    division = 'internal_origTop3';
    matrixPlot(filename, nameFileName, division);
}

function random_top3Scatter() {
    filename = 'static/data/PCA_random.csv';
    nameFileName = 'static/data/TopPCA_random.csv';
    division = 'internal_randomTop3';
    matrixPlot(filename, nameFileName, division);
}

function strat_top3Scatter() {
    filename = 'static/data/PCA_stratified.csv';
    nameFileName = 'static/data/TopPCA_stratified.csv';
    division = 'internal_stratTop3';
    matrixPlot(filename, nameFileName, division);
}

$('.btn[data-toggle=modal]').on('click', function () {
    var $btn = $(this);
    var currentDialog = $btn.closest('.modal-dialog'),
        targetDialog = $($btn.attr('data-target'));
    ;
    if (!currentDialog.length)
        return;
    targetDialog.data('previous-dialog', currentDialog);
    currentDialog.addClass('aside');
    var stackedDialogCount = $('.modal.in .modal-dialog.aside').length;
    if (stackedDialogCount <= 5) {
        currentDialog.addClass('aside-' + stackedDialogCount);
    }
});

$('.modal').on('hide.bs.modal', function () {
    var $dialog = $(this);
    var previousDialog = $dialog.data('previous-dialog');
    if (previousDialog) {
        previousDialog.removeClass('aside');
        $dialog.data('previous-dialog', undefined);
    }
});


