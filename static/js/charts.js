function generate_scree(file_name, k, division) {
    document.getElementById("random_1").style.display = "none";
    document.getElementById(division).innerHTML = "";
    // -------------
    console.log(division);
    var str1 = 'div#';
    var div = str1.concat(division);
    var margin = {top: 20, right: 20, bottom: 30, left: 60};
    var width = 1000 - margin.left - margin.right;
    var height = 450 - margin.top - margin.bottom;

    var chart_width = 800;
    var chart_height = height + margin.top + margin.bottom;

    // var data = [];
    // d3.csv(filename, function (datas) {
    //     // console.log(datas);
    //     for (var i = 0; i < datas.length; i++) {
    //         data.push(datas[i]['Eigen Values']);
    //         // console.log(datas[i]['Eigen Values']);
    //     }
    //     // console.log(data);
    // });

    // var x = d3.scale.linear().domain([1, data.length + 0.5]).range([0, chart_width - 120]);
    // var y = d3.scale.linear().domain([0, d3.max(data)]).range([height, 0]);
    //
    // console.log(x);
    // console.log(y);
    //
    // var xAxis = d3.svg.axis().scale(x).orient("bottom");
    // var yAxis = d3.svg.axis().scale(y).orient("left");

//     var x = d3.scale.linear().range([0, width]);
//     var y = d3.scale.linear().range([height, 0]);
//
//     var xAxis = d3.svg.axis().scale(x).orient("bottom").ticks(10);
//     var yAxis = d3.svg.axis().scale(y).orient("left").ticks(10);
//
//     var valueline = d3.svg.line()
//         .x(function (d) {
//             return x(d.size);
//         })
//         .y(function (d) {
//             return y(d.value);
//         });
//
//     console.log(file_name);
//
//     d3.csv(file_name, function (error, data) {
//
//         data.forEach(function (d) {
//             d.size = +d.size;
//             d.value = +d.value;
//         });
//
//         // Add an SVG element with the desired dimensions and margin.
//         var svg = d3.select(div).append("svg")
//             .attr("id", "chart")
//             .attr("width", width + margin.left + margin.right)
//             .attr("height", height + margin.top + margin.bottom + 10)
//             .append("g")
//             .attr("transform", "translate(-10,10)");
//
//         x.domain([0, d3.max(data, function (d, i) {
//             return d.size;
//         })]);
//         y.domain([d3.min(data, function (d) {
//             return d.value;
//         })]);
//
//
//         svg.append("path")
//             .attr("class", "line")
//             .style("stroke", "steelblue")
//             .attr("d", valueline(data));
//
//         svg.append("g")
//             .attr("class", "x axis")
//             .attr("transform", "translate(0," + height + ")")
//             .call(xAxis)
//             .append("text")
//             .attr("class", "label")
//             .attr("x", width)
//             .attr("y", -6)
//             .style("text-anchor", "end")
//             .text("Cluster Size");
//
//         svg.append("g")         // Add the Y Axis
//             .attr("class", "y axis")
//             .call(yAxis)
//             .append("text")
//             .attr("class", "label")
//             .attr("transform", "rotate(-90)")
//             .attr("x", 1)
//             .attr("y", 6)
//             .attr("dy", ".71em")
//             .style("text-anchor", "end")
//             .text("Squared Sum Error");
//
//         // draw dots
//         svg.selectAll(".dot")
//             .data(data)
//             .enter().append("circle")
//             .attr("class", "dot")
//             .attr("r", 3.5)
//             .attr("cx", function (d) {
//                 return x(d.size);
//             })
//             .attr("cy", function (d) {
//                 return y(d.value);
//             })
//             .style("fill", "black")//console.log(d.type*20); return color(d.type*20);})
//             .on("mouseover", function (d) {
//                 svg.append("text")
//                     .attr("id", "tooltip")
//                     .attr("x", x(d.size))
//                     .attr("y", y(d.value) - 10)
//                     .attr("text-anchor", "middle")
//                     .attr("font-size", "14px")
//                     .attr("fill", "black")
//                     .text(parseFloat(d.size).toFixed(2) + ',' + parseFloat(d.value).toFixed(2));
//             })
//             .on("mouseout", function (d) {
//                 d3.select("#tooltip").remove();
//             });
//
//     });
//
// }
//     var xBar = d3.scaleBand().range([0, chart_width - 120]).paddingInner(0.5).paddingOuter(0.25);
    var xLine = d3.scalePoint().range([0, chart_width - 120]).padding(0.5);
    var yLine = d3.scaleLinear().range([height, 0]);


    // var xScale = d3.scaleBand().range([0, width]).padding(0.6),
    //     yScale = d3.scaleLinear().range([height, 0]);


    // var valueline = d3.line()
    //     .x(function (d, i) {
    //         if (i == k - 1) {
    //             markerX = xLine(i);
    //             markerY = yLine(d)
    //             console.log(markerX);
    //             console.log(markerY);
    //         }
    //         console.log(xLine(i));
    //         return xLine(i);
    //     })
    //     .y(function (d) {
    //         console.log('line', d);
    //         return yLine(d);
    //     })

    var valueline = d3.line()
        .x(function (d) {
            return xLine(d.size);
        })
        .y(function (d) {
            return yLine(d.value);
        });

    // Add an SVG element with the desired dimensions and margin.
    var graph = d3.select(div).append("svg")
        .attr("id", "chart")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom + 10)
        .append("g")
        .attr("transform", "translate(-10,10)");

    // xBar.domain([1, data.length + 0.5]);
    // xLine.domain([1, data.length + 0.5]);
    // yBar.domain([0, d3.max(data) * 2]);
    // yLine.domain([0, d3.max(data) * 2]);
    var div = d3.select("div#screePlotDetails")
        .append("div")  // declare the tooltip div
        .attr("class", "tooltip-donut")              // apply the 'tooltip' class
        .style("opacity", 0);
    d3.csv(file_name, function (error, data) {

        data.forEach(function (d) {
            d.size = +d.size;
            d.value = +d.value;
        });


        xLine.domain(data.map(function (d) {
            return d.size;
        }));
        yLine.domain([0, d3.max(data, function (d) {
            return d.value;
        })]).nice();


        graph.append("path")
            .data([data])
            .attr("class", "line")
            .style("stroke", "steelblue")
            .attr("transform", "translate(110,0)")
            .attr("d", valueline);


        // var rect = graph.selectAll("rect")
        //     .data(data)
        //
        // rect.enter().append("rect")
        //     .merge(rect)
        //     .attr("class", "bar")
        //     .style("stroke", "none")
        //     .style("fill", function (d) {
        //         if (d.variable == k) {
        //             return "#FFD700"
        //         }
        //         return "#ccc";
        //     })
        //     .attr("transform", "translate(110,0)")
        //     .attr("x", function (d, i) {
        //         return xBar(d.variable);
        //     })
        //     .attr("width", function (d) {
        //         return xBar.bandwidth();
        //     })
        //     .attr("y", function (d) {
        //         return yBar(d.Eigenvalues);
        //     })
        //     .attr("height", function (d) {
        //         return height - yBar(d.Eigenvalues);
        //     })
        //     .attr('pointer-events', 'all')
        //     .on("mouseover", function (d) {
        //         div.transition()
        //             .duration(500)
        //             .style("opacity", 0);
        //         div.transition()
        //             .duration(200)
        //             .style("opacity", .9);
        //         div.html("Eigen Value:" +
        //             d.Eigenvalues +
        //             "<br/>" + "Dimensionality Count: " + d.variable)
        //             .style("left", (d3.event.pageX) + "px")
        //             .style("top", (d3.event.pageY - 28) + "px")
        //         var xPos = +d3.select(this).attr("x")
        //         var wid = +d3.select(this).attr("width")
        //         var hei = +d3.select(this).attr("height");
        //         d3.select(this).style("fill", "lightblue");
        //         d3.select(this).attr("x", xPos - 10).attr("width", wid + 20).attr("height", hei + 20);
        //     })
        //     .on("mouseout", function (d) {
        //
        //         div.transition()
        //             .duration(200)
        //             .style("opacity", 0);
        //         d3.select(this).attr("x", d => xBar(d.variable))
        //             .attr("width", xBar.bandwidth())
        //             .attr("height", d => height - yBar(d.Eigenvalues));
        //         d3.select(this).style("fill", function (d) {
        //             if (d.variable == k) {
        //                 return "#FFD700"
        //             }
        //             return "#ccc";
        //         });
        //     })
        // ;


        var circular = graph.selectAll("circle.point1")
            .data(data)

        circular.enter().append("circle")
            .merge(circular)
            .attr("class", "point1")
            .style("stroke", "steelblue")
            .style("fill", function (d) {
                if (d.size == k) {
                    return "#FFD700"
                }
                return "#ccc";
            })
            .attr("transform", "translate(110,0)")
            .attr("cx", function (d, i) {
                return xLine(d.size);
            })
            .attr("cy", function (d) {
                return yLine(d.value);
            })
            .attr("r", function (d) {
                if (d.size == k) {
                    return 7;
                }
                return 5;
            })
            .on("mouseover", function (d) {
                div.transition()
                    .duration(500)
                    .style("opacity", 0);
                div.transition()
                    .duration(200)
                    .style("opacity", .9);
                div.html("Distance Score: " +
                    d.value +
                    "<br/>" + "Size: " + d.size)
                    .style("left", (d3.event.pageX) + "px")
                    .style("top", (d3.event.pageY - 28) + "px")

                d3.select(this).style("fill", "red");
                d3.select(this).attr("r", 8);
            })
            .on("mouseout", function (d) {

                div.transition()
                    .duration(200)
                    .style("opacity", 0);
                d3.select(this).style("fill", function (d) {
                    if (d.size == k) {
                        return "#FFD700"
                    }
                    return "#ccc";
                });
                d3.select(this).attr("r", function (d) {
                    if (d.size == k) {
                        return 7;
                    }
                    return 5;
                })
            });

        // create yAxis
        graph.append("g")
            .attr("class", "x_axis")
            .attr("transform", "translate(110," + height + ")")
            .call(d3.axisBottom(xLine));

        // Add the y-axis to the left
        graph.append("g")
            .attr("class", "y_axis")
            .attr("transform", "translate(100,0)")
            .call(d3.axisLeft(yLine));

        // graph.append("path")
        //     .attr("d", line(data))
        //     .attr("transform", "translate(145,0)")
        //     .attr("fill", "none")
        //     .attr("stroke", color(1))
        //     .attr("stroke-width", "3px")

        // graph.selectAll(".bar")
        //     .data(data)
        //     .enter().append("rect")
        //     .attr("class", "bar")
        //     .attr("fill", function (d, i) {
        //         return color(i);
        //     })
        //     .attr("x", function (d, i) {
        //         return x(i);
        //     })
        //     .attr("y", function (d) {
        //         return y(d);
        //     })
        //     .attr("width", x.rangeBand())
        //     .attr("height", function (d) {
        //         return height - y(d);
        //     });

        // graph.append("circle")
        //     .attr("cx", markerX)
        //     .attr("cy", markerY)
        //     .attr("r", 4)
        //     .attr("transform", "translate(145,0)")
        //     .style("fill", "red");

        graph.append("text")
            .attr("class", "axis_label")
            .attr("text-anchor", "middle")
            .attr("transform", "translate(" + (50) + "," + (height / 2) + ")rotate(-90)")
            .text("Eigen Values");

        graph.append("text")
            .attr("class", "axis_label")
            .attr("text-anchor", "middle")
            .attr("transform", "translate(" + (chart_width / 2) + "," + (chart_height) + ")")
            .text("K");

        // graph.append("text")
        //     .attr("x", (width / 3))
        //     .attr("y", 0 + (margin.top / 2))
        //     .attr("text-anchor", "middle")
        //     .style("font-size", "16px")
        //     .style("text-decoration", "underline")
        //     .style("font-weight", "bold")
        //     .text("chart_title");
        // ------------
        // document.getElementById("first").innerHTML = document.getElementById("scree_plot").innerHTML;
        // document.getElementById("scree_plot").style.display = "block";
        console.log('Completed Chart');
    });
}

function generate_collectiveScree(filename, k1, k2, k3) {
    document.getElementById("random_1").style.display = "none";
    // -------------
    var margin = {top: 20, right: 20, bottom: 30, left: 60};
    var width = 1000 - margin.left - margin.right;
    var height = 450 - margin.top - margin.bottom;

    var chart_width = 800;
    var chart_height = height + margin.top + margin.bottom;

    // var x1 = d3.scale.linear().domain([1, data1.length + 0.5]).range([0, chart_width - 120]);
    // var x2 = d3.scale.linear().domain([1, data2.length + 0.5]).range([0, chart_width - 120]);
    // var x3 = d3.scale.linear().domain([1, data3.length + 0.5]).range([0, chart_width - 120]);
    // var y = d3.scale.linear().domain([0, d3.max(data1)]).range([height, 0]);

    var xLine = d3.scalePoint().range([0, chart_width - 120]).padding(0.5);

    var yLine = d3.scaleLinear().range([height, 0]);


    var color = d3.scale.category10();

    var valueline1 = d3.line()
        .x(function (d) {
            return xLine(d.variable);
        })
        .y(function (d) {
            return yLine(d.Eigenvalues_x);
        });

    var valueline2 = d3.line()
        .x(function (d) {
            return xLine(d.variable);
        })
        .y(function (d) {
            return yLine(d.Eigenvalues_y);
        });

    var valueline3 = d3.line()
        .x(function (d) {
            if (d.variable == k1) {
                mx = k1;
                my = d.Eigenvalues;
            }
            return xLine(d.variable);
        })
        .y(function (d) {
            return yLine(d.Eigenvalues);
        });


    // Add an SVG element with the desired dimensions and margin.
    var graph = d3.select("div#collectiveScreePlotDetails").append("svg")
        .attr("id", "chart")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom + 10)
        .append("g")
        .attr("transform", "translate(-10,10)");

    var div = d3.select("div#collectiveScreePlotDetails")
        .append("div") // declare the tooltip div
        .attr("class", "tooltip-donut") // apply the 'tooltip' class
        .style("opacity", 0);

    d3.csv(filename, function (error, data) {
        data.forEach(function (d) {
            d.Eigenvalues_x = +d.Eigenvalues_x;
            d.Eigenvalues_y = +d.Eigenvalues_y;
            d.Eigenvalues = +d.Eigenvalues;
            d.variable = +d.variable;

        });
        xLine.domain(data.map(function (d) {
            return d.variable;
        }));
        yLine.domain([0, 0.4]);


        graph.append("path")
            .data([data])
            .attr("class", "line")
            .style("stroke", color(1))
            .attr("transform", "translate(110,0)")
            .attr("d", valueline1)
            .attr("fill", "red");

        graph.append("path")
            .data([data])
            .attr("class", "line")
            .style("stroke", color(2))
            .attr("transform", "translate(110,0)")
            .attr("d", valueline2)
            .attr("fill", "blue");

        graph.append("path")
            .data([data])
            .attr("class", "line")
            .style("stroke", color(3))
            .attr("transform", "translate(110,0)")
            .attr("d", valueline3)
            .attr("fill", "green");


        // create yAxis
        graph.append("g")
            .attr("class", "x_axis")
            .attr("transform", "translate(110," + height + ")")
            .call(d3.axisBottom(xLine));

        graph.append("g")
            .attr("class", "y_axis")
            .attr("transform", "translate(100,0)")
            .call(d3.axisLeft(yLine));
        console.log(mx, my)
        graph.selectAll(".circle")
            .data(data)
            .enter().append("circle")
            .attr("class", "circle")
            .attr("cx", mx)
            .attr("cy", my)
            .attr("r", 9)
            .style("fill", "red")
            .attr("transform", "translate(325,345)");


        // // create yAxis
        // graph.append("g")
        //     .attr("class", "x_axis")
        //     .attr("transform", "translate(110," + height + ")")
        //     .call(xAxis);
        //
        // // Add the y-axis to the left
        // graph.append("g")
        //     .attr("class", "y_axis")
        //     .attr("transform", "translate(100,0)")
        //     .call(yAxis);
        //
        // graph.append("path")
        //     .attr("d", line1(data1))
        //     .attr("transform", "translate(145,0)")
        //     .attr("fill", "none")
        //     .attr("stroke", color(1))
        //     .attr("stroke-width", "3px")
        //
        // graph.append("path")
        //     .attr("d", line2(data2))
        //     .attr("transform", "translate(145,0)")
        //     .attr("fill", "none")
        //     .attr("stroke", color(2))
        //     .attr("stroke-width", "3px")
        //
        // graph.append("path")
        //     .attr("d", line3(data3))
        //     .attr("transform", "translate(145,0)")
        //     .attr("fill", "none")
        //     .attr("stroke", color(3))
        //     .attr("stroke-width", "3px")
        //
        // graph.append("circle")
        //     .attr("cx", markerX1)
        //     .attr("cy", markerY1)
        //     .attr("r", 6)
        //     .attr("transform", "translate(145,0)")
        //     .style("fill", color(1));
        //
        // graph.append("circle")
        //     .attr("cx", markerX2)
        //     .attr("cy", markerY2)
        //     .attr("r", 6)
        //     .attr("transform", "translate(145,0)")
        //     .style("fill", color(2));
        //
        // graph.append("circle")
        //     .attr("cx", markerX3)
        //     .attr("cy", markerY3)
        //     .attr("r", 6)
        //     .attr("transform", "translate(145,0)")
        //     .style("fill", color(3));
        //
        graph.append("text")
            .attr("class", "axis_label")
            .attr("text-anchor", "middle")
            .attr("transform", "translate(" + (50) + "," + (height / 2) + ")rotate(-90)")
            .text("Eigen Values");

        graph.append("text")
            .attr("class", "axis_label")
            .attr("text-anchor", "middle")
            .attr("transform", "translate(" + (chart_width / 2) + "," + (chart_height) + ")")
            .text("K");
        //
        graph.append("text")
            .attr("x", (width / 3))
            .attr("y", 0 + (margin.top / 2))
            .attr("text-anchor", "middle")
            .style("font-size", "16px")
            .style("font-weight", "bold")
            .text("Original Data Set")
            .style("fill", color(1));

        graph.append("text")
            .attr("x", (width / 3))
            .attr("y", 0 + (margin.top / 2) + 20)
            .attr("text-anchor", "middle")
            .style("font-size", "16px")
            .style("font-weight", "bold")
            .text("Random Data Set")
            .style("fill", color(2));

        graph.append("text")
            .attr("x", (width / 3))
            .attr("y", 0 + (margin.top / 2) + 40)
            .attr("text-anchor", "middle")
            .style("font-size", "16px")
            .style("font-weight", "bold")
            .text("Stratified Data Set")
            .style("fill", color(3));


    });
}


function drawScatterPlot(file_name, division, double) {

    // document.getElementById("pca3").innerHTML = '';
    // document.getElementById("graph").innerHTML = '';

    var str1 = 'div#';
    var div = str1.concat(division);
    console.log(file_name);
    var margin = {top: 20, right: 20, bottom: 30, left: 40},
        width = window.innerWidth - 600 - margin.left - margin.right,
        height = window.innerHeight - 250 - margin.top - margin.bottom;
    var width = 1000 - margin.left - margin.right;
    var height = 450 - margin.top - margin.bottom;

    var chart_width = 800;
    var chart_height = height + margin.top + margin.bottom;
    // add the graph canvas to the body of the webpage
    var svg = d3.select(div).append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    // add the tooltip area to the webpage
    var tooltip = d3.select(div).append("div")
        .attr("class", "tooltip")
        .style("opacity", 0);


    var color = d3.scale.category10();

    // var xBar = d3.scaleBand().range([0, chart_width - 120]).paddingInner(0.5).paddingOuter(0.25);
    // var xLine = d3.scalePoint().range([0, chart_width - 120]).padding(0.5);
    // var yBar = d3.scaleLinear().range([height, 0]);
    var yLine = d3.scaleLinear().range([height, 0]);

    // var xScale = d3.scale.linear().range([0, width]);
    var xScale = d3.scaleLinear().range([0, chart_width - 60]);
    // var yScale = d3.scale.linear().range([height, 0]);
    var yScale = d3.scaleLinear().range([height, 0]);
    // var xAxis = d3.svg.axis().scale(xScale).orient("bottom")
    // var yAxis = d3.svg.axis().scale(yScale).orient("left").ticks(10, ",f");

    // load data
    console.log(file_name);
    var div = d3.select(div)
        .append("div")  // declare the tooltip div
        .attr("class", "tooltip-donut")              // apply the 'tooltip' class
        .style("opacity", 0);
    d3.csv(file_name, function (error, data) {
        console.log(data);
        // // change string (from CSV) into number format
        // // console.log(data);
        // arr = d3.keys(data[0]);
        // // console.log(arr);
        // k1 = arr[1];
        // k2 = arr[2];
        // console.log(file_name);
        // // console.log(k1);
        // // var cValue
        // // if (double) {
        // //     cValue = function (d) {
        // //         return d.clusteridx;
        // //     }
        // // } else {
        // //     cValue = function (d) {
        // //         return d.clusterid;
        // //     }
        // // }

        data.forEach(function (d) {
            // console.log(d);
            d.P1 = +d.PC1;
            d.P2 = +d.PC2;
            console.log(d.P1);
            console.log(d.P2);
        });
        console.log(data.map(function (d) {
            return d.P1;
        }));
        // xScale.domain(data.map(function (d) {
        //     // console.log(d.P1);
        //     return d.P1;
        // }));
        xScale.domain([d3.min(data, function (d) {
            return d.P1;
        }), d3.max(data, function (d) {
            return d.P2;
        })]).nice();
        yScale.domain([d3.min(data, function (d) {
            return d.P2;
        }), d3.max(data, function (d) {
            return d.P2;
        })]).nice();
        // xScale.domain([0, d3.max(data, function (d) {
        //     return d.P1;
        // }) + 1]);
        // yScale.domain([d3.min(data, function (d) {
        //     return d.P2;
        // }) - 1, d3.max(data, function (d) {
        //     return d.P2;
        // }) + 1]);

        // x-axis
        svg.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(xScale))


        // y-axis
        svg.append("g")
            .attr("class", "y axis")
            // .attr("transform", "translate(100,0)")
            .call(d3.axisLeft(yScale))


        // draw dots
        svg.selectAll("circle.point1")
            .data(data)
            .enter().append("circle")
            .attr("class", "dot")
            .attr("r", 3)
            .attr("cx", function (d) {
                return xScale(d.P1);
            })
            .style("fill", function (d, i) {
                return color(i);
            })
            .attr("cy", function (d) {
                return yScale(d.P2);
            })
            // .style("fill", function (d, i) {
            //     return color(i)
            // })
            .on("mouseover", function (d) {
                div.transition()
                    .duration(500)
                    .style("opacity", 0);
                div.transition()
                    .duration(200)
                    .style("opacity", .9);
                div.html("Point: " +
                    parseFloat(d.P1).toFixed(2) + ',' + parseFloat(d.P2).toFixed(2))
                    .style("left", (d3.event.pageX) + "px")
                    .style("top", (d3.event.pageY - 28) + "px")

                d3.select(this).style("fill", "red");
                d3.select(this).attr("r", 8);
            })
            .on("mouseout", function (d) {

                div.transition()
                    .duration(200)
                    .style("opacity", 0);
                d3.select(this).style("fill", function (d) {

                    return "#ccc";
                });
                d3.select(this).attr("r", function (d) {

                    return 3;
                })
            });

        svg.append("text")
            .attr("class", "axis_label")
            .attr("text-anchor", "middle")
            .attr("transform", "translate(" + (-20) + "," + (height / 2) + ")rotate(-90)")
            .text("P2");

        svg.append("text")
            .attr("class", "axis_label")
            .attr("text-anchor", "middle")
            .attr("transform", "translate(" + (chart_width / 2) + "," + (chart_height - 20) + ")")
            .text("P1");


    });
}

function matrixPlot(file_name, nameFileName, division) {
    // document.getElementById("pca3").innerHTML = '';
    // document.getElementById("graph").innerHTML = '';

    var width = 860,
        size = 300,
        padding = 40;

    function make_x_gridlines() {
        return d3.axisBottom(x)
            .ticks(5)
    }

// gridlines in y axis function
    function make_y_gridlines() {
        return d3.axisLeft(y)
            .ticks(5)
    }

    var color = d3.scale.category10();

    var str1 = 'div#';
    var div = str1.concat(division);

    var x = d3.scale.linear()
        .range([padding / 2, size - padding / 2]);

    var y = d3.scale.linear()
        .range([size - padding / 2, padding / 2]);

    var xScale = d3.scaleLinear().range([padding / 2, size - padding / 2]);
    var yScale = d3.scaleLinear().range([size - padding / 2, padding / 2]);


    // var xAxis = d3.svg.axis()
    //     .scale(x)
    //     .orient("bottom")
    //     .ticks(6);
    //
    // var yAxis = d3.svg.axis()
    //     .scale(y)
    //     .orient("left")
    //     .ticks(6);

    n = 3;
    d3.csv(nameFileName, function (error, data) {
        namesList = d3.keys(data[0]).filter(function (d) {
            return d !== "";
        });
        console.log(namesList);
    });
    // console.log(divi);


    // var div = d3.select(div)
    //     .append("div") // declare the tooltip div
    //     .attr("class", "tooltip-donut") // apply the 'tooltip' class
    //     .style("opacity", 0);
    d3.csv(file_name, function (error, data) {
        var domain = {},
            traits = d3.keys(data[0]).filter(function (d) {
                return d !== "";
            }),

            traits = ["PC0", "PC1", "PC2"];
        console.log(traits);

        traits.forEach(function (trait) {
            domain[trait] = d3.extent(data, function (d) {
                return Number(d[trait]);
            });
        });

        // xAxis.tickSize(size * n);
        // yAxis.tickSize(-size * n);
        var svg = d3.select(div).append("svg")
            .attr("width", size * n + padding + 100)
            .attr("height", size * n + padding + 30)
            .append("g")
            .attr("transform", "translate(" + padding + "," + padding / 2 + ")");

        ;

        svg.selectAll(".x.axis")
            .data(traits)
            .enter().append("g")
            .attr("class", "x axis")
            .attr("transform", function (d, i) {
                return "translate(" + (n - i - 1) * size + ",0)";
            })
            .each(function (d) {
                x.domain(domain[d]);
                d3.select(this).call(d3.axisBottom(xScale));
            })


        svg.selectAll(".y.axis")
            .data(traits)
            .enter().append("g")
            .attr("class", "y axis")
            .attr("transform", function (d, i) {
                return "translate(0," + i * size + ")";
            })
            .each(function (d) {
                y.domain(domain[d]);
                d3.select(this).call(d3.axisLeft(yScale));
            });


        var cell = svg.selectAll(".cell")
            .data(cross(traits, traits))
            .enter().append("g")
            .attr("class", "cell")
            .attr("transform", function (d) {
                return "translate(" + (n - d.i - 1) * size + "," + d.j * size + ")";
            })
            .style("fill", "black")
            .each(plot);

        // Titles for the diagonal.
        cell.filter(function (d) {
            return d.i === d.j;
        }).append("text")
            .attr("x", padding)
            .attr("y", padding)
            .attr("dy", ".71em")
            .style('fill','red')
            .attr("font-weight",10)
            .text(function (d, i) {
                console.log(d.i + "," + d.j + "," + d.x);
                return namesList[i];
            });

        function plot(p) {
            var cell = d3.select(this);

            x.domain(domain[p.x]);
            y.domain(domain[p.y]);

            cell.append("rect")
                .attr("class", "frame")
                .attr("x", padding / 2)
                .attr("y", padding / 2)
                .attr("width", size - padding)
                .attr("height", size - padding)
                .style("fill", "black")

            cell.selectAll("circle")
                .data(data)
                .enter().append("circle")
                .attr("cx", function (d) {
                    console.log(p.x);
                    return x(d[p.x]);
                })
                .attr("cy", function (d) {
                    return y(d[p.y]);
                })
                .attr("r", 3)
                .style("fill", function (d, i) {
                    return color(i);
                })
                .on("mouseover", function (d) {
                    // div.transition()
                    //     .duration(500)
                    //     .style("opacity", 0);
                    // div.transition()
                    //     .duration(200)
                    //     .style("opacity", .9);
                    // div.html("Point: " +
                    //     parseFloat(d.P1).toFixed(2) + ',' + parseFloat(d.P2).toFixed(2))
                    //     .style("left", (d3.event.pageX) + "px")
                    //     .style("top", (d3.event.pageY - 28) + "px")

                    d3.select(this).style("fill", "red");
                    d3.select(this).attr("r", 8);
                })
                .on("mouseout", function (d) {

                    // div.transition()
                    //     .duration(200)
                    //     .style("opacity", 0);
                    d3.select(this).style("fill", function (d, i) {

                        return color(i);
                    });
                    d3.select(this).attr("r", function (d) {

                        return 3;
                    })
                });
            ;
        }
    });

    function cross(a, b) {
        var c = [], n = a.length, m = b.length, i, j;
        for (i = -1; ++i < n;) for (j = -1; ++j < m;) c.push({x: a[i], i: i, y: b[j], j: j});
        return c;
    }

}


function generate_scree2Bar(filename, k, division) {
    document.getElementById("random_1").style.display = "none";
    document.getElementById(division).innerHTML = "";
    // -------------
    console.log(division);
    console.log(k);
    var str1 = 'div#';
    var div = str1.concat(division);
    var margin = {top: 20, right: 20, bottom: 30, left: 60};
    var width = 1000 - margin.left - margin.right;
    var height = 450 - margin.top - margin.bottom;

    var chart_width = 800;
    var chart_height = height + margin.top + margin.bottom;

    // var data = [];
    // d3.csv(filename, function (datas) {
    //     // console.log(datas);
    //     for (var i = 0; i < datas.length; i++) {
    //         data.push(datas[i]['Eigen Values']);
    //         // console.log(datas[i]['Eigen Values']);
    //     }
    //     // console.log(data);
    // });

    // var x = d3.scale.linear().domain([1, data.length + 0.5]).range([0, chart_width - 120]);
    // var x = d3.scale.ordinal().rangeRoundBands([0, width], .05);
    //     // // var y = d3.scale.linear().domain([0, d3.max(data)]).range([height, 0]);
    //     // var y =d3.scaleLinear().range([height, 0]);
    //     //
    //     // var xAxis = d3.svg.axis().scale(x).orient("bottom");
    //     // var yAxis = d3.svg.axis().scale(y).orient("left");

    var xBar = d3.scaleBand().range([0, chart_width - 120]).paddingInner(0.5).paddingOuter(0.25);
    var xLine = d3.scalePoint().range([0, chart_width - 120]).padding(0.5);
    var yBar = d3.scaleLinear().range([height, 0]);
    var yLine = d3.scaleLinear().range([height, 0]);


    // var xScale = d3.scaleBand().range([0, width]).padding(0.6),
    //     yScale = d3.scaleLinear().range([height, 0]);

    var markerX
    var markerY
    var color = d3.scale.category10();

    // var valueline = d3.line()
    //     .x(function (d, i) {
    //         if (i == k - 1) {
    //             markerX = xLine(i);
    //             markerY = yLine(d)
    //             console.log(markerX);
    //             console.log(markerY);
    //         }
    //         console.log(xLine(i));
    //         return xLine(i);
    //     })
    //     .y(function (d) {
    //         console.log('line', d);
    //         return yLine(d);
    //     })

    var valueline = d3.line()
        .x(function (d) {
            return xLine(d.variable);
        })
        .y(function (d) {
            return yLine(d.cumulative);
        });

    // Add an SVG element with the desired dimensions and margin.
    var graph = d3.select(div).append("svg")
        .attr("id", "chart")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom + 10)
        .append("g")
        .attr("transform", "translate(-10,10)");

    // xBar.domain([1, data.length + 0.5]);
    // xLine.domain([1, data.length + 0.5]);
    // yBar.domain([0, d3.max(data) * 2]);
    // yLine.domain([0, d3.max(data) * 2]);
    var div = d3.select("div#screePlotDetails")
        .append("div")  // declare the tooltip div
        .attr("class", "tooltip-donut")              // apply the 'tooltip' class
        .style("opacity", 0);
    d3.csv(filename, function (error, data) {

        data.forEach(function (d) {
            d.Eigenvalues = +d.Eigenvalues;
            d.cumulative = +d.cumulative;
        });

        xBar.domain(data.map(function (d) {
            return d.variable;
        }));
        xLine.domain(data.map(function (d) {
            return d.variable;
        }));
        yBar.domain([0, 1]);
        yLine.domain([0, 1]);


        graph.append("path")
            .data([data])
            .attr("class", "line")
            .style("stroke", "steelblue")
            .attr("transform", "translate(110,0)")
            .attr("d", valueline);


        var rect = graph.selectAll("rect")
            .data(data)

        rect.enter().append("rect")
            .merge(rect)
            .attr("class", "bar")
            .style("stroke", "none")
            .style("fill", function (d) {
                if (d.variable == k) {
                    return "#FFD700"
                }
                return "#ccc";
            })
            .attr("transform", "translate(110,0)")
            .attr("x", function (d, i) {
                return xBar(d.variable);
            })
            .attr("width", function (d) {
                return xBar.bandwidth();
            })
            .attr("y", function (d) {
                return yBar(d.Eigenvalues);
            })
            .attr("height", function (d) {
                return height - yBar(d.Eigenvalues);
            })
            .attr('pointer-events', 'all')
            .on("mouseover", function (d) {
                div.transition()
                    .duration(500)
                    .style("opacity", 0);
                div.transition()
                    .duration(200)
                    .style("opacity", .9);
                div.html("Eigen Value:" +
                    d.Eigenvalues +
                    "<br/>" + "Dimensionality Count: " + d.variable)
                    .style("left", (d3.event.pageX) + "px")
                    .style("top", (d3.event.pageY - 28) + "px")
                var xPos = +d3.select(this).attr("x")
                var wid = +d3.select(this).attr("width")
                var hei = +d3.select(this).attr("height");
                d3.select(this).style("fill", "lightblue");
                d3.select(this).attr("x", xPos - 10).attr("width", wid + 20).attr("height", hei + 20);
            })
            .on("mouseout", function (d) {

                div.transition()
                    .duration(200)
                    .style("opacity", 0);
                d3.select(this).attr("x", d => xBar(d.variable))
                    .attr("width", xBar.bandwidth())
                    .attr("height", d => height - yBar(d.Eigenvalues));
                d3.select(this).style("fill", function (d) {
                    if (d.variable == k) {
                        return "#FFD700"
                    }
                    return "#ccc";
                });
            })
        ;


        var circular = graph.selectAll("circle.point1")
            .data(data)

        circular.enter().append("circle")
            .merge(circular)
            .attr("class", "point1")
            .style("stroke", "steelblue")
            .style("fill", function (d) {
                if (d.variable == k) {
                    return "#FFD700"
                }
                return "#ccc";
            })
            .attr("transform", "translate(110,0)")
            .attr("cx", function (d, i) {
                return xLine(d.variable);
            })
            .attr("cy", function (d) {
                return yLine(d.cumulative);
            })
            .attr("r", function (d) {
                return 5;
            })
            .on("mouseover", function (d) {
                div.transition()
                    .duration(500)
                    .style("opacity", 0);
                div.transition()
                    .duration(200)
                    .style("opacity", .9);
                div.html("Cumulative Score" +
                    d.cumulative +
                    "<br/>" + "Dimensionality Count: " + d.variable)
                    .style("left", (d3.event.pageX) + "px")
                    .style("top", (d3.event.pageY - 28) + "px")

                d3.select(this).style("fill", "red");
                d3.select(this).attr("r", 8);
            })
            .on("mouseout", function (d) {

                div.transition()
                    .duration(200)
                    .style("opacity", 0);
                d3.select(this).style("fill", function (d) {
                    if (d.variable == k) {
                        return "#FFD700"
                    }
                    return "#ccc";
                });
                d3.select(this).attr("r", 5);
            });

        // create yAxis
        graph.append("g")
            .attr("class", "x_axis")
            .attr("transform", "translate(110," + height + ")")
            .call(d3.axisBottom(xLine));

        // Add the y-axis to the left
        graph.append("g")
            .attr("class", "y_axis")
            .attr("transform", "translate(100,0)")
            .call(d3.axisLeft(yBar));

        // graph.append("path")
        //     .attr("d", line(data))
        //     .attr("transform", "translate(145,0)")
        //     .attr("fill", "none")
        //     .attr("stroke", color(1))
        //     .attr("stroke-width", "3px")

        // graph.selectAll(".bar")
        //     .data(data)
        //     .enter().append("rect")
        //     .attr("class", "bar")
        //     .attr("fill", function (d, i) {
        //         return color(i);
        //     })
        //     .attr("x", function (d, i) {
        //         return x(i);
        //     })
        //     .attr("y", function (d) {
        //         return y(d);
        //     })
        //     .attr("width", x.rangeBand())
        //     .attr("height", function (d) {
        //         return height - y(d);
        //     });

        // graph.append("circle")
        //     .attr("cx", markerX)
        //     .attr("cy", markerY)
        //     .attr("r", 4)
        //     .attr("transform", "translate(145,0)")
        //     .style("fill", "red");

        graph.append("text")
            .attr("class", "axis_label")
            .attr("text-anchor", "middle")
            .attr("transform", "translate(" + (50) + "," + (height / 2) + ")rotate(-90)")
            .text("Eigen Values");

        graph.append("text")
            .attr("class", "axis_label")
            .attr("text-anchor", "middle")
            .attr("transform", "translate(" + (chart_width / 2) + "," + (chart_height) + ")")
            .text("K");

        // graph.append("text")
        //     .attr("x", (width / 3))
        //     .attr("y", 0 + (margin.top / 2))
        //     .attr("text-anchor", "middle")
        //     .style("font-size", "16px")
        //     .style("text-decoration", "underline")
        //     .style("font-weight", "bold")
        //     .text("chart_title");
        // ------------
        // document.getElementById("first").innerHTML = document.getElementById("scree_plot").innerHTML;
        // document.getElementById("scree_plot").style.display = "block";
        console.log('Completed Chart');
    });
}