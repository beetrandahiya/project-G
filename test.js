
data={
    x:[1,2,3,4,5,6,7,8],
    y:[23,14,15,17,21,20,17,16],
    name:"bez",
    line:{
        color:"#69f56e",
        width:3,
        //fill:"#fff5cc",
        fillstyle:"from-min",
        style:"dotted"
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
    y:[20,24,25,17,12,14,13,16],
    name:"chelsea",
    line:{
        color:"#695FE6",
        width:3,
        //fill:"#fff5cc",
        fill_style:"from-min",
        style:"solid"
    },
    marker:{
        size:0,
        color:"#695FE6",
        fill:"#695fe644",
        visible:true
    }
};
data=[data,data1]

layout={
    width:800,
    height:400,
    padding:80,
    styles:"border-radius:10px; background-color:#eee; padding:30px;",
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
        domain:[10,30],
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

new lineGraph(document.getElementById("container"),data,layout);