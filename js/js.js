var y = 10; // altura inicial y0=10%, debe leerse al iniciar si queremos que tenga alturas diferentes dependiendo del dispositivo
var v = 0;
var g = 1.622;
var a = g;
var dt = 0.016683;
var timer=null;
var timerFuel=null;
var fuel=100;

//al cargar por completo la página...
window.onload = function(){
	//definición de eventos
	//mostrar menú móvil ocultando el panel de control
    	document.getElementById("showm").onclick = function () {
		document.getElementsByClassName("div-dcha")[0].style.display = "block";
		document.getElementById("cpanel").style.display = "none";
		stop();
	}
	//ocultar menú móvil haciendo reaparecer el panel
		document.getElementById("hidem").onclick = function () {
		document.getElementsByClassName("div-dcha")[0].style.display = "none";
		document.getElementById("cpanel").style.display = "block";
		start();
	}
	//encender/apagar el motor al hacer click en la pantalla
	document.onclick = function () {
 	  if (a==g){
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
	
	//mover hasta que top sea un 70% de la pantalla
	if (y<70){ 
		document.getElementById("nave").style.top = y+"%"; 
	} else { 
		stop();Alunizado();
	}
}
function motorOn(){
	a=-g;
	if (timerFuel==null)
	timerFuel=setInterval(function(){ actualizarFuel(); }, 12);
	document.getElementById("img-nave").src="img/nave-encendida1.png";
}
function motorOff(){
	a=g;
	clearInterval(timerFuel);
	timerFuel=null;
	document.getElementById("img-nave").src="img/nave.png";
}
function actualizarFuel(){
	//Aquí hay que cambiar el valor del marcador de Fuel...
	fuel-=0.1;
	document.getElementById("fuel").innerHTML=fuel;	
}

function Alunizado(){
	if (v<=3){
		alert("\n¡¡FELICIDADES!!\n\n\Has alunizado con éxito\n");
	}
	else
	{
		document.getElementById("img-nave").src="img/explosion.png";
	}	
}

function paraJuego()
{
	motorOff();
	document.onkeydown = null ;
	document.onkeyup = null;	
}

