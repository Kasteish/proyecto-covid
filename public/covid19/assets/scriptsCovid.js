const grafico = () =>{
    fetch(`http://localhost:3000/api/total`)
    .then(response =>{
        return response.json();
    })
    .then(myJson =>{
        let {data} = myJson;//el data es porque integra todos los datos por caracteristicas
        let casosConfirmados = data.filter(element =>{
            return element.confirmed > 1500000; //valores provenientes de la API, para que se muestre en el grafico
        })
        let confirmed = [];//el arreglo vacio de confirmed proveniente de data
        casosConfirmados.forEach(element => {//recorre el element que contiene confirmed
            confirmed.push({//para subir la informacion en el grafico
                y:element.confirmed, label:element.location
            });
            //return confirmed;
        })//de aqui hasta linea 90, proviene del grafico elegido en canvas.
        const muertos = casosConfirmados.map((element) => ({
            y:element.deaths, label:element.location
        }))
        
        const tabla = casosConfirmados.map((element) => //esto se agrego para mostrar la tabla en el HTML y ocpuando la variable
        `<tr>
            <td>${element.location}</td>
            <td>${element.confirmed}</td>
            <td>${element.deaths}</td>
            <td><button type="button" class="btn btn-warning">Ver detalles</button></td>
        </tr>`
        ).join("")

        document.querySelector("#tablaDatos tbody").innerHTML = tabla
        
        var chart = new CanvasJS.Chart("chartContainer", {
            animationEnabled: true,
            title:{
               
            },
            axisX:{
                labelAngle: -30,
                interval: 1
            },	
            axisY: {
                //title: "Casos confirmados",
                titleFontColor: "#4F81BC",
                lineColor: "#4F81BC",
                labelFontColor: "#4F81BC",
                tickColor: "#4F81BC"
            },
            axisY2: {
                //title: "Casos muertos",
                titleFontColor: "#C0504E",
                lineColor: "#C0504E",
                labelFontColor: "#C0504E",
                tickColor: "#C0504E"
            },	
            toolTip: {
                shared: true
            },
            legend: {
                cursor:"pointer",
                verticalAlign: "top",
                itemclick: toggleDataSeries
            },
            data: [{
                type: "column",
                name: "Casos confirmados",
                legendText: "Casos confirmados",
                showInLegend: true, 
                dataPoints: confirmed //se borro lo que contenia aqui, y se reemplaza por el arreglo data del json
            },
            {
                type: "column",	
                name: "Casos muertos",
                legendText: "Casos muertos",
                axisYType: "secondary",
                showInLegend: true,
                dataPoints: muertos//del death, proveniente del arreglo data, en el json
            }]
        });
        chart.render();

        function toggleDataSeries(e) {
            if (typeof(e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
                e.dataSeries.visible = false;
            }
            else {
                e.dataSeries.visible = true;
            }
            chart.render();
        }
    })
};



const initPandemia = (async () =>{
    grafico();
})();