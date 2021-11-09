function newPieGraph(containerDOM, graphData, layout) {


    element = document.getElementById(containerDOM);

    /////////////////////////////////////////////
    height = layout.height;
    width = layout.width;
    padding = layout.padding;
    bgcolor = layout.bgcolor??'#fff';
    styles= layout.styles??{};

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
    mainsvg.setAttributeNS(null, "style", "background:" + bgcolor+"; "+styles);




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
        var pie = data.pie??{};
        var line_color = line.color??"#fff";
        var line_width = line.width??2;
        var line_style = line.style??"solid";
        var line_linecap = line.linecap??"round";
        var line_linejoin = line.linejoin??"round";



        var animationtrue = data.animation??true;


        ///////////////////////////////////////////////



        startx = width / 2;
        var r = pie.radius??(width - 2 * padding) / 3;
        rotation = 0;
        starty = (height / 2) - r;
        Δ = 0;

        for (i = 0; i <= data_x.length - 1; i++) {


            arcpath = document.createElementNS("http://www.w3.org/2000/svg", "path");
            Δo = data_y[i] * 2 * Math.PI / ynet;
            Δ = Δ + data_y[i] * 2 * Math.PI / ynet;
            endx = width / 2 + r * Math.sin(Δ);
            endy = height / 2 - r * Math.cos(Δ);


            const fA = ((Δo > Math.PI) ? 1 : 0);
            const fS = ((Δo > 0) ? 1 : 0);

            pathtext = "M " + width / 2 + " " + height / 2 + " L " + startx + " " + starty + " A " + r + " " + r + " " + rotation + " " + fA + " " + fS + " " + endx + " " + endy + " z";
            arcpath.setAttribute("d", pathtext);
            arcpath.setAttribute("stroke", line_color);
            arcpath.setAttribute("stroke-width", line_width);
            arcpath.setAttribute("fill", colors[i]);
            arcpath.setAttribute("class", "arc");
            //arcpath.addEventListener("mouseover", showTooltip);
            //arcpath.addEventListener("mouseout", hideTooltip);
            mainsvg.appendChild(arcpath);
            starty = endy;
            startx = endx;


        }

        ///////////////////////////////////////////////

/*


        tooltipgrp = document.createElementNS("http://www.w3.org/2000/svg", "g");
        tooltiptext = document.createElementNS("http://www.w3.org/2000/svg", "text");
        tooltiprect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
        tooltiptext.setAttribute("x", "4");
        tooltiptext.setAttribute("y", "15");
        tooltiprect.setAttribute("x", "0");
        tooltiprect.setAttribute("y", "0");
        tooltiptext.setAttribute("text-anchor", "middle");
        tooltiprect.setAttribute("width", "80");
        tooltiprect.setAttribute("height", "20");
        tooltiprect.setAttribute("fill", "#fff");
        tooltiprect.setAttribute("rx", "3");
        tooltiprect.setAttribute("ry", "3");
        tooltiptext.innerHTML = " ";
        tooltipgrp.setAttribute("visibilty", "hidden");
        tooltipgrp.setAttribute("id", "tooltip");
        tooltipgrp.appendChild(tooltiprect);
        tooltipgrp.appendChild(tooltiptext);
        console.log(tooltipgrp);
        mainsvg.appendChild(tooltipgrp)

        tooltip = document.getElementById("tooltip");
        console.log(tooltip);
        triggers = document.getElementsByClassName('arc');
        j = 0;
        while (j < triggers.length) {
            console.log("done");
            triggers[j].addEventListener('mousemove', showTooltip);
            triggers[j].addEventListener('mouseout', hideTooltip);
            j++;
        }

        console.log(triggers);


        
function showTooltip(evt) {
    var CTM = mainsvg.getScreenCTM();
    var mouseX = (evt.clientX - CTM.e) / CTM.a;
    var mouseY = (evt.clientY - CTM.f) / CTM.d;
    var x = (evt.clientX - CTM.e + 6) / CTM.a;
    var y = (evt.clientY - CTM.f + 20) / CTM.d;
    tooltip.setAttributeNS(null, "transform", "translate(" + x + " " + y + ")");
    tooltip.setAttributeNS(null, "visibility", "visible");
    var tooltipText = tooltip.getElementsByTagName('text')[0];
    tooltipText.firstChild.data = evt.target.getAttributeNS(null, "title");
    var tooltipRects = tooltip.getElementsByTagName('rect');
    var length = tooltipText.getComputedTextLength();
    tooltipText.setAttribute("x",length/2+4)
    tooltipText.setAttribute("fill","white")
    tooltipText.setAttribute("font-family","Open Sans")
    for (var i = 0; i < tooltipRects.length; i++) {
      tooltipRects[i].setAttributeNS(null, "width", length + 8);
      tooltipRects[i].setAttribute("fill","rgba(0,0,0,0.6)")
      tooltipRects[i].setAttribute("stroke-width","2")
    }
    console.log(tooltipText.getComputedTextLength());
  }
  function hideTooltip() {
    tooltip.setAttributeNS(null, "visibility", "hidden");
  }
*/

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

