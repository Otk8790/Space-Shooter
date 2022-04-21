var fondo;
var nave;
var balas;
var tiempoEntreBalas = 350;
var tiempo = 0;
var malos;
var malos1;
var malos2;

var timer;
var timer1;
var timer2;

var puntos;
var txtPuntos;

var vidas;
var txtVidas;

var Juego = {

preload: function(){

		 juego.load.image("nave", "img/nave2.png");
		 juego.load.image("laser", "img/laser.png");
		 juego.load.image("malo", "img/malo1.png");
		 juego.load.image("malo1", "img/malo2.png");
		 juego.load.image("malo2", "img/malo3.png");
		 juego.load.image("fondo", "img/starfield2.jpg");
},

create: function(){
		
		fondo = juego.add.tileSprite(0, 0, 400, 540, "fondo");

		juego.physics.startSystem(Phaser.Physics.ARCADE);

		nave = juego.add.sprite(juego.width/2, 490, "nave");
		nave.anchor.setTo(0.5);
		juego.physics.arcade.enable(nave);

		//Creamos las balas
		balas = juego.add.group();
		balas.enableBody = true;
		balas.setBodyType = Phaser.Physics.ARCADE;
		balas.createMultiple(20, "laser");
		balas.setAll("anchor.x", 0.5);
		balas.setAll("anchor.y", 0.5);
		balas.setAll("checkWorldBounds", true);
		balas.setAll("outOfBoundsKill", true);

		//Creamos los enemigos
		malos = juego.add.group();
		malos.enableBody = true;
		malos.setBodyType = Phaser.Physics.ARCADE;
		malos.createMultiple(20, "malo");
		malos.setAll("anchor.x", 0.5);
		malos.setAll("anchor.y", 0.5);
		malos.setAll("checkWorldBounds", true);
		malos.setAll("outOfBoundsKill", true);

		malos1 = juego.add.group();
		malos1.enableBody = true;
		malos1.setBodyType = Phaser.Physics.ARCADE;
		malos1.createMultiple(20, "malo1");
		malos1.setAll("anchor.x", 0.5);
		malos1.setAll("anchor.y", 0.5);
		malos1.setAll("checkWorldBounds", true);
		malos1.setAll("outOfBoundsKill", true);

		malos2 = juego.add.group();
		malos2.enableBody = true;
		malos2.setBodyType = Phaser.Physics.ARCADE;
		malos2.createMultiple(20, "malo2");
		malos2.setAll("anchor.x", 0.5);
		malos2.setAll("anchor.y", 0.5);
		malos2.setAll("checkWorldBounds", true);
		malos2.setAll("outOfBoundsKill", true);

		//El tiempo donde sale cada asteroide
		timer = juego.time.events.loop(2000, this.crearEnemigo, this);
		timer1 = juego.time.events.loop(2500, this.crearEnemigo1, this);
		timer2 = juego.time.events.loop(3000, this.crearEnemigo2, this);

		//Puntaje
		puntos = 0;
        txtPuntos = juego.add.text(20, 20, "Puntos: ", {font: "14px Arial", fill: "#FFF"}); 
        txtPuntos = juego.add.text(80, 20, "0", {font: "14px Arial", fill: "#FFF"}); 

        //Vida
        vidas = 3;
        txtVidas = juego.add.text(310, 20, "Vidas: ", {font: "14px Arial", fill: "#FFF"}); 
        txtVidas = juego.add.text(360, 20, "3", {font: "14px Arial", fill: "#FFF"});


},

update: function(){

		fondo.tilePosition.y += 1;

		nave.rotation = juego.physics.arcade.angleToPointer(nave) + Math.PI/2;

		if(juego.input.activePointer.isDown)
		{

		this.disparar();
		
		}

		juego.physics.arcade.overlap(balas, malos, this.colision, null, this)
		juego.physics.arcade.overlap(balas, malos1, this.colision1, null, this)
		juego.physics.arcade.overlap(balas, malos2, this.colision2, null, this)
		juego.physics.arcade.overlap(nave, malos, this.colisionNave, null, this)
		juego.physics.arcade.overlap(nave, malos1, this.colisionNave1, null, this)
		juego.physics.arcade.overlap(nave, malos2, this.colisionNave2, null, this)

		malos.forEachAlive(function(m){
         if(m.position.y > 520 && m.position.y < 521){
            m.kill();
            vidas--;
            txtVidas.text = vidas;
        	}
		});

		malos1.forEachAlive(function(m1){
			if(m1.position.y > 520 && m1.position.y < 521){
			m1.kill();
			vidas--;
			txtVidas.text = vidas;
			}
		});

		malos2.forEachAlive(function(m2){
			if(m2.position.y > 520 && m2.position.y < 521){
			m2.kill();
			vidas--;
			txtVidas.text = vidas;
			}
		});

	if(vidas == 0)
	juego.state.start("Terminado");

},

disparar: function(){

		  if(juego.time.now > tiempo && balas.countDead() > 0)
		  {
		  tiempo = juego.time.now + tiempoEntreBalas;

		  var bala = balas.getFirstDead();
		  bala.anchor.setTo(0.5);

		  bala.reset(nave.x, nave.y);

		  bala.rotation = juego.physics.arcade.angleToPointer(bala) + Math.PI/2;

		  juego.physics.arcade.moveToPointer(bala, 200);

 }
},

crearEnemigo: function(){
	var enem = malos.getFirstDead();
	var num = Math.floor(Math.random()*10)+1;
	enem.reset(num*39, 0);
	enem.anchor.setTo(0.5);
	enem.body.velocity.y = 100;
	enem.checkWorldBounds = true;
	enem.outOfBoundsKill = true;
	enem.rotation = juego.physics.arcade.angleToPointer(enem);
},

crearEnemigo1: function(){
	var enem1 = malos1.getFirstDead();
	var num1 = Math.floor(Math.random()*10)+1;
	enem1.reset(num1*39, 0);
	enem1.anchor.setTo(0.5);
	enem1.body.velocity.y = 100;
	enem1.checkWorldBounds = true;
	enem1.outOfBoundsKill = true;
	enem1.rotation = juego.physics.arcade.angleToPointer(enem1);
},

crearEnemigo2: function(){
	var enem2 = malos2.getFirstDead();
	var num2 = Math.floor(Math.random()*10)+1;
	enem2.reset(num2*39, 0);
	enem2.anchor.setTo(0.5);
	enem2.body.velocity.y = 100;
	enem2.checkWorldBounds = true;
	enem2.outOfBoundsKill = true;
	enem2.rotation = juego.physics.arcade.angleToPointer(enem2);
},

colision: function(b, m){
	b.kill();
	m.kill();
	puntos++;
	txtPuntos.text = puntos;


},

colision1: function(b, m1){
	b.kill();
	m1.kill();
	puntos++;
	txtPuntos.text = puntos;
},

colision2: function(b, m2){
	b.kill();
	m2.kill();
	puntos++;
	txtPuntos.text = puntos;
},

colisionNave: function(n, m){
		m.kill();
		vidas--;
        txtVidas.text = vidas;
},

colisionNave1: function(n, m1){
		m1.kill();
		vidas--;
		txtVidas.text = vidas;
},

colisionNave2: function(n, m2){
		m2.kill();
		vidas--;
		txtVidas.text = vidas;
	}

};
