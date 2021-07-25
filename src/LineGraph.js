import React ,{useState,useEffect} from 'react';
import {Line} from "react-chartjs-2";
import numeral from "numeral";
import "./LineGraph.css";

const options={
     legend:{
         display:false,
     },
    elements:{
        point:{
            radius:0,
        },
    },
    maintainAspectRatio:false,
    tooltips:{
        mode:"index",
        intersect:false,
        callbacks:{
            label:function(tooltipItem,data){
                return numeral(tooltipItem.value).format("+0,0");
            },
        },
    },
    scales:{
        xAxes:[
            {
                type:"Time",
                time:{
                    format:"MM/DD/YY",
                    tooltipFormat:"ll",
                },

                
            },
        ],
        yAxes:[
            {
                gridLines:{
                    diaplay:false,
                },
                ticks:{
                    callback:function(value,index,values){
                        return numeral(value).format("0a");
                    },
                },
            },
        ],
    },
}



function LineGraph(casesType="cases") {
    const [data,setData]=useState({});
    

    const buildChartData=(data,casesType="cases")=>{
        const chartData=[];
        let lastDataPoint;
        // data[casesType].forEach((date)=>{
            for(let date in data.cases){
            if(lastDataPoint){
              const newDataPoint={
    x:date,
    y:data['cases'][date]-lastDataPoint,
};
chartData.push(newDataPoint);

            }
            lastDataPoint=data[casesType][date];
        }
        return chartData;
    };
    useEffect(() => {
        const fetchData=async()=>{
        fetch('https://disease.sh/v3/covid-19/historical/all?lastdays=120')
        .then((Response)=>Response.json())
        .then((data)=>{
            const chartData=buildChartData(data,'cases');
            setData(chartData);
            console.log(data);
        });
    };
    fetchData();
},[casesType]);

    
    return (
        <div className="lineGraph">
            {data?.length>0&&(
 <Line
 options={options}
 data={{

     datasets:[{
         backgroundColor:"rgba{204,16,52,0}",
         borderColor:"#CC1034",
         data:data
     }]
 }

 }
 
 />
            )}
           
<h1>I am a graph hii</h1>
        </div>
    )
}

export default LineGraph


// import React,{useState,useEffect} from 'react'
// //import {Line} from "react-chartjs-2";
// function LineGraph() {
//     const [data,setData]=useState({});

//     const buildChartData=(data,casesType='cases')=>{
//         const chartData=[];
//         let lastDataPoint;
//         data[casesType].forEach(date=>{
//         if(lastDataPoint){
//             const newDataPoint={
//                 x:Date,
//                 y:data[casesType][date]-lastDataPoint
//             }
//             chartData.push(newDataPoint)
//         }
//             lastDataPoint=data[casesType][date];
//         })
//         return chartData;
//     }

//     useEffect(() => {
//        fetch('https://disease.sh/v3/covid-19/all')
//        .then((response)=>response.json())
//        .then ((data)=>{
//            console.log(data);
//            const chartData=buildChartData(data);
//            setData(chartData);
//        });
//     }, []);
   
//     return (
//         <div className="lineGraph" >
//             <h1>i am a graph</h1>
//             <Line data={
//                 {
//                     dataSets:[{
//                        data=data
//                     }]
//                 }
//             }
            
//             />
//         </div>
//     )
// }

// export default LineGraph


