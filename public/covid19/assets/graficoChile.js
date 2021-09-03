/*ciclo vida JWT, sacado de la documentacion, presentacion hito 2
Para obtener un JTW, debemos usar 3 recursos de la API. Para esto llamamos al JWT
en el header, con el fin de ingresar a los datos protegidos

el formato JWT se basa en tres partes:
Header (tipo token y algotirmo) 
Payload (el cuerpo del mensaje compuesto de 3 Claims: Registered, Public y Private Claim Names)
Firma (clave privada digital) 
= token completo
*/
const getDataConfirmed = async(jwt) =>{
    try{//señala un bloque de instrucciones a intentar
        const response = await fetch("http://localhost:3000/api/confirmed", {
            method:"GET", //para obtener un valor
            headers:{//parte del token
                Authorization: `Bearer ${jwt}`//bearer: formato que nos permite la autorización en conjunto con la autenticación de usuarios.
            }
        });
        const {data} = await response.json();
        return data;
    }
    catch(err){//catch: especifica una respuesta si se produce una excepción 
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

const graficoChile = (primerDato, segundoDato, tercerDato) =>{
    let confirmedChile = [];
    primerDato.forEach(element => {//forEach: estructura especializada en recorrer elemento indicado o todos los elementos de un array
        confirmedChile.push({x: new Date(element.date), y:element.total}) //el "x" esto proviene de la misma grafica de lineas en canvas
    });
    
    let deathsChile = [];
    segundoDato.forEach(element => {
        deathsChile.push({x: new Date(element.date), y:element.total})
    });

    let recoveredChile = [];
    tercerDato.forEach(element => {
        if(element.total > 0){//cuando el dato llega a cero, se corta la linea pero no decae
            recoveredChile.push({x: new Date(element.date), y:element.total})
        }
    });
    
    var chart = new CanvasJS.Chart("chartContainerChile", {
        title: {

        },
        axisX: {
            valueFormatString: "MMM YYYY"
        },
        axisY2: {
            //title: "Casos Recuperados"  
        },
        toolTip: {
            shared: true
        },
        legend: {
            cursor: "pointer",
            verticalAlign: "top",
            //horizontalAlign: "center",
            //dockInsidePlotArea: true,
            itemclick: toogleDataSeries
        },
        data: [{
            type:"line",
            axisYType: "primary",
            name: "Casos confirmados",
            showInLegend: true,
            markerSize: 0,
            yValueFormatString: "#,### personas",
            dataPoints: confirmedChile
        },
        {
            type: "line",
            axisYType: "secondary",
            name: "Casos Muertos",
            showInLegend: true,
            markerSize: 0,
            yValueFormatString: "#,### personas",
            dataPoints: deathsChile
        },
        {
            type: "line",
            axisYType: "primary",
            name: "Casos Recuperados",
            showInLegend: true,
            markerSize: 0,
            yValueFormatString: "#,### personas",
            dataPoints: recoveredChile
        }]
    });
    document.querySelector("#loader").style.display="none";//se le da el estilo que se oculte cuando se visualice el grafico
    chart.render();
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
    const token = localStorage.getItem(`jwt-token`)//del token, para mandar a llamar en del local
    const confirmadosChile = await getDataConfirmed(token); // await: utilizado para esperar una promesa de la funcion asincronica
    const muertesChile = await getDataDeaths(token);
    const recuperadosChile = await getDataRecovered(token);
    graficoChile(confirmadosChile, muertesChile, recuperadosChile);
})();