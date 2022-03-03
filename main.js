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

        svg.appendChild(line);
    }

    //x axes
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

        svg.appendChild(line);
    }


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
            polyline_str="";
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
                svg.appendChild(circle);}

                //lines
                polyline_str+=x_pos+","+y_pos+" ";

            }

            var polyline=document.createElementNS("http://www.w3.org/2000/svg","polyline");
            polyline.setAttribute("points",polyline_str);
            polyline.setAttribute("stroke",line_color);
            polyline.setAttribute("stroke-width",line_width);
            polyline.setAttribute("stroke-linecap",line_linecap);
            polyline.setAttribute("stroke-linejoin",line_linejoin);
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
        }


    }
}