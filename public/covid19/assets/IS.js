/*Selecciono el id del nav, con el evento click, dentro de un arrow function.
Donde se enlaza el id del form para mostrarlo como modal*/
$("#iniciarSesion").click(() =>{
    $("#sesionModal").modal("show");
    //console.log("aqui")
});

/*En lo siguiente, buscamos en el html, el id del botom donde al hacer click
subiremos la informacion al JWT, para ver si se valida o no*/
$("#buttonAceptar").click(async() =>{
    const email = document.getElementById("exampleInputEmail1").value;
    const clave = document.getElementById("exampleInputPassword1").value;
    if((email === "") || (clave === "")){
        alert("ERROR: Debes completar la informacion requerida");
    } else if ((clave != "secret")){
        alert("Contraseña invalida");
    } else{
        const JWT = await postData(email, clave);
        toggleNav(); //el toggle muestra y/o oculta informacion, en este caso seria del NarBar
        $(".modal").modal("hide"); //¿?
    }
});

/*Evento click, cerrar sesión del navbar, para ocultar esta con situaciones chile
y mostrar las del inicio correspondientes*/
$("#cerrarSesion").click(() =>{
    $("iniciarSesion").toggle();
    $("situacionChile").toggle();
    $("cerrarSesion").toggle();

    localStorage.clear(); //elimina los datos alamcenados en el localStorage
    window.location.href = `./public/covid19/indexCovid.html`;
});
const toggleNav = () =>{
    $("iniciarSesion").toggle();
    $("situacionChile").toggle();
    $("cerrarSesion").toggle();    
};

/*Esto aparece en la documentacion, presentacion hito 2, de la linea 41 hasta la 52
Para obtener el JWT */
const postData = async (email,password) => {
    try {const response = await fetch('http://localhost:3000/api/login',
        {method:'POST',
        body: JSON.stringify({email:email,password:password})})
        
        const { token } = await response.json();
        localStorage.setItem("jwt-token",token); //setItem alamcena la informacion en el localStorage
        return token;
    }catch (err) {
        console.log(`Error: ${err}`);
    }
}
/*Aqui sigue un IIFE*/
const init = ((async =>{
    const token = localStorage.getItem("jwt-token"); //getItem permite obtener un valor del localStorage
    if(token){
        toggleNav();
    }
}))();