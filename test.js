
data={
    x:[1,2,3,4,5,6,7,8],
    y:[15,14,15,17,21,20,17,16],
    name:"bez",
    line:{
        color:"#ffcc00",
        width:2,
        fill:"#fff5cc"   ,
        fillstyle:"from-min",
        style:"solid"
    },
    marker:{
        size:0,
        color:"#fff",
        fill:"#fff"
    }
};
data=[data]

layout={
    width:800,
    height:400,
    padding:60,
    styles:"border-radius:10px",
    bgcolor:'#ffffff',
    title:{text:'Test Graph',fontsize:24,fontfamily:'Montserrat',fontcolor:'#000000'},

    xaxis:{
        title:{text:'X-axis',fontfamily:"Montserrat"},
        visible:false,
        stroke_width:"0.5px",
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
        stroke_width:"0.5px",
        visible:true
    },

    xlabel:{
        labels:['1','2','3','4','5','6','7','8','9','10'],
        visible:false
    },
    ylabel:{
        visible:true
    },
    legend:{
        visible:true,
        position:"top-right"
    }
};

new lineGraph(document.getElementById("container"),data,layout);