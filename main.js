/*
Name :  Not decided
Creator / Author : Prakrisht Dahiya
*/

////////////////////////////////////////////////////////
///////////////  Pre-Calculation ///////////////////////

function graph_precalculate(graphData,layout){
    pre_calc={};

    //here we find the max value of the data and set the y axis domain to be the same as the max value of the data.
    for (dataindex = 0; dataindex < graphData.length; dataindex++) { 
        var data = graphData[dataindex];
        var data_y = data.y;
        if (dataindex == 0) {
            y_max = Math.max(...data_y);
            y_min = Math.min(...data_y);
        } else {
            y_max = Math.max(y_max, Math.max(...data_y));
            y_min = Math.min(y_min, Math.min(...data_y));
            maxdatasetval_index = dataindex;
        }
    }

    //calculating map ratio and height, width of graph
    h=layout.height;
    w=layout.width;
    pad=layout.padding;
    h_graph=h-pad*2;
    map_ratio = h_graph / (y_max - y_min);

    pre_calc.y_max = y_max;
    pre_calc.y_min = y_min;
    pre_calc.maxdatasetval_index = maxdatasetval_index;
    pre_calc.h_graph = h_graph;
    pre_calc.w_graph = w-pad*2;
    pre_calc.map_ratio = map_ratio;

}