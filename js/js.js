var y = 10; // altura inicial y0=10%, debe leerse al iniciar si queremos que tenga alturas diferentes dependiendo del dispositivo
var v = 0;
var g = 1.622;
var a = g;
var dt = 0.016683;
var timer=null;
var timerFuel=null;
var fuel=100;
var hayfuel=true
//al cargar por completo la página...
window.onload = function(){
	//definición de eventos
	//mostrar menú móvil
	// Aquí el div-dcha pasa de none a block, mostrándose en pantalla, y se aplica none al div del panel al hacer click en el div showm
    	document.getElementById("showm").onclick = function () {
		document.getElementsByClassName("div-dcha")[0].style.display = "block";
		document.getElementById("cpanel").style.display = "none";
		stop();
	}
	//ocultar menú móvil
	// Aquí invertimos las funciones anteriores al hacer click sobre el div hidem, que alterna con showm
		document.getElementById("hidem").onclick = function () {
		document.getElementsByClassName("div-dcha")[0].style.display = "none";
		document.getElementById("cpanel").style.display = "block";
		start();
	}
	//cambiamos onlick por onkeypress para que el motor arranque/apague al pulsar una tecla y
	// evitamos que la nave pueda encenderse si no tiene fuel
	document.onkeypress = function () {
 	  if (a==g){
		  if (hayfuel=true)
  		motorOn();
 	  } else {
  		motorOff();
 	  }
	}
	//encender/apagar al apretar/soltar una tecla
	document.onkeydown = motorOn;
	document.onkeyup = motorOff;
	
	//Empezar a mover nave
	start();
}

//Definición de funciones
function start(){
	timer=setInterval(function(){ moverNave(); }, dt*1000);
}

function stop(){
	clearInterval(timer);
}

function moverNave(){
	v +=a*dt;
	document.getElementById("velocidad").innerHTML=v;
	y +=v*dt;
	document.getElementById("altura").innerHTML=y;
	
	//Aquí añadimos la función de alunizaje para que cuando la nave llegue al final del recorrido 
	if (y<70){ 
		document.getElementById("nave").style.top = y+"%"; 
	} else { 
		stop();Alunizado();
	}
}
// Aquí enlazamos la imagen de la nave encendida al identificador del elemento img (nuestra nave) y variamos el valor del tanque de gasolina
function motorOn(){
	a=-g;
	if (timerFuel==null)
	timerFuel=setInterval(function(){ actualizarFuel(); }, 8);
	document.getElementById("img-nave").src="img/nave-encendida1.png";
}

function motorOff(){
	a=g;
	clearInterval(timerFuel);
	timerFuel=null;
	document.getElementById("img-nave").src="img/nave.png";
}
function actualizarFuel(){
	//Establecemos que si el fuel es igual o menor de 0, se aplica funcion parar juego y "hayfuel" se declara falso
	fuel-=0.1;
	document.getElementById("fuel").innerHTML=fuel;	
	if (fuel<=0) {
		paraJuego()
		hayfuel=false
	}
}
// Creamos la función de alunizar. Si la velocidad es menor de 3 se muestra un alert de éxito, si es mayor la imagen de la nave cambia a explosión.  
function Alunizado(){
	if (v<=3){
		alert("\n¡¡FELICIDADES!!\n\n\Has alunizado con éxito\n");
	}
	else
	{
		document.getElementById("img-nave").src="img/explosion.png";
	}	
}
// Creamos la función que deshabilita los controles y muestra el motor apagado 
function paraJuego()
{
	motorOff();
	document.onkeydown = null ;
	document.onkeyup = null;
	document.onkeypress = null	
}

