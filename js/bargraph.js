
function newBarGraph(containerDOM, graphData, layout) {


    
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
    colorindex=0;



    for (dataindex = 0; dataindex < graphData.length; dataindex++) {



        var data = graphData[dataindex];
        var data_x = data.x;
        var data_y = data.y;
        var colors= data.colors;
        var data_name = data.name ?? "trace " + dataindex;
        var data_visible = data.visible ?? true;
        if (data_visible == false) {
            continue;
        };

        var width_percent = data.bar.width??50;
        var borderradius = data.bar.borderradius??2;
        var bar_stroke=data.bar.stroke??"none";

        
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
            ylbl.innerHTML = Math.round((y_max - y_min) * (i / y_axis_no_parts) + y_min);
            if (y_axis_label_visible) {
                mainsvg.appendChild(ylbl);
            }
            if (y_axis_visible) {
                mainsvg.appendChild(ygridstr);
            }


        }


        for (i = 0; i <= data_x.length - 1; i++) {
            
            
            w0=(width-2*padding)/data_y.length;
            wp=w0*width_percent/100;

            const xgridstr = document.createElementNS('http://www.w3.org/2000/svg','line');
            xgridstr.setAttribute('x1', padding + w0 * i);
            xgridstr.setAttribute('x2', padding + w0 * i);
            xgridstr.setAttribute('y1', padding);
            xgridstr.setAttribute('y2', height-padding);
            xgridstr.setAttribute('stroke', x_axis_stroke);
            xgridstr.setAttribute('stroke-width', x_axis_stroke_width);

            const xlbl = document.createElementNS('http://www.w3.org/2000/svg', 'text');
            xlbl.setAttribute('x', padding+w0*i+(w0/2));
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
            if(x_axis_visible){
                mainsvg.appendChild(xgridstr);
            }

            y1 = height - padding;
            y2 = padding;

            yval = ((data_y[i] - y_min) * (h_graph) / (y_max - y_min));
            zeroval = ((0 - y_min) * (h_graph) / (y_max - y_min));
            
            xval= padding+w0*i+(w0/2)-wp/2;
            const bar = document.createElementNS("http://www.w3.org/2000/svg","rect");
            bar.setAttribute("x",xval);
            if(yval-zeroval<0){
                bar.setAttribute("y",height-padding-zeroval);
                bar.setAttribute("height",zeroval-yval);
            }
            else{
                bar.setAttribute("y",height-padding-yval);
                bar.setAttribute("height",yval-zeroval);
            }
            
            bar.setAttribute("width",wp);
            //console.log(yval-zeroval);
            
            
            bar.setAttribute("fill",colors[colorindex]);
            bar.setAttribute("stroke",bar_stroke);
            bar.setAttribute("rx",borderradius);
            mainsvg.appendChild(bar);
            
            if(colorindex<colors.length-1){
                colorindex++;
            }
            else{
                colorindex=0;
            }

           
        }


         
        ////////////////////////////////////////////////////////////////////////////////
        ////////////////////////////////////////////////////////////////////////////////


        


        



    }

    element.appendChild(mainsvg);


}

