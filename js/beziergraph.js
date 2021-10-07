
function newBezierGraph(containerDOM, graphData, layout) {


    
    element = document.getElementById(containerDOM);

    /////////////////////////////////////////////
    height = layout.height;
    width = layout.width;
    padding = layout.padding;
    bgcolor = layout.bgcolor ?? '#fff';

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
    x_axis_stroke_width = layout.xaxis.stroke_width ?? 1;

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
    y_axis_stroke_width = layout.yaxis.stroke_width ?? 1;
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
    mainsvg.setAttributeNS(null, "style", "background:" + bgcolor);


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



    for (dataindex = 0; dataindex < graphData.length; dataindex++) {


        points=[]; //points for calculating bezier curve
        polylinepoints = " ";

        polylinepoints_fill = " " + padding + "," + h_base_graph + " ";

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
        var line_tension = line.tension ?? 0.2;
        var marker_size = marker.size;
        var marker_color = marker.color;
        var marker_fill = marker.fill;

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
        if(legend_visible){
            mainsvg.appendChild(svglegendpoint);
            mainsvg.appendChild(svglegend);
        }
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
            else{
                    ylbl.innerHTML = ((y_max - y_min) * (i / y_axis_no_parts) + y_min).toFixed(2);
                }   //rounding off the y axis labels
            if (y_axis_label_visible) {
                mainsvg.appendChild(ylbl);
            }
            if (y_axis_visible) {
                mainsvg.appendChild(ygridstr);
            }


        }


        for (i = 0; i <= data_x.length - 1; i++) {
            w = padding + i * dx;
            y1 = height - padding;
            y2 = padding;
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
            polyline_point = " " + w + "," + yval + " ";
            points.push([w, yval]);
           

            polylinepoints_fill = polylinepoints_fill + polyline_point;
            polylinepoints = polylinepoints + polyline_point;
        }


         ////////////////////////////////////////////////////////////////////////////////
        ////////////////////////////////////////////////////////////////////////////////
        const svgPath = (points, command) => {

            dval = points.reduce((acc, point, i, a) => i === 0
            ? `M ${point[0]},${point[1]}`
            : `${acc} ${command(point, i, a)}`
            , '')


            // build the svg <path> element
            //console.log(dval);
            dval_fill = dval;
            path=document.createElementNS('http://www.w3.org/2000/svg', 'path');
            path.setAttribute('d', dval);
            path.setAttribute('stroke', line_color);
            path.setAttribute('stroke-width', line_width);
            path.setAttribute('fill', 'none');
            path.setAttribute('stroke-linecap', line_linecap);
            path.setAttribute('stroke-linejoin', line_linejoin);

            
        }
        
        
        const bline = (pointA, pointB) => {
            const lengthX = pointB[0] - pointA[0]
            const lengthY = pointB[1] - pointA[1]
            return {
            length: Math.sqrt(Math.pow(lengthX, 2) + Math.pow(lengthY, 2)),
            angle: Math.atan2(lengthY, lengthX)
            }
        }
        
        const controlPoint = (current, previous, next, reverse) => {

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
        
        const bezierCommand = (point, i, a) => {
            // start control point
            const [cpsX, cpsY] = controlPoint(a[i - 1], a[i - 2], point)
            // end control point
            const [cpeX, cpeY] = controlPoint(point, a[i - 1], a[i + 1], true)
            return `C ${cpsX},${cpsY} ${cpeX},${cpeY} ${point[0]},${point[1]}`
        }

        // Create the svg <path> element
        svgPath(points, bezierCommand);

        ////////////////////////////////////////////////////////////////////////////////
        ////////////////////////////////////////////////////////////////////////////////

        //set line style
        if(line_style=="solid"){
            path.setAttribute('stroke-dasharray', 'none');
            svglegendline.setAttribute('stroke-dasharray', 'none');
            
        }
        else if(line_style=="dashed"){
            path.setAttribute('stroke-dasharray', '3,5');
            svglegendline.setAttribute('stroke-dasharray', '3,5');
        }
        else if(line_style=="dotted"){
            path.setAttribute('stroke-dasharray', '0.2,5');
            svglegendline.setAttribute('stroke-dasharray', '0.2,5');
        }
        else if(line_style=="dashdot"){
            path.setAttribute('stroke-dasharray', '3,5,0.2,5');
            svglegendline.setAttribute('stroke-dasharray', '3,5,0.2,5');

        }
        else if(line_style=="spaced-dot"){
            path.setAttribute('stroke-dasharray', '0.2,8');
            svglegendline.setAttribute('stroke-dasharray', '0.2,8');
        }
        else if(line_style=="spaced-dash"){
            path.setAttribute('stroke-dasharray', '4,8');
            svglegendline.setAttribute('stroke-dasharray', '4,8');
        }
        else if(line_style=="long-dash"){
            path.setAttribute('stroke-dasharray', '8,8');
            svglegendline.setAttribute('stroke-dasharray', '8,8');
        }
        

        if(legend_visible){
            mainsvg.appendChild(svglegendline);
        }

        
        minval_final_fill_point = " " + width - padding + "," + h_base_graph + " ";
        
        zeroline_final_fill_point=" " + width - padding + "," + zeroval+ " ";
        maxval_final_fill_point=" " + width - padding + "," + y2+ " ";

        polylinepoints_fillsvg = dval_fill + " L "+minval_final_fill_point +" L " + padding + "," + h_base_graph + " Z " ;

        zerolinepoints_fillsvg = dval_fill + " L "+  zeroline_final_fill_point + " L "+padding+","+ zeroval + " Z " ;

        maxlinepoints_fillsvg = dval_fill+ " L "+maxval_final_fill_point + " L " + padding + "," + y2 + " Z " ;


        //make path fill
        const dval_fill_path=document.createElementNS('http://www.w3.org/2000/svg', 'path');
        
        dval_fill_path.setAttribute('stroke', 'none');
        dval_fill_path.setAttribute('stroke-width', line_width);
        dval_fill_path.setAttribute('fill', line_fill);
 

        dval_fill_path.setAttribute('id', 'dval_fill_path'+dataindex);
        if(line_fillstyle=="from-min"){
            dval_fill_path.setAttribute('d', polylinepoints_fillsvg);
            //dval_fill_path.push([polylinepoints,polylinepointssvg,polylinepoints_fillsvg]);
        }
        else if(line_fillstyle=="from-zero"){
            dval_fill_path.setAttribute('d', zerolinepoints_fillsvg);
          //  polylinesset.push([polylinepoints,polylinepointssvg,zerolinepoints_fillsvg]);
        }
        else if(line_fillstyle=="from-max"){
            dval_fill_path.setAttribute('d', maxlinepoints_fillsvg);
           // polylinesset.push([polylinepoints,polylinepointssvg,maxlinepoints_fillsvg]);
        }

        mainsvg.appendChild(dval_fill_path);
        mainsvg.appendChild(path);



    }

    element.appendChild(mainsvg);


}

