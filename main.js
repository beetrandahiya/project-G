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
    h=layout.height;
    w=layout.width;
    pad=layout.padding;
    h_graph=h-pad*2;
    map_ratio = h_graph / (y_max - y_min);

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

    return pre_calc;

}

function makeGrid(DOM_container,pre_calc,layout){
    //making the main svg
    svg=document.createElementNS("http://www.w3.org/2000/svg","svg");
    svg.setAttribute("width",pre_calc.w);
    svg.setAttribute("height",pre_calc.h);
    DOM_container.appendChild(svg);

    //making the grid
    dy=pre_calc.h_graph/(layout.yaxes.no_parts-1);
    dx=pre_calc.w_graph/(pre_calc.mostdataset_length-1);
    
    y_axes_stroke_width=layout.yaxes.stroke_width;
    y_axes_stroke_color=layout.yaxes.stroke;
    y_axes_stroke_dasharray=layout.yaxes.style;
    y_axes_domain=layout.yaxes.domain;

    x_axes_stroke_width=layout.xaxis.stroke_width;
    x_axes_stroke_color=layout.xaxis.stroke;
    x_axes_stroke_dasharray=layout.xaxis.style;


    if (y_axes_domain != "auto") {
        y_min = y_axes_domain[0]; //here we set the domain of y axis
        y_max = y_axes_domain[1];
    }
    
    //y axes
    yaxes_grp=document.createElementNS("http://www.w3.org/2000/svg","g");
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

    //x axes
    xaxes_grp=document.createElementNS("http://www.w3.org/2000/svg","g");
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
    }

    //adding the grid to the main svg
    svg.appendChild(yaxes_grp);
    svg.appendChild(xaxes_grp);


}

function makeTitle(DOM_container,layout){
    //making the title
    title=document.createElementNS("http://www.w3.org/2000/svg","text");
    title.setAttribute("x",layout.width/2);
    title.setAttribute("y",layout.padding/2);
    title.setAttribute("text-anchor","middle");
    title.setAttribute("font-size",layout.title.font_size);
    title.setAttribute("font-family",layout.title.font_family);
    title.setAttribute("font-weight",layout.title.font_weight);
    title.setAttribute("fill",layout.title.color);
    title.setAttribute("anti-alias","true");
    title.innerHTML=layout.title.text;
    svg.appendChild(title);
}

function makeLabels(DOM_container,pre_calc,layout){
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
    }

    svg.appendChild(ylabel_grp);
    svg.appendChild(xlabel_grp);
}

function makeLegend(DOM_container,pre_calc,graphData,layout){
    //making the legend
    legend_grp=document.createElementNS("http://www.w3.org/2000/svg","g");
    for(dataindex=0;dataindex<graphData.length;dataindex++){
        var legend_line=document.createElementNS("http://www.w3.org/2000/svg","line");
        var legend_marker=document.createElementNS("http://www.w3.org/2000/svg","circle");
        var legend_text=document.createElementNS("http://www.w3.org/2000/svg","text");


        switch(layout.legend.position){
            case "top-right":
                legend_line.setAttribute("x1",layout.width-layout.padding+layout.legend.padding);
                legend_line.setAttribute("y1",3*layout.padding/2+dataindex*(layout.legend.font_size+layout.legend.padding));
                legend_line.setAttribute("x2",layout.width-layout.padding+layout.legend.padding+2*layout.legend.font_size);
                legend_line.setAttribute("y2",3*layout.padding/2+dataindex*(layout.legend.font_size+layout.legend.padding));
                
                legend_marker.setAttribute("cx",layout.width-layout.padding+layout.legend.padding+layout.legend.font_size);
                legend_marker.setAttribute("cy",3*layout.padding/2+dataindex*(layout.legend.font_size+layout.legend.padding));

                legend_text.setAttribute("x",layout.width-layout.padding+2*layout.legend.padding+2*layout.legend.font_size);
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
        }
       legend_line.setAttribute("stroke",graphData[dataindex].line.color);
        legend_line.setAttribute("stroke-width",graphData[dataindex].line.width);
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

        legend_grp.appendChild(legend_marker);
        legend_grp.appendChild(legend_line);
        legend_grp.appendChild(legend_text);
    }
    svg.appendChild(legend_grp);
}


////////////////////////////////////////////////////////
///////////////  Drawing the Graph /////////////////////

class lineGraph{
    constructor(DOM_container,graphData,layout){
        this.DOM_container=DOM_container;
        this.graphData=graphData;
        this.layout=layout;
        this.pre_calc = graph_precalculate(this.graphData,this.layout);
        makeGrid(this.DOM_container,this.pre_calc,this.layout);
        makeTitle(this.DOM_container,this.layout);
        makeLabels(this.DOM_container,this.pre_calc,this.layout);
        makeLegend(this.DOM_container,this.pre_calc,this.graphData,this.layout);
        //making points and lines
        dy=this.pre_calc.h_graph/(layout.yaxes.no_parts-1);
        dx=this.pre_calc.w_graph/(pre_calc.mostdataset_length-1);
    

        for(dataindex=0;dataindex<this.graphData.length;dataindex++){

            var data = this.graphData[dataindex];
            var data_x = data.x;
            var data_y = data.y;
            if(data.visible == false){
                continue;
            }

            var line_color=data.line.color;
            var line_width=data.line.width || 2;
            var line_style=data.line.style || "solid";
            var line_linecap=data.line.linecap || "round";
            var line_linejoin=data.line.linejoin || "round";

            var marker_size=data.marker.size;
            var marker_color=data.marker.color;
            var marker_fill=data.marker.fill;
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
            svg.appendChild(polyline);
            svg.appendChild(marker_grp);
        }

       


    }
}