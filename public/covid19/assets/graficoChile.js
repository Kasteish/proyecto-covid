/*ciclo vida JWT, sacado de la documentacion, presentacion hito 2
Para obtener un JTW, debemos usar 3 recursos de la API. Para esto llamamos al JWT
en el header, con el fin de ingresar a los datos protegidos*/
const getDataConfirmed = async(jwt) =>{
    try{//¿? recordar
        const response = await fetch("http://localhost:3000/api/confirmed", {
            method:"GET", //para obtener un valor
            headers:{
                Authorization: `Bearer ${jwt}`//bearer: ¿?
            }
        });
        const {data} = await response.json();
        return data;
    }
    catch(err){
        console.log(`Error: ${err}`)
    }
}
const getDataDeaths = async(jwt) =>{
    try{//¿? recordar
        const response = await fetch("http://localhost:3000/api/deaths", {
            method:"GET", //
            headers:{
                Authorization: `Bearer ${jwt}`
            }
        });
        const {data} = await response.json();
        return data;
    }
    catch(err){
        console.log(`Error: ${err}`)
    }
}
const getDataRecovered = async(jwt) =>{
    try{//¿?
        const response = await fetch("http://localhost:3000/api/recovered", {
            method:"GET", //
            headers:{
                Authorization: `Bearer ${jwt}`
            }
        });
        const {data} = await response.json();
        return data;
    }
    catch(err){
        console.log(`Error: ${err}`)
    }
}

const graficoChile = (country) =>{
    fetch(`http://localhost:3000/api/countries/${country}`)
    .then(response =>{
        return response.json();
    })
    .then(myJson =>{
        let {data} = myJson;
        
        var chart = new CanvasJS.Chart("chartContainer", {
            title: {
                text: "House Median Price"
            },
            axisX: {
                valueFormatString: "MMM YYYY"
            },
            axisY2: {
                title: "Median List Price",
               
            },
            toolTip: {
                shared: true
            },
            legend: {
                cursor: "pointer",
                verticalAlign: "top",
                horizontalAlign: "center",
                dockInsidePlotArea: true,
                itemclick: toogleDataSeries
            },
            data: [{
                type:"line",
                //axisYType: "secondary",
                name: "Casos confirmados",
                showInLegend: true,
                markerSize: 0,
                yValueFormatString: "#,###",
                dataPoints: {}
                
            },
            {
                type: "line",
                axisYType: "secondary",
                name: "Casos Muertos",
                showInLegend: true,
                markerSize: 0,
                yValueFormatString: "#,###",
                dataPoints: {}
                
            }]
        });
        chart.render();
    })
}

function toogleDataSeries(e){
    if (typeof(e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
        e.dataSeries.visible = false;
    } else{
        e.dataSeries.visible = true;
    }
    chart.render();
}

const initChile = (async () =>{
    graficoChile();
})();