colorpallete1 = ['#00C0C7', '#5144D3', '#E8871A', '#DA3490', '#9089FA', '#47E26F', '#2780EB'];
shadesofred = ['#2E0E02', '#581908', '#983628', '#FE5F55', '#F93943'];
shadesofgreen = ['#134611', '#3E8914', '#3DA35D', '#96E072', '#E8FCCF'];
neonpallete = ['#DB276', '#B0DB43', '#12EAEA', '#440BD4', '#5CE5D5'];


function newLineGraph(containerDOM, graphData, layout) {


    element = document.getElementById(containerDOM);

    /////////////////////////////////////////////
    height = layout.height;
    width = layout.width;
    padding = layout.padding;
    bgcolor = layout.bgcolor ?? '#fff';
    styles=layout.styles??{};


    /////////////////////////////////////////////

    title = layout.title ?? {};
    title_font_color=layout.title.fontcolor ?? '#000';
    title_font_size=layout.title.fontsize ?? '20px';
    title_font_family=layout.title.fontfamily ?? 'Arial';
    title_font_weight=layout.title.fontweight ?? 'bold';


    /////////////////////////////////////////////

    xaxis = layout.xaxis ?? {};
    xaxis_title = xaxis.title ?? {};
    x_axis_title = layout.xaxis.title.text ?? "";
    x_axis_title_font_size = layout.xaxis.title.fontsize ?? 18;
    x_axis_title_font_color = layout.xaxis.title.fontcolor ?? "#000";
    x_axis_title_font_family = layout.xaxis.title.fontfamily ?? "Arial";
    x_axis_title_font_weight = layout.xaxis.title.fontweight ?? "bold";

    ///////////////////////////////////////////////
    x_axis_visible = layout.xaxis.visible ?? true;
    x_axis_stroke = layout.xaxis.stroke ?? "rgba(0,0,0,0.2)";
    x_axis_stroke_width = layout.xaxis.stroke_width ?? "0.5px";

    //////////////////////////////////////////////

    yaxis = layout.yaxis ?? {};
    yaxis_title = layout.yaxis.title ?? {};
    y_axis_title = layout.yaxis.title.text ?? "";
    y_axis_title_font_size = layout.yaxis.title.fontsize ?? 18;
    y_axis_title_font_color = layout.yaxis.title.fontcolor ?? "#000";
    y_axis_title_font_family = layout.yaxis.title.fontfamily ?? "Arial";
    y_axis_title_font_weight = layout.yaxis.title.fontweight ?? "bold";


    ///////////////////////////////////////////////
    y_axis_visible = layout.yaxis.visible ?? true;
    y_axis_stroke = layout.yaxis.stroke ?? "rgba(0,0,0,0.2)";
    y_axis_stroke_width = layout.yaxis.stroke_width ?? "0.5px";
    y_axis_domain = layout.yaxis.domain ?? "auto";
    y_axis_no_parts = layout.yaxis.no_parts ?? 5;


    //////////////////////////////////////////////

    xlabel = layout.xlabel ?? {};

    x_labels = layout.xlabel.labels ?? graphData[0].x; //here we set the labels to be shown on x axis and if not specified then we set it to be the x values of the first graph in the data array .
    x_axis_label_visible = layout.xlabel.visible ?? false;
    x_axis_label_font_size = layout.xlabel.fontsize ?? 12;
    x_axis_label_font_color = layout.xlabel.fontcolor ?? "rgba(0,0,0,0.5)";
    x_axis_label_font_family = layout.xlabel.fontfamily ?? "sans-serif";
    x_axis_label_font_weight = layout.xlabel.fontweight ?? "normal";

    /////////////////////////////////////////////

    ylabel = layout.ylabel  ?? {};

    y_axis_label_visible = layout.ylabel.visible ?? true;
    y_axis_label_font_size = layout.ylabel.fontsize ?? 12;
    y_axis_label_font_color = layout.ylabel.fontcolor ?? "rgba(0,0,0,0.5)";
    y_axis_label_font_family = layout.ylabel.fontfamily ?? "sans-serif";
    y_axis_label_font_weight = layout.ylabel.fontweight ?? "normal";

    /////////////////////////////////////////////

    legend = layout.legend ?? {};

    legend_visible = layout.legend.visible ?? true;
    legend_position = layout.legend.position ?? "top-right";
    legend_font_size = layout.legend.fontsize ?? 12;
    legend_font_color = layout.legend.fontcolor ?? "rgba(0,0,0,0.5)";
    legend_font_family = layout.legend.fontfamily ?? "sans-serif";
    legend_font_weight = layout.legend.fontweight ?? "normal";
    legend_padding = layout.legend.padding ?? 10;

    /////////////////////////////////////////////





    h_graph = height - 2 * padding;
    h_base_graph = height - padding;
    const mainsvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    mainsvg.setAttributeNS(null, "width", width);
    mainsvg.setAttributeNS(null, "height", height);
    mainsvg.setAttributeNS(null, "style", "background:" + bgcolor+"; "+styles);

    /////////////////////////////////////////////
    for (dataindex = 0; dataindex < graphData.length; dataindex++) { //here we find the max value of the data and set the y axis domain to be the same as the max value of the data.
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

    /////////////////////////////////////////////

    if (y_axis_domain != "auto") {
        y_min = y_axis_domain[0]; //here we set the domain of y axis
        y_max = y_axis_domain[1];
    }

    ///////////////////////////////////////////////
    //here we make the x axis title

    const xaxistitle = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    xaxistitle.setAttributeNS(null, "x", width / 2);
    xaxistitle.setAttributeNS(null, "y", height - x_axis_title_font_size);
    xaxistitle.setAttributeNS(null, "fill", x_axis_title_font_color);
    xaxistitle.setAttributeNS(null, "font-size", x_axis_title_font_size);
    xaxistitle.setAttributeNS(null, "font-family", x_axis_title_font_family);
    xaxistitle.setAttributeNS(null, "font-weight", x_axis_title_font_weight);
    xaxistitle.setAttributeNS(null, "text-anchor", "middle");

    xaxistitle.innerHTML = x_axis_title;
    mainsvg.appendChild(xaxistitle);

    ///////////////////////////////////////////////
    //here we make the y axis title

    const yaxistitle = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    yaxistitle.setAttributeNS(null, "x", -(height / 2));
    yaxistitle.setAttributeNS(null, "y", (padding / 2));
    yaxistitle.setAttributeNS(null, "fill", y_axis_title_font_color);
    yaxistitle.setAttributeNS(null, "font-size", y_axis_title_font_size);
    yaxistitle.setAttributeNS(null, "font-family", y_axis_title_font_family);
    yaxistitle.setAttributeNS(null, "font-weight", y_axis_title_font_weight);
    yaxistitle.setAttributeNS(null, "text-anchor", "middle");
    yaxistitle.setAttributeNS(null, "transform", "rotate(-90)");
    yaxistitle.innerHTML = y_axis_title;
    mainsvg.appendChild(yaxistitle);

    ///////////////////////////////////////////////
    //here we make chart title

    titlesvg=document.createElementNS('http://www.w3.org/2000/svg', 'text');
    titlesvg.setAttributeNS(null, "x", width / 2);
    titlesvg.setAttributeNS(null, "y", padding / 2);
    titlesvg.setAttributeNS(null, "fill", title_font_color);
    titlesvg.setAttributeNS(null, "font-size", title_font_size);
    titlesvg.setAttributeNS(null, "font-family", title_font_family);
    titlesvg.setAttributeNS(null, "font-weight", title_font_weight);
    titlesvg.setAttributeNS(null, "text-anchor", "middle");
    titlesvg.innerHTML = title.text;
    mainsvg.appendChild(titlesvg);


    //////////////////////////////////////////////
    polylinesset = [];



    for (dataindex = 0; dataindex < graphData.length; dataindex++) {


        polylinepointssvg = " ";
        polylinepoints=[];
        zerolinepointssvg= " ";
        zerolinepoints=[];
        minvalpointssvg=" ";
        minvalpoints=[];
        maxvalpointssvg=" ";
        maxvalpoints=[];
        polylinepoints_fill=[];

        //polylinepoints_fillsvg = " " + padding + "," + h_base_graph + " ";
        //minvalpoints_fillsvg=" "+padding+","+h_base_graph+" ";
        //maxvalpoints_fillsvg=" "+padding+","+padding+" ";
        
        

        var data = graphData[dataindex];
        var data_x = data.x;
        var data_y = data.y;
        var data_name = data.name ?? "trace " + dataindex;
        var data_visible = data.visible ?? true;
        if (data_visible == false) {
            continue;
        };

        var line = data.line;
        var marker = data.marker;
        var line_color = line.color;
        var line_width = line.width ?? 2;
        var line_fill = line.fill;
        var line_fillstyle = line.fillstyle ?? "from-min";
        var line_style = line.style?? "solid";
        var line_linecap = line.linecap ?? "round";
        var line_linejoin = line.linejoin ?? "round";
        var marker_size = marker.size;
        var marker_color = marker.color;
        var marker_fill = marker.fill;

        var animationtrue = data.animation ?? true;

        //here we make the legend
        svglegend = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        if (legend_position == "top-right") {
            svglegend.setAttributeNS(null, "x", width - padding + 2 * legend_padding);
            svglegend.setAttributeNS(null, "y", padding + padding / 2 + dataindex * (legend_padding + legend_font_size));
            svglegend.setAttributeNS(null, "text-anchor", "start");
            svglegendline = document.createElementNS('http://www.w3.org/2000/svg', 'line');
            svglegendline.setAttributeNS(null, "x1", width - padding + legend_padding / 2);
            svglegendline.setAttributeNS(null, "y1", padding + padding / 2 + dataindex * (legend_padding + legend_font_size) - legend_font_size / 3);
            svglegendline.setAttributeNS(null, "x2", width - padding + 2 * legend_padding - 2);
            svglegendline.setAttributeNS(null, "y2", padding + padding / 2 + dataindex * (legend_padding + legend_font_size) - legend_font_size / 3);
            
            svglegendpoint = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
            svglegendpoint.setAttributeNS(null, "cx", (2 * (width - padding) + 5 / 2 * legend_padding - 2) / 2);
            svglegendpoint.setAttributeNS(null, "cy", padding + padding / 2 + dataindex * (legend_padding + legend_font_size) - legend_font_size / 3);

            
        } else if (legend_position == "top-left") {
            svglegend.setAttributeNS(null, "x", padding-2*legend_padding);
            svglegend.setAttributeNS(null, "y", padding + padding / 2 + dataindex * (legend_padding + legend_font_size));
            svglegend.setAttributeNS(null, "text-anchor", "end");
            svglegendline = document.createElementNS('http://www.w3.org/2000/svg', 'line');
            svglegendline.setAttributeNS(null, "x1", 0);
            svglegendline.setAttributeNS(null, "y1", padding + padding / 2 + dataindex * (legend_padding + legend_font_size) - legend_font_size / 3);
            svglegendline.setAttributeNS(null, "x2", 20);
            svglegendline.setAttributeNS(null, "y2", padding + padding / 2 + dataindex * (legend_padding + legend_font_size) - legend_font_size / 3);
            
            svglegendpoint = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
            svglegendpoint.setAttributeNS(null, "cx", 10);
            svglegendpoint.setAttributeNS(null, "cy", padding + padding / 2 + dataindex * (legend_padding + legend_font_size) - legend_font_size / 3);

        } else if (legend_position == "bottom-right") {
            svglegend.setAttributeNS(null, "x", width - padding + 2 * legend_padding);
            svglegend.setAttributeNS(null, "y", height-(padding + padding / 2 + dataindex * (legend_padding + legend_font_size))+legend_font_size/2);
            svglegend.setAttributeNS(null, "text-anchor", "start");
            svglegendline = document.createElementNS('http://www.w3.org/2000/svg', 'line');
            svglegendline.setAttributeNS(null, "x1", width - padding + legend_padding / 2);
            svglegendline.setAttributeNS(null, "y1", height-(padding + padding / 2 + dataindex * (legend_padding + legend_font_size) - legend_font_size / 3));
            svglegendline.setAttributeNS(null, "x2", width - padding + 2 * legend_padding - 2);
            svglegendline.setAttributeNS(null, "y2", height-(padding + padding / 2 + dataindex * (legend_padding + legend_font_size) - legend_font_size / 3));
            
            svglegendpoint = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
            svglegendpoint.setAttributeNS(null, "cx", (2 * (width - padding) + 5 / 2 * legend_padding - 2) / 2);
            svglegendpoint.setAttributeNS(null, "cy", height -(padding + padding / 2 + dataindex * (legend_padding + legend_font_size) - legend_font_size / 3));

        } else if (legend_position == "bottom-left") {
            svglegend.setAttributeNS(null, "x", padding-2*legend_padding);
            svglegend.setAttributeNS(null, "y", height-(padding + padding / 2 + dataindex * (legend_padding + legend_font_size))+legend_font_size/2);
            svglegend.setAttributeNS(null, "text-anchor", "end");
            svglegendline = document.createElementNS('http://www.w3.org/2000/svg', 'line');
            svglegendline.setAttributeNS(null, "x1", 0);
            svglegendline.setAttributeNS(null, "y1", height-(padding + padding / 2 + dataindex * (legend_padding + legend_font_size) - legend_font_size / 3));
            svglegendline.setAttributeNS(null, "x2", 20);
            svglegendline.setAttributeNS(null, "y2", height-(padding + padding / 2 + dataindex * (legend_padding + legend_font_size) - legend_font_size / 3));
            
            svglegendpoint = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
            svglegendpoint.setAttributeNS(null, "cx", 10);
            svglegendpoint.setAttributeNS(null, "cy", height-(padding + padding / 2 + dataindex * (legend_padding + legend_font_size) - legend_font_size / 3));

        } else if (legend_position == "top-center") {
            svglegend.setAttributeNS(null, "x", width / 2);
            svglegend.setAttributeNS(null, "y", padding + padding / 2 + dataindex * (padding + legend_font_size));
        } else if (legend_position == "bottom-center") {
            svglegend.setAttributeNS(null, "x", width / 2);
            svglegend.setAttributeNS(null, "y", height - padding - padding / 2 - dataindex * (padding + legend_font_size));
        } else if (legend_position == "left-center") {
            svglegend.setAttributeNS(null, "x", 0);
            svglegend.setAttributeNS(null, "y", height / 2);
        } else if (legend_position == "right-center") {
            svglegend.setAttributeNS(null, "x", width);
            svglegend.setAttributeNS(null, "y", height / 2);
        }

        svglegend.setAttributeNS(null, "fill", legend_font_color);
        svglegend.setAttributeNS(null, "font-size", legend_font_size);
        svglegend.setAttributeNS(null, "font-family", legend_font_family);
        svglegend.setAttributeNS(null, "font-weight", legend_font_weight);
        svglegendline.setAttributeNS(null, "stroke", line_color);
        svglegendline.setAttributeNS(null, "stroke-width", line_width);
        svglegendline.setAttributeNS(null, "stroke-linecap", "round");
        svglegendline.setAttributeNS(null, "stroke-linejoin", "round");
        svglegendpoint.setAttributeNS(null, "r", marker_size);
        svglegendpoint.setAttribute('r', marker_size);
        svglegendpoint.setAttribute('stroke', marker_color);
        svglegendpoint.setAttribute('fill', marker_fill);

        svglegend.innerHTML = data_name;
        mainsvg.appendChild(svglegendpoint);
        mainsvg.appendChild(svglegend);
        ///////////////////////////////////////////////

        dx = (width - 2 * padding) / (data_x.length - 1);
        dy = (height - 2 * padding) / y_axis_no_parts; //no. of parts in y axes

        //make y grid lines
        for (i = 0; i <= y_axis_no_parts; i++) {
            h = height - padding - dy * i;
            x1 = padding;
            x2 = width - padding;
            const ygridstr = document.createElementNS(
                'http://www.w3.org/2000/svg',
                'line'
            );
            ygridstr.setAttribute('x1', x1);
            ygridstr.setAttribute('x2', x2);
            ygridstr.setAttribute('y1', h);
            ygridstr.setAttribute('y2', h);
            ygridstr.setAttribute('stroke', y_axis_stroke);
            ygridstr.setAttribute('stroke-width', y_axis_stroke_width);
            const ylbl = document.createElementNS('http://www.w3.org/2000/svg', 'text');
            ylbl.setAttribute('x', padding - 5);
            ylbl.setAttribute('y', h + y_axis_label_font_size / 2);
            ylbl.setAttribute('fill', y_axis_label_font_color);
            ylbl.setAttribute('font-size', y_axis_label_font_size);
            ylbl.setAttribute('font-family', y_axis_label_font_family);
            ylbl.setAttribute('font-weight', y_axis_label_font_weight);
            ylbl.setAttribute('text-anchor', 'end');
            if(Math.abs(y_max - y_min) >10) {
            ylbl.innerHTML = Math.round((y_max - y_min) * (i / y_axis_no_parts) + y_min);}
            else {
                ylbl.innerHTML = ((y_max - y_min) * (i / y_axis_no_parts) + y_min).toFixed(2);
            }
            if (y_axis_label_visible) {
                mainsvg.appendChild(ylbl);
            }
            if (y_axis_visible) {
                mainsvg.appendChild(ygridstr);
            }


        }


        for (i = 0; i <= data_x.length - 1; i++) {
            w = padding + i * dx;
            y1 = height - padding; //min y
            y2 = padding; //max y
            //make x grid lines
            const xgridstr = document.createElementNS(
                'http://www.w3.org/2000/svg',
                'line'
            );
            xgridstr.setAttribute('x1', w);
            xgridstr.setAttribute('x2', w);
            xgridstr.setAttribute('y1', y1);
            xgridstr.setAttribute('y2', y2);
            xgridstr.setAttribute('stroke', x_axis_stroke);
            xgridstr.setAttribute('stroke-width', x_axis_stroke_width);
            const xlbl = document.createElementNS('http://www.w3.org/2000/svg', 'text');
            xlbl.setAttribute('x', w);
            xlbl.setAttribute('y', height - padding + x_axis_label_font_size);
            xlbl.setAttribute('fill', x_axis_label_font_color);
            xlbl.setAttribute('font-size', x_axis_label_font_size);
            xlbl.setAttribute('font-family', x_axis_label_font_family);
            xlbl.setAttribute('font-weight', x_axis_label_font_weight);
            xlbl.setAttribute('text-anchor', 'middle');
            xlbl.innerHTML = x_labels[i];
            if (x_axis_label_visible) {
                mainsvg.appendChild(xlbl);
            }
            if (x_axis_visible) {
                mainsvg.appendChild(xgridstr);
            }


            yval = ((data_y[i] - y_min) * (h_graph) / (y_max - y_min));
            yval = height - padding - yval;
            zeroval = ((0 - y_min) * (h_graph) / (y_max - y_min));
            zeroval=height-padding-zeroval;

            //make points
            const str_point = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
            str_point.setAttribute('cx', w);
            str_point.setAttribute('cy', yval);
            str_point.setAttribute('r', marker_size);
            str_point.setAttribute('stroke', marker_color);
            str_point.setAttribute('fill', marker_fill);
            pointhovervalue = data_x[i] + " , " + data_y[i];
            str_point.setAttribute('title', pointhovervalue);
            mainsvg.appendChild(str_point);

            //add points to polyline
            polylinepoints.push([w, yval]);
            zerolinepoints.push([w, zeroval]);
            minvalpoints.push([w, y1]);
            maxvalpoints.push([w, y2]);
            polylinepointssvg += " " + w + "," + yval + " ";
        }

        //make polyline
        const polyline_fnl_obj = document.createElementNS('http://www.w3.org/2000/svg', 'polyline');
        polyline_fnl_obj.setAttribute('fill', 'none');
        polyline_fnl_obj.setAttribute('stroke', line_color);
        polyline_fnl_obj.setAttribute('stroke-width', line_width);
        polyline_fnl_obj.setAttribute('points', polylinepointssvg);
        polyline_fnl_obj.setAttribute('stroke-linejoin', line_linejoin);
        polyline_fnl_obj.setAttribute('stroke-linecap', line_linecap);
        polyline_fnl_obj.setAttribute('id', 'polyline_fnl_obj'+dataindex);

        //set line style
        if(line_style=="solid"){
            polyline_fnl_obj.setAttribute('stroke-dasharray', 'none');
            svglegendline.setAttribute('stroke-dasharray', 'none');
            
        }
        else if(line_style=="dashed"){
            polyline_fnl_obj.setAttribute('stroke-dasharray', '3,5');
            svglegendline.setAttribute('stroke-dasharray', '3,5');
        }
        else if(line_style=="dotted"){
            polyline_fnl_obj.setAttribute('stroke-dasharray', '0.2,5');
            svglegendline.setAttribute('stroke-dasharray', '0.2,5');
        }
        else if(line_style=="dashdot"){
            polyline_fnl_obj.setAttribute('stroke-dasharray', '3,5,0.2,5');
            svglegendline.setAttribute('stroke-dasharray', '3,5,0.2,5');

        }
        else if(line_style=="spaced-dot"){
            polyline_fnl_obj.setAttribute('stroke-dasharray', '0.2,8');
            svglegendline.setAttribute('stroke-dasharray', '0.2,8');
        }
        else if(line_style=="spaced-dash"){
            polyline_fnl_obj.setAttribute('stroke-dasharray', '4,8');
            svglegendline.setAttribute('stroke-dasharray', '4,8');
        }
        else if(line_style=="long-dash"){
            polyline_fnl_obj.setAttribute('stroke-dasharray', '8,8');
            svglegendline.setAttribute('stroke-dasharray', '8,8');
        }

        

        mainsvg.appendChild(svglegendline);

        minval_final_fill_point = " " + width - padding + "," + h_base_graph + " ";
        zeroline_final_fill_point=" " + width - padding + "," + zeroval+ " ";
        maxval_final_fill_point=" " + width - padding + "," + y2+ " ";

        polylinepoints_fillsvg = " " + padding + "," + h_base_graph + " "+ polylinepointssvg + minval_final_fill_point;

        zerolinepoints_fillsvg = " "+padding+","+ zeroval + " " + polylinepointssvg +  zeroline_final_fill_point;

        maxlinepoints_fillsvg = " " + padding + "," + y2 + " " + polylinepointssvg + maxval_final_fill_point;

        

        //make polyline fill

        const polyline_fnl_fill_obj = document.createElementNS('http://www.w3.org/2000/svg', 'polyline');
        polyline_fnl_fill_obj.setAttribute('fill', line_fill);
        polyline_fnl_fill_obj.setAttribute('stroke', 'none');
        polyline_fnl_fill_obj.setAttribute('stroke-width', line_width);
        polyline_fnl_fill_obj.setAttribute('id', 'polyline_fnl_fill_obj'+dataindex);
        if(line_fillstyle=="from-min"){
            polyline_fnl_fill_obj.setAttribute('points', polylinepoints_fillsvg);
            polylinesset.push([polylinepoints,polylinepointssvg,polylinepoints_fillsvg]);
        }
        else if(line_fillstyle=="from-zero"){
            polyline_fnl_fill_obj.setAttribute('points', zerolinepoints_fillsvg);
            polylinesset.push([polylinepoints,polylinepointssvg,zerolinepoints_fillsvg]);
        }
        else if(line_fillstyle=="from-max"){
            polyline_fnl_fill_obj.setAttribute('points', maxlinepoints_fillsvg);
            polylinesset.push([polylinepoints,polylinepointssvg,maxlinepoints_fillsvg]);
        }
        mainsvg.appendChild(polyline_fnl_fill_obj);
        mainsvg.appendChild(polyline_fnl_obj);

 /*   if(animationtrue==true){

    const anim=document.createElementNS('http://www.w3.org/2000/svg','animate');
    anim.setAttribute('href','#polyline_fnl_obj'+dataindex);
    anim.setAttribute('attributeName','points');
    anim.setAttribute('from',zerolinepoints);
    anim.setAttribute('to',polylinepoints);
    anim.setAttribute('dur','0.5s');
    anim.setAttribute('fill','freeze');
    //anim.setAttribute('calcMode','spline');
    //anim.setAttribute('keySplines','0.4 0 0.2 1; 0.4 0 0.2 1');
    //anim.setAttribute('values',zerolinepoints+';'+polylinepoints);
    mainsvg.appendChild(anim);

    const anim_fill=document.createElementNS('http://www.w3.org/2000/svg','animate');
    anim_fill.setAttribute('href','#polyline_fnl_fill_obj'+dataindex);
    anim_fill.setAttribute('attributeName','points');
    anim_fill.setAttribute('from',zerolinepoints_fill);
    anim_fill.setAttribute('to',polylinepoints_fill);
    anim_fill.setAttribute('dur','0.5s');
    anim_fill.setAttribute('fill','freeze');
    //anim_fill.setAttribute('calcMode','spline');
    //anim_fill.setAttribute('keySplines','0.4 0 0.2 1; 0.4 0 0.2 1');
    //anim_fill.setAttribute('values',zerolinepoints+';'+polylinepoints);
    mainsvg.appendChild(anim_fill);

    }*/


    element.appendChild(mainsvg);

    }
    


}


//make sure to make gradients after the graph function.

function makeGradient(style,colors,id,spread_method){
    var svgelem=document.getElementsByTagName('svg')[0];
    grad_spread_method=spread_method??"pad";
    if(style=="horizontal"){
        var defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
        var grad=document.createElementNS('http://www.w3.org/2000/svg','linearGradient');
        grad.setAttribute('id',id);
        grad.setAttribute('x1','0%');
        grad.setAttribute('y1','0%');
        grad.setAttribute('x2','100%');
        grad.setAttribute('y2','0%');
        grad.setAttribute('spreadMethod',grad_spread_method);
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

