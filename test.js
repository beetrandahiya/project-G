
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

data1={
    x:[1,2,3,4,5,6,7,8],
    y:[20,24,25,17,-7,-4,6,13],
    name:"chelsea",
    line:{
        color:"#695FE6",
        width:0,
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
        fill:"#695f6e",
        stroke:"#000",
        stroke_width:0,
        border_radius:5,
        fill_style:"from-min",
    }
}
data3={
    x:[1,2,3,4,5,6,7,8],
    y:[10,24,35,21,-9,14,6,23],
    name:"bar",
    bar:{
        fill:"#f5f9",
        stroke:"#000",
        stroke_width:2,
        stroke_style:"dashed",
        width:20,
        border_radius:10,
        fill_style:"from-min",
    }
}
datasetbar=[data2,data3]
dataset=[data1,data]

layout={
    width:1000,
    height:500,
    padding:80,
    styles:"border-radius:10px; background-color:#fafafa; padding:30px; border:1px solid #ccc; ",
    bgcolor:'#ffffff',
    title:{text:'Test Graph',font_size:34,font_family:'Montserrat',color:'#000000',font_weight:'bold'},

    xaxis:{
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
        domain:[-10,30],
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

    xaxis:{
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

new scatterGraph(document.getElementById("container"),dataset,layout);
new lineGraph(document.getElementById("container1"),dataset,layout);
new barGraph(document.getElementById("container2"),datasetbar,layoutbar);