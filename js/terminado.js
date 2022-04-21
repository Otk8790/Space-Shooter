var Terminado = {

preload: function(){

},

create: function(){
		juego.stage.backgroundColor = "990000";
		if(confirm("Has perdido,¿Desea reiniciar?"))
		juego.state.start("Juego");
},

iniciar: function(){

}
};
