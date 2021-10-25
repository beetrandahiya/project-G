function newDonutGraph(containerDOM, graphData, layout) {


    element = document.getElementById(containerDOM);

    /////////////////////////////////////////////
    height = layout.height;
    width = layout.width;
    padding = layout.padding;
    bgcolor = layout.bgcolor??'#fff';

    /////////////////////////////////////////////

    title = layout.title??{};
    title_font_color = layout.title.fontcolor??'#000';
    title_font_size = layout.title.fontsize??'20px';
    title_font_family = layout.title.fontfamily??'Arial';
    title_font_weight = layout.title.fontweight??'bold';


    /////////////////////////////////////////////

    legend = layout.legend??{};

    legend_visible = layout.legend.visible??true;
    legend_position = layout.legend.position??"top-right";
    legend_font_size = layout.legend.fontsize??12;
    legend_font_color = layout.legend.fontcolor??"rgba(0,0,0,0.5)";
    legend_font_family = layout.legend.fontfamily??"sans-serif";
    legend_font_weight = layout.legend.fontweight??"normal";
    legend_padding = layout.legend.padding??10;

    /////////////////////////////////////////////





    h_graph = height - 2 * padding;
    h_base_graph = height - padding;
    const mainsvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    mainsvg.setAttributeNS(null, "width", width);
    mainsvg.setAttributeNS(null, "height", height);
    mainsvg.setAttributeNS(null, "style", "background:" + bgcolor);




    ///////////////////////////////////////////////
    //here we make chart title

    titlesvg = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    titlesvg.setAttributeNS(null, "x", width / 2);
    titlesvg.setAttributeNS(null, "y", padding / 2);
    titlesvg.setAttributeNS(null, "fill", title_font_color);
    titlesvg.setAttributeNS(null, "font-size", title_font_size);
    titlesvg.setAttributeNS(null, "font-family", title_font_family);
    titlesvg.setAttributeNS(null, "font-weight", title_font_weight);
    titlesvg.setAttributeNS(null, "text-anchor", "middle");
    titlesvg.innerHTML = title.text;
    mainsvg.appendChild(titlesvg);






    for (dataindex = 0; dataindex < graphData.length; dataindex++) {



        var data = graphData[dataindex];
        var data_x = data.x;
        var data_y = data.y;
        var names = data.names??data_x;
        var colors = data.colors;
        var data_name = data.name??"trace " + dataindex;
        var data_visible = data.visible??true;
        if (data_visible == false) {
            continue;
        };

        ynet = data_y.reduce((a, b) => a + b, 0)

        var line = data.line;
        var donut = data.donut??{};
        var line_color = line.color??"#fff";
        var line_width = line.width??2;
        var line_style = line.style??"solid";
        var line_linecap = line.linecap??"round";
        var line_linejoin = line.linejoin??"round";



        var animationtrue = data.animation??true;


        ///////////////////////////////////////////////



        
        var r1 = donut.radius1??(width - 2 * padding) / 4;
        var r2 = donut.radius2??(width - 2 * padding) / 3;
        rotation = 0;
        startx1 = width / 2;
        starty1 = (height / 2) - r1;
        startx2 = width / 2;
        starty2 = (height / 2) - r2;
        Δ = 0;

        for (i = 0; i <= data_x.length - 1; i++) {


            arcpath = document.createElementNS("http://www.w3.org/2000/svg", "path");
            Δo = data_y[i] * 2 * Math.PI / ynet;
            Δ = Δ + data_y[i] * 2 * Math.PI / ynet;
            endx1 = width / 2 + r1 * Math.sin(Δ);
            endy1 = height / 2 - r1 * Math.cos(Δ);
            endx2 = width / 2 + r2 * Math.sin(Δ);
            endy2 = height / 2 - r2 * Math.cos(Δ);


            fA = ((Δo > Math.PI) ? 1 : 0);
            fS = ((Δo > 0) ? 1 : 0);

            pathtext = "M " +startx1 + " " + starty1 + " L " + startx2 + " " + starty2 + " A " + r2 + " " + r2 + " " + rotation + " " + fA + " " + fS + " " + endx2 + " " + endy2 + " L "+ endx1+" "+endy1;
            Δo=-Δo;
            fA = ((Δo > Math.PI) ? 1 : 0);
            fS = ((Δo > 0) ? 1 : 0);
            pathtextback=" A " + r1 + " " + r1 + " " + rotation + " " + fA + " " + fS + " " + startx1 + " " + starty1;
            pathtext=pathtext+pathtextback;
            arcpath.setAttribute("d", pathtext);
            arcpath.setAttribute("stroke", line_color);
            arcpath.setAttribute("stroke-width", 2);
            arcpath.setAttribute("fill", colors[i]);
            arcpath.setAttribute("class", "arc");
            //arcpath.addEventListener("mouseover", showTooltip);
            //arcpath.addEventListener("mouseout", hideTooltip);
            mainsvg.appendChild(arcpath);
            starty1 = endy1;
            startx1 = endx1;
            starty2 = endy2;
            startx2 = endx2;


        }

 

        ///////////////////////////////////////////////



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

