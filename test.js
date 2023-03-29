
data={
    x:[1,2,3,4,5,6,7,8],
    y:[23,14,15,17,21,20,17,16],
    name:"bez",
    line:{
        color:"#69f56e",
        width:3,
        fill:"",
        fill_style:"from-min",
        style:"dotted",
        tension:0.2
    },
    marker:{
        size:4,
        color:"#69f56e",
        fill:"#69f56e44",
        visible:true
    }
};

sprngcolors=["#69f56e","#f56969","#f56e69","#69f569","#6969f5","#f569f5","#69f5f5","#faf"];
data1={
    x:[1,2,3,4,5,6,7,8],
    y:[20,24,25,17,-7,-4,6,13],
    name:"chelsea",
    line:{
        color:"#695FE6",
        width:3,
        fill:"#695fe655",
        fill_style:"from-zero",
        style:"solid"
    },
    marker:{
        size:5,
        color:"#695FE6",
        fill:"#695fe644",
        visible:false
    }
};
data2={
    x:[1,2,3,4,5,6,7,8],
    y:[20,24,25,17,7,4,6,13],
    name:"bar",
    bar:{
        fill:sprngcolors,
        stroke:"#000",
        stroke_width:0,
        border_radius:2,
        fill_style:"from-zero",
    }
}

  
data3={
    x:[1,2,3,4,5,6,7,8],
    y:[10,24,35,21,-9,14,6,23],
    name:"bar",
    bar:{
        fill:"#f5f9",
        stroke:"#f5f",
        stroke_width:2,
        stroke_style:"dashed",
        width:20,
        border_radius:1,
        fill_style:"from-zero",
    }
}
data_flyer={
    x:[10,11,12],
    y:[750,1500,2550],
    name: "Flyers",
    line:{
        color:"#f6bf44",
        width:3,
        fill:"",
       
    },
    marker:{
        size:4,
        color:"#f6bf44",
        fill:"#f6bf4444",
        visible:true
    }
}
data_cost={
    x:[10,11,12],
    y:[263,60,849],
    name: "Cost",
    line:{
        color:"#e9612c",
        width:3,
        fill:"",
        tension:0.2
    },
    marker:{
        size:4,
        color:"#e9612c",
        fill:"#e9612c44",
        visible:true
    }
}
data_clicks={
    x:[10,11,12],
    y:[358,448,1094],
    name: "Clicks",
    line:{
        color:"#eb356f",
        width:3,

    },
    marker:{
        size:4,
        color:"#eb356f",
        fill:"#eb356f44",
        visible:true
    }
}
data_installs={
    x:[10,11,12],
    y:[56, 87, 196],
    name: "Installs",
    line:{
        color:"#7844e3",
        width:3,

    },
    marker:{
        size:4,
        color:"#7844e3",
        fill:"#7844e344",
        visible:true
    }
}
data_new_users={
    x:[10,11,12],
    y:[758, 1000, 2550],
    name: "New Users",
    line:{
        color:"#69f56e",
        width:3,
        fill:"",
        fill_style:"from-min",
        style:"dotted",
        tension:0.2
    },
    marker:{
        size:4,
        color:"#69f56e",
        fill:"#69f56e44",
        visible:true
    }
}

data_homemeal=[data_flyer,data_cost,data_clicks,data_installs,data_new_users]

datasetbar=[data2]
dataset=[data1,data]

layout={
    width:1000,
    height:500,
    padding:80,
    styles:"border-radius:10px; background-color:#fafafa; padding:30px; border:1px solid #ccc; ",
    bgcolor:'#ffffff',
    title:{text:'Test Graph',font_size:34,font_family:'Montserrat',color:'#000000',font_weight:'bold'},

    xaxes:{
        title:{text:'X-axis',fontfamily:"Montserrat"},
        visible:false,
        stroke_width:"0.1px",
        stroke:"#000000",
        style:"solid"
    }
    ,
    yaxes:{
        title:{text:'',fontfamily:"Montserrat"},
        no_parts:5,
        domain:[0,2600],
        style: "solid",
        stroke:'#000000',
        stroke_width:"0.1px",
        visible:true
    },

    xlabels:{
        labels:['1','2','3','4','5','6','7','8','9','10'],
        visible:false,
        font_family:"Montserrat",
        font_size:12,
        font_weight:"bold",
    },
    ylabels:{
        visible:true,
        font_family:"Montserrat",
        font_size:12,
        font_weight:"bold",
    },
    legend:{
        visible:true,
        position:"top-right",
        font_family:"Montserrat",
        font_size:12,
        font_weight:"bold",
        padding:5,
    }
};


layoutbar={
    width:1000,
    height:500,
    padding:80,
    styles:"border-radius:10px; background-color:#fafafa; padding:30px; border:1px solid #ccc; ",
    bgcolor:'#ffffff',
    title:{text:'Test Graph',font_size:34,font_family:'Montserrat',color:'#000000',font_weight:'bold'},

    xaxes:{
        title:{text:'X-axis',fontfamily:"Montserrat"},
        visible:false,
        stroke_width:"0.1px",
        stroke:"#000000",
        style:"solid"
    }
    ,
    yaxes:{
        title:{text:'',fontfamily:"Montserrat"},
        no_parts:5,
        domain:[-10,40],
        style: "solid",
        stroke:'#000000',
        stroke_width:"0.3px",
        visible:true
    },

    xlabels:{
        labels:['1','2','3','4','5','6','7','8','9','10'],
        visible:false,
        font_family:"Montserrat",
        font_size:12,
        font_weight:"bold",
    },
    ylabels:{
        visible:true,
        font_family:"Montserrat",
        font_size:12,
        font_weight:"bold",
    },
    legend:{
        visible:true,
        position:"top-right",
        font_family:"Montserrat",
        font_size:12,
        font_weight:"bold",
        padding:5,
    }
};

new lineGraph(document.getElementById("container"),data_homemeal,layout);
new barGraph(document.getElementById("container2"),datasetbar,layoutbar);
//new horizontalBarGraph(document.getElementById("container2"),datasetbar,layoutbar);


  