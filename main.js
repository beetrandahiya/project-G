/*
Name :  project-G
Creator / Author : Prakrisht Dahiya
*/

////////////////////////////////////////////////////////////////////////////////
///////////////////// Constants and Pre-Defined vaules /////////////////////////

// colors and colorpalletes

const applecolors=["rgb(255,59,48)",
"rgb(255,149,0)",
"rgb(255,204,0)",
"rgb(52,199,89)",
"rgb(0,199,190)",
"rgb(48,176,199)",
"rgb(50,173,230)",
"rgb(0,122,255)",
"rgb(88,86,214)",
"rgb(175,82,222)",
"rgb(255,45,85)",];  //apple UI colors

const blue_teal_palette=[
    "#142459",
    "#176BA0",
    "#19AADE",
    "#1AC9E6",
    "#1BD4D4",
    "#1DE4BD",
    "#6DF0D2",
    "#C7F9EE"
];

const shades_of_sun=[
    "#820401",
    "#C02323",
    "#DE542C",
    "#EF7E32",
    "#EE9A3A",
    "#EABD3B",
    "#E7E34E",
    "#F7F4BF"
];

const purples_and_pinks = [
    "#29066B",
    "#7D3AC1",
    "#AF4BCE",
    "#DB4CB2",
    "#EB548C",
    "#EA7369",
    "#F0A58F",
    "#FCEAE6"
];




////////////////////////////////////////////////////////
///////////////  Pre-Calculation ///////////////////////

function graph_precalculate(graphData,layout,DOM_container){
    pre_calc={};

    //here we find the max value of the data and set the y axis domain to be the same as the max value of the data.
    for (dataindex = 0; dataindex < graphData.length; dataindex++) { 
        var data = graphData[dataindex];
        var data_y = data.y;
        
        if (dataindex == 0) {
            y_max = Math.max(...data_y);
            y_min = Math.min(...data_y);
            mostdataset_index = dataindex;
            mostdataset_length = data_y.length;
            maxdatasetval_index = 0;
        } else {
            y_max = Math.max(y_max, Math.max(...data_y));
            y_min = Math.min(y_min, Math.min(...data_y));
            maxdatasetval_index = dataindex;
            if(data_y.length>graphData[mostdataset_index].y.length){
                mostdataset_index = dataindex;
                mostdataset_length = data_y.length;
            }
        }

    }
    if (layout.yaxes.domain != "auto") {
        y_min = layout.yaxes.domain[0]; //here we set the domain of y axis
        y_max = layout.yaxes.domain[1];
    }

    //calculating labels for y axes
    yaxes_labels=[];
    for(i=0;i<layout.yaxes.no_parts;i++){
        yaxes_labels.push(y_min+(y_max-y_min)*(i)/(layout.yaxes.no_parts-1));
    }

    //calculating map ratio and height, width of graph
    if(String(layout.height).includes("%")){
        h=parseInt(layout.height.replace("%",""));
        h=h/100*DOM_container.parentElement.clientHeight;
    }
    else{
        h=layout.height;
    }
    if(String(layout.width).includes("%")){
        w=parseInt(layout.width.replace("%",""));
        w=w/100*DOM_container.parentElement.clientWidth;
    }
    else{
        w=layout.width;
    }
    pad=layout.padding;
    h_graph=h-pad*2;
    map_ratio = h_graph / (y_max - y_min);

    //zero val coord
    zeroval_coord=pad+h_graph-(0-y_min)*map_ratio;


    pre_calc.h=h;
    pre_calc.w=w;
    pre_calc.pad=pad;
    pre_calc.y_max = y_max;
    pre_calc.y_min = y_min;
    pre_calc.maxdatasetval_index = maxdatasetval_index;
    pre_calc.mostdataset_index = mostdataset_index;
    pre_calc.mostdataset_length = mostdataset_length;
    pre_calc.h_graph = h_graph;
    pre_calc.w_graph = w-pad*2;
    pre_calc.map_ratio = map_ratio;
    pre_calc.yaxes_labels = yaxes_labels;
    pre_calc.zeroval_coord = zeroval_coord;

    return pre_calc;

}

function makeGrid(DOM_container,pre_calc,layout){
    //making the main svg
    svg=document.createElementNS("http://www.w3.org/2000/svg","svg");
    svg.setAttribute("width",pre_calc.w);
    svg.setAttribute("height",pre_calc.h);
    svg.setAttribute("viewBox","0 0 "+pre_calc.w+" "+pre_calc.h);
    svg.setAttribute("style",layout.styles)
    DOM_container.appendChild(svg);

    //making the grid
    dy=pre_calc.h_graph/(layout.yaxes.no_parts-1);
    dx=pre_calc.w_graph/(pre_calc.mostdataset_length-1);
    
    y_axes_stroke_width=layout.yaxes.stroke_width;
    y_axes_stroke_color=layout.yaxes.stroke;
    y_axes_stroke_dasharray=layout.yaxes.style;
    y_axes_domain=layout.yaxes.domain;

    x_axes_stroke_width=layout.xaxes.stroke_width;
    x_axes_stroke_color=layout.xaxes.stroke;
    x_axes_stroke_dasharray=layout.xaxes.style;


    if (y_axes_domain != "auto") {
        y_min = y_axes_domain[0]; //here we set the domain of y axis
        y_max = y_axes_domain[1];
    }
    
    //y axes
    yaxes_grp=document.createElementNS("http://www.w3.org/2000/svg","g");
    if(layout.yaxes.visible){
    for(i=0;i<layout.yaxes.no_parts;i++){
        line=document.createElementNS("http://www.w3.org/2000/svg","line");
        line.setAttribute("x1",pad);
        line.setAttribute("y1",dy*i+pad);
        line.setAttribute("x2",pad+pre_calc.w_graph);
        line.setAttribute("y2",dy*i+pad);
        line.setAttribute("stroke",y_axes_stroke_color);
        line.setAttribute("stroke-width",y_axes_stroke_width);
        switch(y_axes_stroke_dasharray){
            case "solid":
                line.setAttribute("stroke-dasharray","none");
                break;
            case "dashed":
                line.setAttribute("stroke-dasharray","3,5");
                break;
            case "dotted":
                line.setAttribute("stroke-dasharray","1,3");
                break;
        }

        yaxes_grp.appendChild(line);
    }
    


    
    }
    //x axes
    xaxes_grp=document.createElementNS("http://www.w3.org/2000/svg","g");
    if(layout.xaxes.visible){
    for(i=0;i<  pre_calc.mostdataset_length;i++){
        line=document.createElementNS("http://www.w3.org/2000/svg","line");
        line.setAttribute("x1",pad+dx*i);
        line.setAttribute("y1",pad);
        line.setAttribute("x2",dx*i+pad);
        line.setAttribute("y2",pad+pre_calc.h_graph);
        line.setAttribute("stroke",x_axes_stroke_color);
        line.setAttribute("stroke-width",x_axes_stroke_width);
        switch(x_axes_stroke_dasharray){
            case "solid":
                line.setAttribute("stroke-dasharray","none");
                break;
            case "dashed":
                line.setAttribute("stroke-dasharray","4,5");
                break;
            case "dotted":
                line.setAttribute("stroke-dasharray","1,3");
                break;
        }     

        xaxes_grp.appendChild(line);
    }}

    //adding the grid to the main svg
    svg.appendChild(yaxes_grp);
    svg.appendChild(xaxes_grp);


}

function makeGridBar(DOM_container,pre_calc,layout){
    //making the main svg
    svg=document.createElementNS("http://www.w3.org/2000/svg","svg");
    svg.setAttribute("width",pre_calc.w);
    svg.setAttribute("height",pre_calc.h);
    svg.setAttribute("viewBox","0 0 "+pre_calc.w+" "+pre_calc.h);
    svg.setAttribute("style",layout.styles)
    DOM_container.appendChild(svg);

    //making the grid
    dy=pre_calc.h_graph/(layout.yaxes.no_parts-1);
    dx=pre_calc.w_graph/(pre_calc.mostdataset_length);
    
    y_axes_stroke_width=layout.yaxes.stroke_width;
    y_axes_stroke_color=layout.yaxes.stroke;
    y_axes_stroke_dasharray=layout.yaxes.style;
    y_axes_domain=layout.yaxes.domain;

    x_axes_stroke_width=layout.xaxes.stroke_width;
    x_axes_stroke_color=layout.xaxes.stroke;
    x_axes_stroke_dasharray=layout.xaxes.style;


    if (y_axes_domain != "auto") {
        y_min = y_axes_domain[0]; //here we set the domain of y axis
        y_max = y_axes_domain[1];
    }
    
    //y axes
    yaxes_grp=document.createElementNS("http://www.w3.org/2000/svg","g");
    if(layout.yaxes.visible){
    for(i=0;i<layout.yaxes.no_parts;i++){
        line=document.createElementNS("http://www.w3.org/2000/svg","line");
        line.setAttribute("x1",pad);
        line.setAttribute("y1",dy*i+pad);
        line.setAttribute("x2",pad+pre_calc.w_graph);
        line.setAttribute("y2",dy*i+pad);
        line.setAttribute("stroke",y_axes_stroke_color);
        line.setAttribute("stroke-width",y_axes_stroke_width);
        switch(y_axes_stroke_dasharray){
            case "solid":
                line.setAttribute("stroke-dasharray","none");
                break;
            case "dashed":
                line.setAttribute("stroke-dasharray","3,5");
                break;
            case "dotted":
                line.setAttribute("stroke-dasharray","1,3");
                break;
        }

        yaxes_grp.appendChild(line);
    }}

    //x axes
    xaxes_grp=document.createElementNS("http://www.w3.org/2000/svg","g");
    if(layout.xaxes.visible){     
        for(i=0;i<=pre_calc.mostdataset_length;i++){
            line=document.createElementNS("http://www.w3.org/2000/svg","line");
            line.setAttribute("x1",pad+dx*i);
            line.setAttribute("y1",pad);
            line.setAttribute("x2",dx*i+pad);
            line.setAttribute("y2",pad+pre_calc.h_graph);
            line.setAttribute("stroke",x_axes_stroke_color);
            line.setAttribute("stroke-width",x_axes_stroke_width);
            switch(x_axes_stroke_dasharray){
                case "solid":
                    line.setAttribute("stroke-dasharray","none");
                    break;
                case "dashed":
                    line.setAttribute("stroke-dasharray","4,5");
                    break;
                case "dotted":
                    line.setAttribute("stroke-dasharray","1,3");
                    break;
            }     

            xaxes_grp.appendChild(line);
        }
    }

    //adding the grid to the main svg
    svg.appendChild(yaxes_grp);
    svg.appendChild(xaxes_grp);


}

function makeGridBarH(DOM_container,pre_calc,layout){

    //making the main svg
    //making the main svg
    svg=document.createElementNS("http://www.w3.org/2000/svg","svg");
    svg.setAttribute("width",pre_calc.w);
    svg.setAttribute("height",pre_calc.h);
    svg.setAttribute("viewBox","0 0 "+pre_calc.w+" "+pre_calc.h);
    svg.setAttribute("style",layout.styles)
    DOM_container.appendChild(svg);

    //making the grid
    dy=pre_calc.w_graph/(layout.yaxes.no_parts-1);
    dx=pre_calc.h_graph/(pre_calc.mostdataset_length);

    y_axes_stroke_width=layout.yaxes.stroke_width;
    y_axes_stroke_color=layout.yaxes.stroke;
    y_axes_stroke_dasharray=layout.yaxes.style;
    y_axes_domain=layout.yaxes.domain;

    x_axes_stroke_width=layout.xaxes.stroke_width;
    x_axes_stroke_color=layout.xaxes.stroke;
    x_axes_stroke_dasharray=layout.xaxes.style;

    
    if (y_axes_domain != "auto") {
        y_min = y_axes_domain[0]; //here we set the domain of y axis
        y_max = y_axes_domain[1];
    }

    //y axes
    yaxes_grp=document.createElementNS("http://www.w3.org/2000/svg","g");
    if(layout.yaxes.visible){
    for(i=0;i<layout.yaxes.no_parts;i++){
        line=document.createElementNS("http://www.w3.org/2000/svg","line");
        line.setAttribute("x1",pad+dy*i);
        line.setAttribute("y1",pad);
        line.setAttribute("x2",pad+dy*i);
        line.setAttribute("y2",pad+pre_calc.h_graph);
        line.setAttribute("stroke",y_axes_stroke_color);
        line.setAttribute("stroke-width",y_axes_stroke_width);
        switch(y_axes_stroke_dasharray){
            case "solid":
                line.setAttribute("stroke-dasharray","none");
                break;
            case "dashed":
                line.setAttribute("stroke-dasharray","3,5");
                break;
            case "dotted":
                line.setAttribute("stroke-dasharray","1,3");
                break;
        }

        yaxes_grp.appendChild(line);
    }}

    
    //x axes
    xaxes_grp=document.createElementNS("http://www.w3.org/2000/svg","g");
    if(layout.xaxes.visible){     
        for(i=0;i<=pre_calc.mostdataset_length;i++){
            line=document.createElementNS("http://www.w3.org/2000/svg","line");
            line.setAttribute("x1",pad);
            line.setAttribute("y1",pad+dx*i);
            line.setAttribute("x2",pad+pre_calc.w_graph);
            line.setAttribute("y2",pad+dx*i);
            line.setAttribute("stroke",x_axes_stroke_color);
            line.setAttribute("stroke-width",x_axes_stroke_width);
            switch(x_axes_stroke_dasharray){
                case "solid":
                    line.setAttribute("stroke-dasharray","none");
                    break;
                case "dashed":
                    line.setAttribute("stroke-dasharray","4,5");
                    break;
                case "dotted":
                    line.setAttribute("stroke-dasharray","1,3");
                    break;
            }     

            xaxes_grp.appendChild(line);
        }
    }

    //adding the grid to the main svg
    svg.appendChild(yaxes_grp);
    svg.appendChild(xaxes_grp);
 



    

}

function makeTitle(DOM_container,layout){
    //making the title
    title=document.createElementNS("http://www.w3.org/2000/svg","text");
    title.setAttribute("x",pre_calc.w/2);
    title.setAttribute("y",layout.padding/2);
    title.setAttribute("text-anchor","middle");
    title.setAttribute("font-size",layout.title.font_size);
    title.setAttribute("font-family",layout.title.font_family);
    title.setAttribute("font-weight",layout.title.font_weight);
    title.setAttribute("fill",layout.title.color);
    title.setAttribute("anti-alias","true");
    title.innerHTML=layout.title.text;
    svg.appendChild(title);

    //making x and y axes title
    
    if(layout.xaxes.title.visible!=false){
    x_title=document.createElementNS("http://www.w3.org/2000/svg","text");
    x_title.setAttribute("x",pre_calc.w/2);
    x_title.setAttribute("y",layout.height-layout.padding/2);
    x_title.setAttribute("text-anchor","middle");
    x_title.setAttribute("font-size",layout.xaxes.title.font_size);
    x_title.setAttribute("font-family",layout.xaxes.title.font_family);
    x_title.setAttribute("font-weight",layout.xaxes.title.font_weight);
    x_title.setAttribute("fill",layout.xaxes.title.color);
    x_title.setAttribute("anti-alias","true");
    x_title.innerHTML=layout.xaxes.title.text;
    svg.appendChild(x_title);
    }

    if(layout.yaxes.title.visible!=false){
    y_title=document.createElementNS("http://www.w3.org/2000/svg","text");
    y_title.setAttribute("x",layout.padding/2);
    y_title.setAttribute("y",layout.height/2);
    y_title.setAttribute("text-anchor","middle");
    y_title.setAttribute("font-size",layout.yaxes.title.font_size);
    y_title.setAttribute("font-family",layout.yaxes.title.font_family);
    y_title.setAttribute("font-weight",layout.yaxes.title.font_weight);
    y_title.setAttribute("fill",layout.yaxes.title.color);
    y_title.setAttribute("anti-alias","true");
    y_title.setAttribute("transform","rotate(-90,"+layout.padding/2+","+layout.height/2+")");
    y_title.innerHTML=layout.yaxes.title.text;
    svg.appendChild(y_title);
    }

}

function makeLabels(DOM_container,pre_calc,layout){
    //making the labels
    ylabel_grp=document.createElementNS("http://www.w3.org/2000/svg","g");
    xlabel_grp=document.createElementNS("http://www.w3.org/2000/svg","g");
    if(layout.ylabels.visible){
    for(i=0;i<layout.yaxes.no_parts;i++){
        var ylbl= document.createElementNS("http://www.w3.org/2000/svg","text");
        ylbl.setAttribute("x",pad-5);
        ylbl.setAttribute("y",pre_calc.h-(dy*i)-pad);
        ylbl.setAttribute("text-anchor","end");
        ylbl.setAttribute("font-size",layout.ylabels.font_size);
        ylbl.setAttribute("font-family",layout.ylabels.font_family);
        ylbl.setAttribute("font-weight",layout.ylabels.font_weight);
        ylbl.setAttribute("fill",layout.ylabels.color);
        ylbl.setAttribute("alignment-baseline","middle");
        ylbl.setAttribute("anti-alias","true");
        ylbl.innerHTML=pre_calc.yaxes_labels[i];
        ylabel_grp.appendChild(ylbl);
    }}

    if(layout.xlabels.visible){
    for(i=0;i<pre_calc.mostdataset_length;i++){
        var xlbl= document.createElementNS("http://www.w3.org/2000/svg","text");
        xlbl.setAttribute("x",dx*i+pad);
        xlbl.setAttribute("y",pre_calc.h-pad+layout.xlabels.font_size);
        xlbl.setAttribute("text-anchor","middle");
        xlbl.setAttribute("font-size",layout.xlabels.font_size);
        xlbl.setAttribute("font-family",layout.xlabels.font_family);
        xlbl.setAttribute("font-weight",layout.xlabels.font_weight);
        xlbl.setAttribute("fill",layout.xlabels.color);
        xlbl.setAttribute("anti-alias","true");
        xlbl.innerHTML=layout.xlabels.labels[i];
        xlabel_grp.appendChild(xlbl);
    }}

    svg.appendChild(ylabel_grp);
    svg.appendChild(xlabel_grp);
}

function makeLabelsBar(DOM_container,pre_calc,layout){
    //making the labels
    ylabel_grp=document.createElementNS("http://www.w3.org/2000/svg","g");
    xlabel_grp=document.createElementNS("http://www.w3.org/2000/svg","g");
    for(i=0;i<layout.yaxes.no_parts;i++){
        var ylbl= document.createElementNS("http://www.w3.org/2000/svg","text");
        ylbl.setAttribute("x",pad-5);
        ylbl.setAttribute("y",pre_calc.h-(dy*i)-pad);
        ylbl.setAttribute("text-anchor","end");
        ylbl.setAttribute("font-size",layout.ylabels.font_size);
        ylbl.setAttribute("font-family",layout.ylabels.font_family);
        ylbl.setAttribute("font-weight",layout.ylabels.font_weight);
        ylbl.setAttribute("fill",layout.ylabels.color);
        ylbl.setAttribute("alignment-baseline","middle");
        ylbl.setAttribute("anti-alias","true");
        ylbl.innerHTML=pre_calc.yaxes_labels[i];
        ylabel_grp.appendChild(ylbl);
    }

    for(i=0;i<pre_calc.mostdataset_length;i++){
        var xlbl= document.createElementNS("http://www.w3.org/2000/svg","text");
        xlbl.setAttribute("x",dx*i+pad+dx/2);
        xlbl.setAttribute("y",pre_calc.h-pad+layout.xlabels.font_size);
        xlbl.setAttribute("text-anchor","middle");
        xlbl.setAttribute("font-size",layout.xlabels.font_size);
        xlbl.setAttribute("font-family",layout.xlabels.font_family);
        xlbl.setAttribute("font-weight",layout.xlabels.font_weight);
        xlbl.setAttribute("fill",layout.xlabels.color);
        xlbl.setAttribute("anti-alias","true");
        xlbl.innerHTML=layout.xlabels.labels[i];
        xlabel_grp.appendChild(xlbl);
    }

    svg.appendChild(ylabel_grp);
    svg.appendChild(xlabel_grp);
}

function makeLabelsBarH(DOM_container,pre_calc,layout){
    //making the labels
    ylabel_grp=document.createElementNS("http://www.w3.org/2000/svg","g");
    xlabel_grp=document.createElementNS("http://www.w3.org/2000/svg","g");
    for(i=0;i<layout.yaxes.no_parts;i++){
        var ylbl= document.createElementNS("http://www.w3.org/2000/svg","text");
        ylbl.setAttribute("x",dy*i+pad);
        ylbl.setAttribute("y",pre_calc.h-pad+layout.xlabels.font_size);
        ylbl.setAttribute("text-anchor","middle");
        ylbl.setAttribute("font-size",layout.ylabels.font_size);
        ylbl.setAttribute("font-family",layout.ylabels.font_family);
        ylbl.setAttribute("font-weight",layout.ylabels.font_weight);
        ylbl.setAttribute("fill",layout.ylabels.color);
        ylbl.setAttribute("alignment-baseline","middle");
        ylbl.setAttribute("anti-alias","true");
        ylbl.innerHTML=pre_calc.yaxes_labels[i];
        ylabel_grp.appendChild(ylbl);
    }

    for(i=0;i<pre_calc.mostdataset_length;i++){
        var xlbl= document.createElementNS("http://www.w3.org/2000/svg","text");
        xlbl.setAttribute("x",pad-5);
        xlbl.setAttribute("y",pre_calc.h-(dx*i)-pad-dx/2);
        xlbl.setAttribute("text-anchor","end");
        xlbl.setAttribute("font-size",layout.xlabels.font_size);
        xlbl.setAttribute("font-family",layout.xlabels.font_family);
        xlbl.setAttribute("font-weight",layout.xlabels.font_weight);
        xlbl.setAttribute("fill",layout.xlabels.color);
        xlbl.setAttribute("anti-alias","true");
        xlbl.setAttribute("alignment-baseline","middle")
        xlbl.innerHTML=layout.xlabels.labels[i];
        xlabel_grp.appendChild(xlbl);
    }

    svg.appendChild(ylabel_grp);
    svg.appendChild(xlabel_grp);
}

function makeLegend(DOM_container,pre_calc,graphData,layout){
    //making the legend
    if(layout.legend.visible){
    legend_grp=document.createElementNS("http://www.w3.org/2000/svg","g");
    for(dataindex=0;dataindex<graphData.length;dataindex++){
        var legend_line=document.createElementNS("http://www.w3.org/2000/svg","line");
        var legend_marker=document.createElementNS("http://www.w3.org/2000/svg","circle");
        var legend_text=document.createElementNS("http://www.w3.org/2000/svg","text");


        switch(layout.legend.position){
            case "top-right":
                legend_line.setAttribute("x1",pre_calc.w-layout.padding+layout.legend.padding);
                legend_line.setAttribute("y1",3*layout.padding/2+dataindex*(layout.legend.font_size+layout.legend.padding));
                legend_line.setAttribute("x2",pre_calc.w-layout.padding+layout.legend.padding+2*layout.legend.font_size);
                legend_line.setAttribute("y2",3*layout.padding/2+dataindex*(layout.legend.font_size+layout.legend.padding));
                
                legend_marker.setAttribute("cx",pre_calc.w-layout.padding+layout.legend.padding+layout.legend.font_size);
                legend_marker.setAttribute("cy",3*layout.padding/2+dataindex*(layout.legend.font_size+layout.legend.padding));

                legend_text.setAttribute("x",pre_calc.w-layout.padding+2*layout.legend.padding+2*layout.legend.font_size);
                legend_text.setAttribute("y",3*layout.padding/2+dataindex*(layout.legend.font_size+layout.legend.padding));
                break;
            case "top-left":
                legend_line.setAttribute("x1",layout.legend.padding);
                legend_line.setAttribute("y1",3*layout.padding/2+dataindex*(layout.legend.font_size+layout.legend.padding));
                legend_line.setAttribute("x2",layout.legend.padding+2*layout.legend.font_size);
                legend_line.setAttribute("y2",3*layout.padding/2+dataindex*(layout.legend.font_size+layout.legend.padding));

                legend_marker.setAttribute("cx",layout.legend.padding+layout.legend.font_size);
                legend_marker.setAttribute("cy",3*layout.padding/2+dataindex*(layout.legend.font_size+layout.legend.padding));

                legend_text.setAttribute("x",layout.legend.padding+2*layout.legend.font_size+layout.legend.padding);
                legend_text.setAttribute("y",3*layout.padding/2+dataindex*(layout.legend.font_size+layout.legend.padding));
                break;
            case "bottom-right":
                legend_line.setAttribute("x1",pre_calc.w-layout.padding+layout.legend.padding);
                legend_line.setAttribute("y1",layout.height-layout.padding-3*layout.legend.font_size+dataindex*(layout.legend.font_size+layout.legend.padding));
                legend_line.setAttribute("x2",pre_calc.w-layout.padding+layout.legend.padding+2*layout.legend.font_size);
                legend_line.setAttribute("y2",layout.height-layout.padding-3*layout.legend.font_size+dataindex*(layout.legend.font_size+layout.legend.padding));

                legend_marker.setAttribute("cx",pre_calc.w-layout.padding+layout.legend.padding+layout.legend.font_size);
                legend_marker.setAttribute("cy",layout.height-layout.padding-3*layout.legend.font_size+dataindex*(layout.legend.font_size+layout.legend.padding));

                legend_text.setAttribute("x",pre_calc.w-layout.padding+2*layout.legend.padding+2*layout.legend.font_size);
                legend_text.setAttribute("y",layout.height-layout.padding-3*layout.legend.font_size+dataindex*(layout.legend.font_size+layout.legend.padding));
                break;
            case "bottom-left":
                legend_line.setAttribute("x1",layout.legend.padding);
                legend_line.setAttribute("y1",layout.height-layout.padding-3*layout.legend.font_size+dataindex*(layout.legend.font_size+layout.legend.padding));
                legend_line.setAttribute("x2",layout.legend.padding+2*layout.legend.font_size);
                legend_line.setAttribute("y2",layout.height-layout.padding-3*layout.legend.font_size+dataindex*(layout.legend.font_size+layout.legend.padding));
                
                legend_marker.setAttribute("cx",layout.legend.padding+layout.legend.font_size);
                legend_marker.setAttribute("cy",layout.height-layout.padding-3*layout.legend.font_size+dataindex*(layout.legend.font_size+layout.legend.padding));

                legend_text.setAttribute("x",layout.legend.padding+2*layout.legend.font_size+layout.legend.padding);
                legend_text.setAttribute("y",layout.height-layout.padding-3*layout.legend.font_size+dataindex*(layout.legend.font_size+layout.legend.padding));
                break;
        }
        
        legend_line.setAttribute("stroke",graphData[dataindex].line.color);
        legend_line.setAttribute("stroke-width",graphData[dataindex].line.width||2);
        legend_line.setAttribute("stroke-linecap",graphData[dataindex].line.stroke_linecap||"round");
        legend_line.setAttribute("stroke-linejoin",graphData[dataindex].line.stroke_linejoin||"round");
        // applying line style to legend
        switch(graphData[dataindex].line.style){
            case "solid":
                legend_line.setAttribute("stroke-dasharray","none");
                break;
            case "dashed":
                legend_line.setAttribute("stroke-dasharray","3,5");
                break;
            case "dotted":
                legend_line.setAttribute("stroke-dasharray","0.2,5");
                break;
            case "dash-dot":
                legend_line.setAttribute("stroke-dasharray","3,5,0.2,5");
                break;
            case "spaced-dot":
                legend_line.setAttribute("stroke-dasharray","0.2,8");
                break;
            case "spaced-dash":
                legend_line.setAttribute("stroke-dasharray","4,8");
                break;
            case "long-dash":
                legend_line.setAttribute("stroke-dasharray","8,8");
                break;
        }
        
        legend_marker.setAttribute("r",graphData[dataindex].marker.size);
        legend_marker.setAttribute("fill",graphData[dataindex].marker.fill);
        legend_marker.setAttribute("stroke",graphData[dataindex].marker.color);
        

        legend_text.setAttribute("text-anchor","start");
        legend_text.setAttribute("font-size",layout.legend.font_size);
        legend_text.setAttribute("font-family",layout.legend.font_family);
        legend_text.setAttribute("font-weight",layout.legend.font_weight);
        legend_text.setAttribute("fill",layout.legend.color);
        legend_text.setAttribute("alignment-baseline","middle");
        legend_text.setAttribute("anti-alias","true");
        legend_text.innerHTML=graphData[dataindex].name;

      

    if(graphData[dataindex].line.visible!==false){
        legend_grp.appendChild(legend_line);
        legend_grp.appendChild(legend_text);

    }
    if(graphData[dataindex].marker.visible!==false){
        legend_grp.appendChild(legend_marker);
    }
    }
    svg.appendChild(legend_grp);
}
}

////////////////////////////////////////////////////////
//////////////// Making Gradients //////////////////////

//make sure to make gradients after the graph function.

function makeGradient(DOM_identifier,style,colors,id,spread_method){

    var svgelem = DOM_identifier.getElementsByTagName("svg")[0];
    grad_spread_method=spread_method||"pad";
    if(style=="horizontal"){
        var defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
        var grad=document.createElementNS('http://www.w3.org/2000/svg','linearGradient');
        grad.setAttribute('id',id);
        grad.setAttribute('x1','0%');
        grad.setAttribute('y1','0%');
        grad.setAttribute('x2','100%');
        grad.setAttribute('y2','0%');
        grad.setAttribute('spreadMethod',grad_spread_method);
        grad.setAttribute('gradientUnits','userSpaceOnUse');
        for(i=0;i<colors.length;i++){
            stop=document.createElementNS('http://www.w3.org/2000/svg','stop');
            if(typeof(colors[i])=="string"){
                stop.setAttribute('offset',(i*100/colors.length)+'%');
                stop.setAttribute('stop-color',colors[i]);
                grad.appendChild(stop);}
            else if(typeof(colors[i])=="object"){
                stop.setAttribute('offset',colors[i][0]);
                stop.setAttribute('stop-color',colors[i][1]);
                grad.appendChild(stop);
                
            }
        }
        defs.appendChild(grad);
        svgelem.appendChild(defs);
        

    }
    else if(style=="vertical"){
        var defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
        var grad=document.createElementNS('http://www.w3.org/2000/svg','linearGradient');
        grad.setAttribute('id',id);
        grad.setAttribute('x1','0%');
        grad.setAttribute('y1','0%');
        grad.setAttribute('x2','0%');
        grad.setAttribute('y2','100%');
        grad.setAttribute('spreadMethod',grad_spread_method);
        grad.setAttribute('gradientUnits','userSpaceOnUse');
        for(i=0;i<colors.length;i++){
            stop=document.createElementNS('http://www.w3.org/2000/svg','stop');
            if(typeof(colors[i])=="string"){
                stop.setAttribute('offset',(i*100/colors.length)+'%');
                stop.setAttribute('stop-color',colors[i]);
                grad.appendChild(stop);}
                else if(typeof(colors[i])=="object"){
                    stop.setAttribute('offset',colors[i][0]);
                    stop.setAttribute('stop-color',colors[i][1]);
                    grad.appendChild(stop);
                   
                }
        }
        defs.appendChild(grad);
        svgelem.appendChild(defs);
    }
    else if(style=="radial"){
        var defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
        var grad=document.createElementNS('http://www.w3.org/2000/svg','radialGradient');
        grad.setAttribute('id',id);
        grad.setAttribute('cx','50%');
        grad.setAttribute('cy','50%');
        grad.setAttribute('r','50%');
        grad.setAttribute('fx','50%');
        grad.setAttribute('fy','50%');
        grad.setAttribute('spreadMethod',grad_spread_method);
        grad.setAttribute('gradientUnits','userSpaceOnUse');
        for(i=0;i<colors.length;i++){
            stop=document.createElementNS('http://www.w3.org/2000/svg','stop');
            if(typeof(colors[i])=="string"){
            stop.setAttribute('offset',(i*100/colors.length)+'%');
            stop.setAttribute('stop-color',colors[i]);
            grad.appendChild(stop);}
            else if(typeof(colors[i])=="object"){
                stop.setAttribute('offset',colors[i][0]);
                stop.setAttribute('stop-color',colors[i][1]);
                grad.appendChild(stop);
               
            }
        }
        defs.appendChild(grad);
        svgelem.appendChild(defs);

    }
}


////////////////////////////////////////////////////////
///////////////  Drawing the Graph /////////////////////

class lineGraph{
    constructor(DOM_container,graphData,layout){
        this.DOM_container=DOM_container;
        this.graphData=graphData;
        this.layout=layout;
        this.pre_calc = graph_precalculate(this.graphData,this.layout,this.DOM_container);
        makeGrid(this.DOM_container,this.pre_calc,this.layout);
        makeTitle(this.DOM_container,this.layout);
        makeLabels(this.DOM_container,this.pre_calc,this.layout);
        makeLegend(this.DOM_container,this.pre_calc,this.graphData,this.layout);
        //making points and lines
        dy=this.pre_calc.h_graph/(layout.yaxes.no_parts-1);
        dx=this.pre_calc.w_graph/(this.pre_calc.mostdataset_length-1);
    

        for(dataindex=0;dataindex<this.graphData.length;dataindex++){

            var data = this.graphData[dataindex];
            var data_x = data.x;
            var data_y = data.y;
            if(data.visible == false){
                continue;
            }

            var line_color=data.line.color;
            var line_width=data.line.width || 2;
            var line_fill=data.line.fill||"none";
            var line_fillstyle=data.line.fill_style||"from-min";
            var line_style=data.line.style || "solid";
            var line_linecap=data.line.linecap || "round";
            var line_linejoin=data.line.linejoin || "round";
            var line_visible=data.line.visible;
            if(line_visible!=false){
                line_visible=true;
            }

            var marker_size=data.marker.size|| 0;
            console.log(marker_size);
            var marker_color=data.marker.color ||line_color;
            var marker_fill=data.marker.fill || "none";
            var marker_visible=data.marker.visible||false;
            var polyline_str=" ";
            var marker_grp=document.createElementNS("http://www.w3.org/2000/svg","g");

            for(i=0;i <data_x.length ; i++){
                var y = data_y[i];
                var x_pos = pad+dx*i;
                var y_pos = pad+this.pre_calc.h_graph-(y-this.pre_calc.y_min)*this.pre_calc.map_ratio;
               
                //markers
                if(marker_visible){
                var circle = document.createElementNS("http://www.w3.org/2000/svg","circle");
                circle.setAttribute("cx",x_pos);
                circle.setAttribute("cy",y_pos);
                circle.setAttribute("r",marker_size);
                circle.setAttribute("stroke",marker_color);
                circle.setAttribute("fill",marker_fill);
                marker_grp.appendChild(circle);
            }

                //lines
                polyline_str+=x_pos+","+y_pos+" ";

            }

             // defining points for fill
             switch(line_fillstyle){
                case "none":
                    break;
                case "from-min":
                    var x1=this.pre_calc.pad;
                    var y1=this.pre_calc.h-this.pre_calc.pad;
                    var x2=this.pre_calc.pad+this.pre_calc.w_graph;
                    var y2=this.pre_calc.h-this.pre_calc.pad;
                    var fill_str=x1+","+y1+" "+polyline_str+" "+ x2+","+y2+" ";
                    break;
                case "from-max":
                    var x1=this.pre_calc.pad;
                    var y1=this.pre_calc.pad;
                    var x2=this.pre_calc.pad+this.pre_calc.w_graph;
                    var y2=this.pre_calc.pad;
                    var fill_str=x1+","+y1+" "+polyline_str+" "+ x2+","+y2+" ";
                    break;
                case "from-zero":
                    if(this.pre_calc.y_min>0){
                        var x1=this.pre_calc.pad;
                        var y1=this.pre_calc.h-this.pre_calc.pad;
                        var x2=this.pre_calc.pad+this.pre_calc.w_graph;
                        var y2=this.pre_calc.pad;
                        var fill_str=x1+","+y1+" "+polyline_str+" "+ x2+","+y2+" ";
                    }
                    else if(this.pre_calc.y_max<0){
                        var x1=this.pre_calc.pad;
                        var y1=this.pre_calc.h-this.pre_calc.pad;
                        var x2=this.pre_calc.pad+this.pre_calc.w_graph;
                        var y2=this.pre_calc.h-this.pre_calc.pad;
                        var fill_str=x1+","+y1+" "+polyline_str+" "+ x2+","+y2+" ";
                    }
                    else{
                        var x1=this.pre_calc.pad;
                        var y1=this.pre_calc.zeroval_coord;
                        var x2=this.pre_calc.pad+this.pre_calc.w_graph;
                        var y2=this.pre_calc.zeroval_coord;
                        var fill_str=x1+","+y1+" "+polyline_str+" "+ x2+","+y2+" ";
                    }

                    
             }



             if(line_visible){
            var polyline=document.createElementNS("http://www.w3.org/2000/svg","polyline");
            polyline.setAttribute("points",polyline_str);
            polyline.setAttribute("stroke",line_color);
            polyline.setAttribute("stroke-width",line_width);
            polyline.setAttribute("stroke-linecap",line_linecap);
            polyline.setAttribute("stroke-linejoin",line_linejoin);
            polyline.setAttribute("fill","none");
            switch(line_style){
                case "solid":
                    polyline.setAttribute("stroke-dasharray","none");
                    break;
                case "dashed":
                    polyline.setAttribute("stroke-dasharray","3,5");
                    break;
                case "dotted":
                    polyline.setAttribute("stroke-dasharray","0.2,5");
                    break;
                case "dash-dot":
                    polyline.setAttribute("stroke-dasharray","3,5,0.2,5");
                    break;
                case "spaced-dot":
                    polyline.setAttribute("stroke-dasharray","0.2,8");
                    break;
                case "spaced-dash":
                    polyline.setAttribute("stroke-dasharray","4,8");
                    break;
                case "long-dash":
                    polyline.setAttribute("stroke-dasharray","8,8");
                    break;
            }

            var filline=document.createElementNS("http://www.w3.org/2000/svg","polyline");
            filline.setAttribute("points",fill_str);
            filline.setAttribute("stroke","none");
            filline.setAttribute("stroke-width",0);
            filline.setAttribute("fill",line_fill);
            filline.setAttribute("stroke-linecap",line_linecap);
            filline.setAttribute("stroke-linejoin",line_linejoin);
            
            
            svg.appendChild(filline);
            svg.appendChild(polyline);
        }
            svg.appendChild(marker_grp);
            
        }
       


    }
}


class bezierGraph{
    constructor(DOM_container,graphData,layout){
        this.DOM_container=DOM_container;
        this.graphData=graphData;
        this.layout=layout;
        this.pre_calc = graph_precalculate(this.graphData,this.layout,this.DOM_container);
        makeGrid(this.DOM_container,this.pre_calc,this.layout);
        makeTitle(this.DOM_container,this.layout);
        makeLabels(this.DOM_container,this.pre_calc,this.layout);
        makeLegend(this.DOM_container,this.pre_calc,this.graphData,this.layout);
        //making points and lines
        dy=this.pre_calc.h_graph/(layout.yaxes.no_parts-1);
        dx=this.pre_calc.w_graph/(this.pre_calc.mostdataset_length-1);

        for(dataindex=0;dataindex<this.graphData.length;dataindex++){
            var points=[]; //points for calculating bezier curve
            var pointsfill=[]; //points for filling
            var data = this.graphData[dataindex];
            var data_x = data.x;
            var data_y = data.y;
            if(data.visible == false){
                continue;
            }

            var line_color=data.line.color;
            var line_width=data.line.width || 2;
            var line_fill=data.line.fill||"none";
            var line_fillstyle=data.line.fill_style||"from-min";
            var line_style=data.line.style || "solid";
            var line_linecap=data.line.linecap || "round";
            var line_linejoin=data.line.linejoin || "round";
            var line_tension=data.line.tension || 0.2;
            var line_visible=data.line.visible;
            if(line_visible!=false){
                line_visible=true;
            }
            var marker_size=data.marker.size||0;
            var marker_color=data.marker.color||line_color;
            var marker_fill=data.marker.fill||"none";
            var marker_visible=data.marker.visible||false;

            var marker_grp=document.createElementNS("http://www.w3.org/2000/svg","g");

            for(i=0;i <data_x.length ; i++){
                var y = data_y[i];
                var x_pos = pad+dx*i;
                var y_pos = pad+this.pre_calc.h_graph-(y-this.pre_calc.y_min)*this.pre_calc.map_ratio;
               
                //markers
                if(marker_visible){
                var circle = document.createElementNS("http://www.w3.org/2000/svg","circle");
                circle.setAttribute("cx",x_pos);
                circle.setAttribute("cy",y_pos);
                circle.setAttribute("r",marker_size);
                circle.setAttribute("stroke",marker_color);
                circle.setAttribute("fill",marker_fill);
                marker_grp.appendChild(circle);
            }

                points.push([x_pos,y_pos]);
                //lines

            }
        

            if(line_visible){
            // Create the svg <path> element
            var path= document.createElementNS("http://www.w3.org/2000/svg","path");
            path.setAttribute('d',svgPath(points, bezierCommand,line_tension));
            path.setAttribute('stroke',line_color);
            path.setAttribute('stroke-width',line_width);
            path.setAttribute('fill','none');
            path.setAttribute('stroke-linecap',line_linecap);
            path.setAttribute('stroke-linejoin',line_linejoin);
            switch(line_style){
                case "solid":
                    path.setAttribute("stroke-dasharray","none");
                    break;
                case "dashed":
                    path.setAttribute("stroke-dasharray","3,5");
                    break;
                case "dotted":
                    path.setAttribute("stroke-dasharray","0.2,5");
                    break;
                case "dash-dot":
                    path.setAttribute("stroke-dasharray","3,5,0.2,5");
                    break;
                case "spaced-dot":
                    path.setAttribute("stroke-dasharray","0.2,8");
                    break;
                case "spaced-dash":
                    path.setAttribute("stroke-dasharray","4,8");
                    break;
                case "long-dash":
                    path.setAttribute("stroke-dasharray","8,8");
                    break;
            }

            // Create the fill svg <path> element
            var fillpath= document.createElementNS("http://www.w3.org/2000/svg","path");
           switch(line_fillstyle){
                case "none":
                    break;
                case "from-min":
                    var x1=this.pre_calc.pad;
                    var y1=this.pre_calc.h-this.pre_calc.pad;
                    var x2=this.pre_calc.pad+this.pre_calc.w_graph;
                    var y2=this.pre_calc.h-this.pre_calc.pad;
                    var dval_fill =svgPath(points, bezierCommand,line_tension);
                    dval_fill += " L"+x2+","+y2+"L"+x1+","+y1+"Z";
                    fillpath.setAttribute('d',dval_fill);
                    break;
                case "from-max":
                    var x1=this.pre_calc.pad;
                    var y1=this.pre_calc.pad;
                    var x2=this.pre_calc.pad+this.pre_calc.w_graph;
                    var y2=this.pre_calc.pad;
                    var dval_fill =svgPath(points, bezierCommand,line_tension);
                    dval_fill += " L"+x2+","+y2+"L"+x1+","+y1+"Z";
                    fillpath.setAttribute('d',dval_fill);
                    break;
                case "from-zero":
                    if(this.pre_calc.y_min>0){
                        var x1=this.pre_calc.pad;
                        var y1=this.pre_calc.h-this.pre_calc.pad;
                        var x2=this.pre_calc.pad+this.pre_calc.w_graph;
                        var y2=this.pre_calc.pad;
                        var dval_fill =svgPath(points, bezierCommand,line_tension);
                        dval_fill += " L"+x2+","+y2+"L"+x1+","+y1+"Z";
                        fillpath.setAttribute('d',dval_fill);
                    }
                    else if(this.pre_calc.y_max<0){
                        var x1=this.pre_calc.pad;
                        var y1=this.pre_calc.h-this.pre_calc.pad;
                        var x2=this.pre_calc.pad+this.pre_calc.w_graph;
                        var y2=this.pre_calc.h-this.pre_calc.pad;
                        var dval_fill =svgPath(points, bezierCommand,line_tension);
                        dval_fill += " L"+x2+","+y2+"L"+x1+","+y1+"Z";
                        fillpath.setAttribute('d',dval_fill);
                    }
                    else{
                        var x1=this.pre_calc.pad;
                        var y1=this.pre_calc.zeroval_coord;
                        var x2=this.pre_calc.pad+this.pre_calc.w_graph;
                        var y2=this.pre_calc.zeroval_coord;
                        var dval_fill =svgPath(points, bezierCommand,line_tension);
                        dval_fill += " L"+x2+","+y2+"L"+x1+","+y1+"Z";
                        fillpath.setAttribute('d',dval_fill);
                    }


            }
            fillpath.setAttribute('stroke','none');
            fillpath.setAttribute('stroke-width',0);
            fillpath.setAttribute('fill',line_fill);
            fillpath.setAttribute('stroke-linecap',line_linecap);
            fillpath.setAttribute('stroke-linejoin',line_linejoin);
            

            
            svg.appendChild(fillpath);
            svg.appendChild(path);
        }
            svg.appendChild(marker_grp);




        }

        
    }

}


 ////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
        const svgPath = (points, command, line_tension) => {

            dval = points.reduce((acc, point, i, a) => i === 0
            ? `M ${point[0]},${point[1]}`
            : `${acc} ${command(point, i, a, line_tension)}`
            , '')

            return dval
            
        }
        
        
        const bline = (pointA, pointB) => {
            const lengthX = pointB[0] - pointA[0]
            const lengthY = pointB[1] - pointA[1]
            return {
            length: Math.sqrt(Math.pow(lengthX, 2) + Math.pow(lengthY, 2)),
            angle: Math.atan2(lengthY, lengthX)
            }
        }
        
        const controlPoint = (current, previous, next, reverse,line_tension) => {

            const p = previous || current
            const n = next || current
           
            const smoothing = line_tension
           
            const o = bline(p, n)
            const angle = o.angle + (reverse ? Math.PI : 0)
            const length = o.length * smoothing
            
            const x = current[0] + Math.cos(angle) * length
            const y = current[1] + Math.sin(angle) * length
            return [x, y]
        }
        
        const bezierCommand = (point, i, a,line_tension) => {
            // start control point
            const [cpsX, cpsY] = controlPoint(a[i - 1], a[i - 2], point,0,line_tension)
            // end control point
            const [cpeX, cpeY] = controlPoint(point, a[i - 1], a[i + 1], true,line_tension)
            return `C ${cpsX},${cpsY} ${cpeX},${cpeY} ${point[0]},${point[1]}`
        }

       

class scatterGraph{
    constructor(DOM_container,graphData,layout){
        this.DOM_container=DOM_container;
        this.graphData=graphData;
        this.layout=layout;
        this.pre_calc=graph_precalculate(this.graphData,this.layout);
        makeGrid(this.DOM_container,this.pre_calc,this.layout);
        makeTitle(this.DOM_container,this.layout);
        makeLabels(this.DOM_container,this.pre_calc,this.layout);
        makeLegend(this.DOM_container,this.pre_calc,this.graphData,this.layout);
        //making points
        dy=this.pre_calc.h_graph/(layout.yaxes.no_parts-1);
        dx=this.pre_calc.w_graph/(this.pre_calc.mostdataset_length-1);

        for(dataindex=0; dataindex<this.graphData.length;dataindex++){

            var data=this.graphData[dataindex];
            var data_x=data.x;
            var data_y=data.y;
            if(data.visible==false){
                continue;
            }

            var marker_size=data.marker.size;
            var marker_fill=data.marker.fill;
            var marker_color=data.marker.color;
            var marker_visible=data.marker.visible||true;

            var marker_grp=document.createElementNS("http://www.w3.org/2000/svg","g");

            for(var i=0;i<data_x.length;i++){
                var y =data_y[i];
                var x_pos = pad + dx*i;
                var y_pos = pad + this.pre_calc.h_graph -(y-this.pre_calc.y_min)*this.pre_calc.map_ratio;

                //markers
                if(marker_visible){
                var circle=document.createElementNS("http://www.w3.org/2000/svg","circle");
                circle.setAttribute('cx',x_pos);
                circle.setAttribute('cy',y_pos);
                circle.setAttribute('r',marker_size);
                circle.setAttribute('fill',marker_fill);
                circle.setAttribute('stroke',marker_color);
                circle.setAttribute('stroke-width',1);
                marker_grp.appendChild(circle);
                }

            }

            svg.appendChild(marker_grp);


        }

    }
}




class barGraph{
    constructor(DOM_container,graphData,layout){
        this.DOM_container=DOM_container;
        this.graphData=graphData;
        this.layout=layout;
        this.pre_calc=graph_precalculate(this.graphData,this.layout);
        makeGridBar(this.DOM_container,this.pre_calc,this.layout);
        makeTitle(this.DOM_container,this.layout);
        makeLabelsBar(this.DOM_container,this.pre_calc,this.layout);
      //  makeLegend(this.DOM_container,this.pre_calc,this.graphData,this.layout);
        //making bars
        dy=this.pre_calc.h_graph/(layout.yaxes.no_parts-1);
        dx=this.pre_calc.w_graph/(this.pre_calc.mostdataset_length);

        for(dataindex=0; dataindex<this.graphData.length;dataindex++){

            var data=this.graphData[dataindex];
            var data_x=data.x;
            var data_y=data.y;
            if(data.visible==false){
                continue;
            }

            var bar_width=data.bar.width || 50; //width percentage
            var bar_fill=data.bar.fill;
            var bar_stroke=data.bar.stroke||"none";
            var bar_stroke_width=data.bar.stroke_width||0;
            var bar_stroke_style=data.bar.stroke_style||"solid";
            var bar_visible=data.bar.visible||true;
            var bar_border_radius=data.bar.border_radius||0;
            var bar_fill_style=data.bar.fill_style||"from-zero";
            var bar_grp=document.createElementNS("http://www.w3.org/2000/svg","g");

            var ic=0;
            for(var i=0;i<data_x.length;i++){
                var y=data_y[i];
                var wp=dx*bar_width/100;
                var x_pos = pad + dx*i+dx/2-wp/2;
                var y_pos = pad + this.pre_calc.h_graph -(y-this.pre_calc.y_min)*this.pre_calc.map_ratio;

                //bars
                if(bar_visible){
                    var rect=document.createElementNS("http://www.w3.org/2000/svg","rect");
                    switch(bar_fill_style){
                        case "from-min":
                            rect.setAttribute('x',x_pos);
                            rect.setAttribute('y',y_pos);
                            rect.setAttribute('width',wp);
                            rect.setAttribute('height',h_graph-y_pos+pad);
                            break;
                        case "from-zero":
                            if(y>0){
                                rect.setAttribute('x',x_pos);
                                rect.setAttribute('y',y_pos);
                                rect.setAttribute('width',wp);
                                rect.setAttribute('height',this.pre_calc.zeroval_coord-y_pos);}
                            else{
                                rect.setAttribute('x',x_pos);
                                rect.setAttribute('y',this.pre_calc.zeroval_coord);
                                rect.setAttribute('width',wp);
                                rect.setAttribute('height',y_pos-this.pre_calc.zeroval_coord);
                            }
                            break;
                        case "from-max":
                            rect.setAttribute('x',x_pos);
                            rect.setAttribute('y',pad);
                            rect.setAttribute('width',wp);
                            rect.setAttribute('height',y_pos-pad);
                            break;
                    }

                    if(typeof(bar_fill)=="object"){
                        if(ic<bar_fill.length){
                        var bar_fill_color=bar_fill[ic];
                    ic++;}
                        else{
                            var bar_fill_color=bar_fill[ic-1];
                            ic=0;
                        }
                        rect.setAttribute('fill',bar_fill_color);
                    }
                    else{
                        rect.setAttribute('fill',bar_fill);
                    }
                    rect.setAttribute('stroke',bar_stroke);
                    rect.setAttribute('stroke-width',bar_stroke_width);
                    switch(bar_stroke_style){
                        case "solid":
                            rect.setAttribute("stroke-dasharray","none");
                            break;
                        case "dashed":
                            rect.setAttribute("stroke-linecap","round");
                            rect.setAttribute("stroke-dasharray","3,5");
                            break;
                        case "dotted":
                            rect.setAttribute("stroke-linecap","round");
                            rect.setAttribute("stroke-dasharray","0.2,5");
                            break;
                        case "dash-dot":
                            rect.setAttribute("stroke-dasharray","3,5,0.2,5");
                            break;
                        case "spaced-dot":
                            rect.setAttribute("stroke-dasharray","0.2,8");
                            break;
                        case "spaced-dash":
                            rect.setAttribute("stroke-dasharray","4,8");
                            break;
                        case "long-dash":
                            rect.setAttribute("stroke-dasharray","8,8");
                            break;
                    }
        
                    rect.setAttribute('rx',bar_border_radius);
                    rect.setAttribute('ry',bar_border_radius);
                    bar_grp.appendChild(rect);
                }



            }

            svg.appendChild(bar_grp);

        }
    }
}

class horizontalBarGraph{
    constructor(DOM_container,graphData,layout){
        this.DOM_container=DOM_container;
        this.graphData=graphData;
        this.layout=layout;
        this.pre_calc=graph_precalculate(this.graphData,this.layout);

        makeGridBarH(this.DOM_container,this.pre_calc,this.layout);
        makeTitle(this.DOM_container,this.layout);
        makeLabelsBarH(this.DOM_container,this.pre_calc,this.layout);

        dy=pre_calc.w_graph/(layout.yaxes.no_parts-1);
        dx=pre_calc.h_graph/(pre_calc.mostdataset_length);

        for(dataindex=0;dataindex<this.graphData.length;dataindex++){
            
            var data=this.graphData[dataindex];
            var data_x=data.x;
            var data_y=data.y;
            if(data.visible==false){
                continue;
            }

            var bar_width=data.bar.width || 50; //width percentage
            var bar_fill=data.bar.fill;
            var bar_stroke=data.bar.stroke||"none";
            var bar_stroke_width=data.bar.stroke_width||0;
            var bar_stroke_style=data.bar.stroke_style||"solid";
            var bar_visible=data.bar.visible||true;
            var bar_border_radius=data.bar.border_radius||0;
            var bar_fill_style=data.bar.fill_style||"from-zero";
            var bar_grp=document.createElementNS("http://www.w3.org/2000/svg","g");

            console.log(dx)
            console.log(dy)

            var map_ratioH= this.pre_calc.w_graph/(y_max-y_min)
            var zeroval_coordH= pad + (0-y_min)*map_ratioH;
            var ic=0;
            for(var i=0;i<data_x.length;i++){
                var y=data_y[i];
                var wp=dx*bar_width/100;
                var x_pos = pad + dx*i+dx/2-wp/2;
                var y_pos = pad + (y-this.pre_calc.y_min)*map_ratioH;

                //bars
                if(bar_visible){
                    var rect=document.createElementNS("http://www.w3.org/2000/svg","rect");
                    switch(bar_fill_style){
                        case "from-min":
                            rect.setAttribute('x',pad);
                            rect.setAttribute('y',pre_calc.h-(dx*i)-pad-dx/2-wp/2);
                            rect.setAttribute('width',y_pos);
                            rect.setAttribute('height',wp);
                            break;
                        case "from-zero":
                            if(y>0){
                                rect.setAttribute('x',zeroval_coordH);
                                rect.setAttribute('y',pre_calc.h-(dx*i)-pad-dx/2-wp/2);
                                rect.setAttribute('width',y_pos-zeroval_coordH);
                                rect.setAttribute('height',wp);}
                            else{
                                rect.setAttribute('x',y_pos);
                                rect.setAttribute('y',pre_calc.h-(dx*i)-pad-dx/2-wp/2);
                                rect.setAttribute('width',zeroval_coordH-y_pos);
                                rect.setAttribute('height',wp);
                            }
                            break;
                        case "from-max":
                            rect.setAttribute('x',y_pos);
                            rect.setAttribute('y',pre_calc.h-(dx*i)-pad-dx/2-wp/2);
                            rect.setAttribute('width',this.pre_calc.w_graph+pad-y_pos);
                            rect.setAttribute('height',wp);
                            break;
                    }

                    if(typeof(bar_fill)=="object"){
                        if(ic<bar_fill.length){
                        var bar_fill_color=bar_fill[ic];
                    ic++;}
                        else{
                            var bar_fill_color=bar_fill[ic-1];
                            ic=0;
                        }
                        rect.setAttribute('fill',bar_fill_color);
                    }
                    else{
                        rect.setAttribute('fill',bar_fill);
                    }
                    rect.setAttribute('stroke',bar_stroke);
                    rect.setAttribute('stroke-width',bar_stroke_width);
                    switch(bar_stroke_style){
                        case "solid":
                            rect.setAttribute("stroke-dasharray","none");
                            break;
                        case "dashed":
                            rect.setAttribute("stroke-linecap","round");
                            rect.setAttribute("stroke-dasharray","3,5");
                            break;
                        case "dotted":
                            rect.setAttribute("stroke-linecap","round");
                            rect.setAttribute("stroke-dasharray","0.2,5");
                            break;
                        case "dash-dot":
                            rect.setAttribute("stroke-dasharray","3,5,0.2,5");
                            break;
                        case "spaced-dot":
                            rect.setAttribute("stroke-dasharray","0.2,8");
                            break;
                        case "spaced-dash":
                            rect.setAttribute("stroke-dasharray","4,8");
                            break;
                        case "long-dash":
                            rect.setAttribute("stroke-dasharray","8,8");
                            break;
                    }
        
                    rect.setAttribute('rx',bar_border_radius);
                    rect.setAttribute('ry',bar_border_radius);
                    bar_grp.appendChild(rect);
                }



            }

            svg.appendChild(bar_grp);
        }
    }

}

class stackedBarGraph{
    constructor(DOM_container,graphData,layout){
        this.DOM_container=DOM_container;
        this.graphData=graphData;
        this.layout=layout;
        this.pre_calc=graph_precalculate(this.graphData,this.layout);

        makeGridBar(this.DOM_container,this.pre_calc,this.layout);
        makeTitle(this.DOM_container,this.layout);
        makeLabelsBar(this.DOM_container,this.pre_calc,this.layout);

        dy=pre_calc.h_graph/(layout.yaxes.no_parts-1);
        dx=pre_calc.w_graph/(pre_calc.mostdataset_length);

        for(dataindex=0;dataindex<this.graphData.length;dataindex++){
          



        
    }
}
}