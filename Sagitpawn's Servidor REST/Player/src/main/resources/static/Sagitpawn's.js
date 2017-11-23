var playState = {

    //Declaración de variables globales
    bolaON: false,
    turn: true,
    luzbool:false,
    luzbool1:false,
    
    player: undefined,
    jugador1: undefined,
    jugador2: undefined,

    gun: undefined,
    bullet: undefined,
    //Creamos una segunda bala para facilitar la gestión de pérdida de vida
    bullet2: undefined,
    
    bitmap: undefined,
    BULLET_SPEED:undefined,
    bulletPool: undefined,
    
    
    vidaJ1: 100,
    barraJ1:undefined,
    vidaJ2: 100,
    barraJ2:undefined,
    layer:undefined,
    h: 1100,
    w: 700,

    puntuacion: undefined,
    puntuacionj1: 0,
    puntuacionj2: 0,

    cursor: undefined,

    limit: undefined,
    left: undefined,
    rigth: undefined, 
    top: undefined,
    bottom: undefined,

    // Esta variable timer controla los cambios de cámara  (al llamar a la función camera())
    timer: undefined,

    //Luciernagas
    luz:undefined,
    luz1:undefined,

    //Sonido
    musica:undefined,
    lanza: undefined,
    boton: undefined,

    upkey: undefined,
    
    //Función create
    create: function () {

    	upKey = game.input.keyboard.addKey(Phaser.Keyboard.UP);
    	
        playState.musica = game.add.audio('musica');
        playState.musica.loopFull(0.17);

        playState.lanza = game.add.audio('shoot');
        playState.boton = game.add.audio('bot');

        // Variables para controlar la vida de cada personaje
        var barConfig;

        // Variable para controlar el lapso de tiempo entre cambios de cámara
        this.timer = game.time.create(false);

        //Declaración de funciones
        shootBullet = function(pointer){
            //Marcamos la velocidad de disparo. Tendrá un límite -> 1800 (velocidad mirada a ojo, te pasas si lo cargas a full)
            var max = 1800;
            var min = 250;
            playState.BULLET_SPEED = game.physics.arcade.distanceToPointer(pointer) * 10;
            playState.puntuacion = Math.round(playState.BULLET_SPEED/100);
            if (playState.BULLET_SPEED >= max){playState.BULLET_SPEED = max;}
            if (playState.BULLET_SPEED <= min){playState.BULLET_SPEED = min;}

            playState.bullet.body.gravity.y = 980;
            playState.bullet2.body.gravity.y = 980;
            
            // Cambio de sprites
            if (pointer == playState.jugador1) {
                idleJ1();
                // Reasignamos la orientación de la bala en función del ángulo del sprite 'disparador'
                playState.bullet.reset(playState.gun.x, playState.gun.y);
                playState.bullet.rotation = playState.gun.rotation;
                // Se carga el disparo en dirección contraria al desplazamiento del ratón
                playState.bullet.body.velocity.x = Math.cos(playState.bullet.rotation) * -playState.BULLET_SPEED;
                playState.bullet.body.velocity.y = Math.sin(playState.bullet.rotation) * -playState.BULLET_SPEED;
            } else if(pointer == playState.jugador2) {
                idleJ2();
                playState.bullet2.reset(playState.gun.x, playState.gun.y);
                playState.bullet2.rotation = playState.gun.rotation;
                // Se carga el disparo en dirección contraria al desplazamiento del ratón
                playState.bullet2.body.velocity.x = Math.cos(playState.bullet2.rotation) * -playState.BULLET_SPEED;
                playState.bullet2.body.velocity.y = Math.sin(playState.bullet2.rotation) * -playState.BULLET_SPEED;
            }

            playState.lanza.play();
            playState.bolaON = true;
            playState.gun.kill();
            
        },


        charge = function(pointer){
            
            // Creamos al cargar un sprite transparente donde clicamos, al mover el ratón el ángulo respecto este sprite nos dará la dirección de la bala
            playState.gun = game.add.sprite(pointer.x, pointer.y, 'shooter');
            playState.gun.scale.setTo(-1,-1);
            playState.gun.anchor.setTo(0.1,0.5);

            // drawTraj() no operativo
            playState.bitmap = game.add.bitmapData(game.width, game.height);
            playState.bitmap.context.fillStyle = 'rgb(255, 255, 255)';
            playState.bitmap.context.strokeStyle = 'rgb(255, 255, 255)';
            game.add.image(0, 0, playState.bitmap);


        },

        clean = function(){
            playState.bitmap.context.clearRect(0, 0, game.width, game.height);
        },
            
        // Con el parámetro pointer sabemos donde clicamos y alteramos el spritesheet
        setSprite = function(pointer) {
            if (pointer == playState.jugador1){
                chargeJ1();
            } else if (pointer == playState.jugador2){
                chargeJ2();
            }
        },

        game.world.setBounds(0, 0, 2334, 833);                  //Delimitar los bordes del mapa para que funcione el movimiento de camara
        
        //////////////////////////////////////////
        ////// Elementos de la escena:///////////
        //////////////////////////////////////////

        // Fondo
        game.add.sprite(0, -13, 'back');                      
        
        map = game.add.tilemap('MyTilemap', 32, 32, 8, 8);
        map.addTilesetImage('tiles');

        playState.layer = map.createLayer(0);

        map.setCollisionBetween(0,63);

        //Límites del mapa
        playState.limit = game.add.group();
        playState.limit.enableBody = true;
        playState.left = playState.limit.create(-10, 0, 'sides');
        playState.right = playState.limit.create(2350, 0, 'sides');
        playState.top = playState.limit.create(10, 0, 'sky');
        // Añadimos un muro inferior en caso de que la colisón con el tileset falle
        playState.bottom = playState.limit.create(0, 750, 'sky');

        playState.limit.setAll('body.immovable', true);
        
        

        ///////////////////////////////
        // Gestión de jugadores:///////
        ///////////////////////////////

        // Creamos el grupo de jugadores. Activamos body para colisiones.
        playState.player = game.add.group();
        playState.player.enableBody = true;
        
        var posibles1 = [215, 240, 265, 350, 380, 410, 450, 480, 510];
        playState.jugador1 = playState.player.create(posibles1[Math.floor(Math.random()*posibles1.length)], 650, 'jugador1'); //game.rnd.integerInRange(100, 550)
        playState.jugador1.anchor.setTo(0.5, 0.5); 
        var posibles2 = [2050, 1850, 1900, 2080];
        var rnd = game.rnd.integerInRange(0,7);
        playState.jugador2 = playState.player.create(posibles2[Math.floor(Math.random()*posibles2.length)], 400, 'jugador2'); //posibles[rnd]        2050, 1850, 1900, 2080 
        
        playState.jugador2.anchor.setTo(0.5, 0.5); 
        // De momento no queremos que se muevan al colisionar con la bala
        playState.player.setAll('body.immovable', true);
        // A pesar de immovable, siguen con su gravedad
        playState.jugador1.body.gravity.y=300;
        playState.jugador2.body.gravity.y=300;

        playState.jugador1.animations.add('idle');                
        playState.jugador1.animations.play('idle', 10, true);             //Cargamos la spritesheet para el jugador 1 y le damos nombre a la animación como idle.

        playState.jugador2.animations.add('idle');                
        playState.jugador2.animations.play('idle', 10, true);             //Cargamos la spritesheet para el jugador 2 y le damos nombre a la animación como idle.

        
        
        // Peticiones POST para iniciar la puntuación de ambos jugadores
        $.ajax({
        	method: "POST",
        	url: "http://127.0.0.1:8080/jugadores",
        	data: JSON.stringify({puntos: "0" , turnos:"1"}),
        	processData: false,
        	headers: {
        		"Content-type": "application/json",
        	}
        }).done(function (data, textStatus, jqXHR){
        	console.log(textStatus+ " " + jqXHR.statusCode());
        }).fail(function (data, textStatus, jqXHR){
        	console.log(textStatus+ " " + jqXHR.statusCode());
        });
        
        $.ajax({
        	method: "POST",
        	url: "http://127.0.0.1:8080/jugadores",
        	data: JSON.stringify({puntos: "0" , turnos:"2"}),
        	processData: false,
        	headers: {
        		"Content-type": "application/json",
        	}
        }).done(function (data, textStatus, jqXHR){
        	console.log(textStatus+ " " + jqXHR.statusCode());
        }).fail(function (data, textStatus, jqXHR){
        	console.log(textStatus+ " " + jqXHR.statusCode());
        });
        
        
        // Animacion de luciernagas
        
        playState.luz = game.add.sprite(850, 285, 'luz');
        playState.luz.scale.setTo(0.75, 0.75);
        game.physics.arcade.enable(playState.luz);
        playState.luz.animations.add('bucle');
        playState.luz.animations.play('bucle', 3, true);
        playState.luz.alpha = 0;

        playState.luz1 = game.add.sprite(1835, 285, 'luz');
        playState.luz1.scale.setTo(0.75, 0.75);
        game.physics.arcade.enable(playState.luz1);
        playState.luz1.animations.add('bucle1');
        playState.luz1.animations.play('bucle1', 3, true);


        // Gestión de trayectoria 
        playState.bitmap = game.add.bitmapData(game.width, game.height);



        // Gestión de los disparos
        playState.bulletPool = game.add.group();
        playState.bulletPool.enableBody = true;

        playState.bullet = playState.bulletPool.create(playState.jugador1.x, playState.jugador1.y, 'bullet');
        playState.bullet.anchor.setTo(0.5, 0.5);
        playState.bullet.kill();

        playState.bullet2 = playState.bulletPool.create(playState.jugador2.x, playState.jugador2.y, 'bullet');
        playState.bullet2.anchor.setTo(0.5, 0.5);
        playState.bullet2.kill();
        


        // Enable input para ambos jugadores
        playState.jugador1.inputEnabled = true;
        playState.jugador1.events.onInputDown.add(charge);
        playState.jugador1.events.onInputUp.add(shootBullet);         
        playState.jugador1.events.onInputDown.add(setSprite);               //Cambia el spritesheet


        playState.jugador2.inputEnabled = true;
        playState.jugador2.events.onInputDown.add(charge);
        playState.jugador2.events.onInputUp.add(shootBullet);
        playState.jugador2.events.onInputDown.add(setSprite); 

        // Comenzamos siguiendo las acciones del jugador 1
        game.camera.follow(playState.jugador1);


        //////////////////////////////////////////////////
        ///////////////// Barra de Vida///////////////////
        //////////////////////////////////////////////////  
        
        //Configuración para la barra
        barConfig = {width: 70,
                    height: 15,};  

        playState.barraJ1 = new HealthBar(game, barConfig);
        playState.barraJ2 = new HealthBar(game, barConfig);
    

        
        //////////////////////////////////////////////////////
        //////////////// Menu de Pause ///////////////////////
        //////////////////////////////////////////////////////

        function unpause(event){
            if(game.paused){
                //Coordenadas del .png del menu
                var x1 = game.camera.x + (game.width/2 - 100), x2 = game.camera.x + (game.width/2 + 100),
                    y1 = game.camera.y + (game.height/2 - 105), y2 = game.camera.y + (game.height/2 + 105);
            
                //Checkeamos si está dentro del cuadrado
                if(true){

                    //Coordenadas locales al menú
                    var x = event.x - x1,
                        y = event.y - y1;

                    //Calculamos la elección
                    var choise = 3*Math.floor(y / 70);
                    if (choise == -6){
                        playState.boton.play();
                        menu.destroy();
                        game.paused = false;
                    }
                    else if (choise == -3){
                        //Cargar state anterior, el menu
                        playState.boton.play();
                        playState.musica.pause();
                        menu.destroy();
                        game.paused = false;
                        game.state.remove('menu');
                        game.state.remove('play');
                        game.state.add('menu2', menuState2);
                        game.state.start('menu2');                   
                    }
                    else if(choise ==  0){
                        playState.boton.play();
                        //cerrrar pestaña
                        menu.destroy();
                        game.destroy();
                    }
                }
            }
        };

        
        //Ajustar camara
        pause_label = game.add.text(1020, 10, 'Pausa', { font: '22px Arial', fill: 'white' });
        pause_label.fixedToCamera = true;
        pause_label.inputEnabled = true;

        pause_label.events.onInputUp.add(function () {
            //Añadimos menú
            playState.boton.play();    
            //Poner en funcion de camara
            menu = game.add.sprite(game.camera.x + (game.width/2 - 100), game.camera.y + (game.height/2 - 105), 'menu');
            menu.fixedToCamera = true;
            game.paused = true;
        });
    
        //Evento de fullscreen
        game.input.onDown.add(unpause, self);


        /////////////////////////////////////////////
        //////////Full Screen ///////////////////////
        /////////////////////////////////////////////

        gofull = function() {


            if (game.scale.isFullScreen)
            {
                game.scale.stopFullScreen();
            }
            else
            {
                game.scale.startFullScreen(false);
            }

        },
        cursors = game.input.keyboard.addKey(Phaser.Keyboard.F);
        game.scale.fullScreenScaleMode = Phaser.ScaleManager.EXACT_FIT;
        cursors.onDown.add(gofull, this);
    },


    

    update: function() {
        
    	if (upKey.isDown)
        {
            playState.vidaJ1 -= 20;
            $.ajax({
            	method: "PUT",
            	url: "http://127.0.0.1:8080/jugadores/1",
            	data: JSON.stringify({puntos: "75" , turnos:"2"}),
            	processData: false,
            	headers: {
            		"Content-type": "application/json",
            	}
            }).done(function (data, textStatus, jqXHR){
            	console.log(textStatus+ " " + jqXHR.statusCode());
            }).fail(function (data, textStatus, jqXHR){
            	console.log(textStatus+ " " + jqXHR.statusCode());
            });
        }
    	
        //Variables locales a update
        var timeOffset;
        
        playState.barraJ1.setPosition(playState.jugador1.x, playState.jugador1.y - 40);
        playState.barraJ2.setPosition(playState.jugador2.x, playState.jugador2.y - 40);
        

        // Sistema spritesheets j1
        chargeJ1 = function(){
            playState.jugador1.loadTexture('j1Cargando', 0);
            playState.jugador1.animations.add('charging');
            playState.jugador1.animations.play('charging', 8, true);
        },
        
        
        idleJ1 = function(){
            playState.jugador1.loadTexture('jugador1', 0);
            playState.jugador1.animations.add('idle');
            playState.jugador1.animations.play('idle', 8, true);
        },


        // Sistema de control de spritesheets j2
        chargeJ2 = function(){
            playState.jugador2.loadTexture('j2Cargando', 0);
            playState.jugador2.animations.add('charging');
            playState.jugador2.animations.play('charging', 8, true);
        },
       
        
        idleJ2 = function(){
            playState.jugador2.loadTexture('jugador2', 0);
            playState.jugador2.animations.add('idle');
            playState.jugador2.animations.play('idle', 8, true);
        },

        // Función disparos v2. dibujado de trayectoria
        drawTraj = function(){

            playState.bitmap.context.clearRect(playState.jugador1.x, playState.jugador1.y, game.width, game.height);
            playState.bitmap.context.fillStyle = 'rgba(255, 255, 255, 0.5)';
            var MARCH_SPEED = 40; 
            timeOffset = timeOffset + 1 || 0;
            timeOffset = timeOffset % MARCH_SPEED;

            var correctionFactor = 0.99;
            var theta = -playState.gun.rotation;
            var x = 0;
            var y = 0;
            for(var t = 0 + timeOffset/(1000*MARCH_SPEED/60); t < 3; t += 0.03) {
                x = playState.BULLET_SPEED * t * Math.cos(theta) * correctionFactor;
                y = playState.BULLET_SPEED * t * Math.sin(theta) * correctionFactor - 0.5 * playState.GRAVITY * t * t;
                playState.bitmap.context.fillRect(x + playState.player.x, playState.player.y - y, 3, 3);
                if (y < -15) 
                break;
            }

            playState.bitmap.dirty = true;
        },


        // Colisiones jugador con el mapa
        game.physics.arcade.collide(playState.player, playState.layer);
        // Colisiones bullet con el mapa
        var hitGround = game.physics.arcade.collide(playState.bulletPool, playState.layer);
        var hitJugador1 = game.physics.arcade.collide(playState.jugador1, playState.bullet2);
        var hitJugador2 = game.physics.arcade.collide(playState.jugador2, playState.bullet);        
        var hitBounds = game.physics.arcade.collide(playState.bulletPool, playState.limit);


        playState.bulletPool.forEachAlive(function(bullet) {
            playState.bullet.rotation = Math.atan2(playState.bullet.body.velocity.y, playState.bullet.body.velocity.x);
        }, this);


        playState.bulletPool.forEachAlive(function(bullet2) {
            playState.bullet2.rotation = Math.atan2(playState.bullet2.body.velocity.y, playState.bullet2.body.velocity.x);
        }, this);



        if (playState.gun != undefined){
            playState.gun.rotation = game.physics.arcade.angleToPointer(playState.gun);
            drawTraj();     
        } 


        if (playState.turn == false && hitJugador1) {
            playState.puntuacionj2 += playState.puntuacion;
            // Actualización en el servidor de la puntuación
            $.ajax({
            	method: "PUT",
            	url: "http://127.0.0.1:8080/jugadores/1",
            	data: JSON.stringify({puntos: playState.puntuacionj2 , turnos:"2"}),
            	processData: false,
            	headers: {
            		"Content-type": "application/json",
            	}
            }).done(function (data, textStatus, jqXHR){
            	console.log(textStatus+ " " + jqXHR.statusCode());
            }).fail(function (data, textStatus, jqXHR){
            	console.log(textStatus+ " " + jqXHR.statusCode());
            });
            
            console.log(playState.puntuacionj2);
            playState.vidaJ1 -= 20;
            playState.barraJ1.setPercent(playState.vidaJ1);
            playState.bullet.kill();
            //Eliminamos la bala2 por si cae sobre él mismo
            playState.bullet2.kill();
            this.timer.loop(800, camera, this);
            this.timer.start();

        } else if (playState.turn == true && hitJugador2) {
            playState.puntuacionj1 += playState.puntuacion;
            // Actualización en el servidor de la puntuación
            $.ajax({
            	method: "PUT",
            	url: "http://127.0.0.1:8080/jugadores/0",
            	data: JSON.stringify({puntos: playState.puntuacionj1 , turnos:"1"}),
            	processData: false,
            	headers: {
            		"Content-type": "application/json",
            	}
            }).done(function (data, textStatus, jqXHR){
            	console.log(textStatus+ " " + jqXHR.statusCode());
            }).fail(function (data, textStatus, jqXHR){
            	console.log(textStatus+ " " + jqXHR.statusCode());
            });
            
            console.log(playState.puntuacionj1);
            playState.vidaJ2 -= 20;
            playState.barraJ2.setPercent(playState.vidaJ2);
            playState.bullet2.kill();
            //Eliminamos la bala por si cae sobre él mismo
            playState.bullet.kill();
            this.timer.loop(800, camera, this);
            this.timer.start();
        }
        
       if ( hitGround || hitBounds) {
            playState.bullet.kill();
            playState.bullet2.kill();
            
            this.timer.loop(800, camera, this);
            this.timer.start();
        }


        function camera(){
            playState.turn = !playState.turn;
            playState.bolaON = false;
            this.timer.stop();
        }

        if(this.luzbool === false){
            game.time.events.add(15000, function() {
                this.luzbool = true;      
                game.add.tween(playState.luz).to({alpha: 1}, 200, Phaser.Easing.Linear.None, true);
            }, this);
        }else{
            game.time.events.add(15000, function() {    
                this.luzbool = false;  
                game.add.tween(playState.luz).to({alpha: 0}, 200, Phaser.Easing.Linear.None, true);
                
            }, this);
        }

        if(this.luzbool1 === true){
            game.time.events.add(15000, function() {
                this.luzbool1 = false;      
                game.add.tween(playState.luz1).to({alpha: 1}, 200, Phaser.Easing.Linear.None, true);
            }, this);
        }else{
            game.time.events.add(15000, function() {    
                this.luzbool1 = true;  
                game.add.tween(playState.luz1).to({alpha: 0}, 200, Phaser.Easing.Linear.None, true);
                
            }, this);
        }

        


        if (playState.bolaON == true && playState.turn == true){
            game.camera.follow(playState.bullet);
        } else if(playState.bolaON == true && playState.turn == false){
            game.camera.follow(playState.bullet2);
        }else if(playState.bolaON == false && playState.turn == true) {
            game.camera.follow(playState.jugador1);
        }else if(playState.bolaON == false && playState.turn == false) {
            game.camera.follow(playState.jugador2);                
        }

        finish1 = function(){
            this.timer.stop();
            this.musica.pause();
            game.state.add('gameover2', finishState2);
            game.state.start('gameover2');
        }

        finish2 = function(){
            this.timer.stop();
            this.musica.pause();
            game.state.add('gameover1', finishState1);
            game.state.start('gameover1');
        }

        //Comprobaciones por si se ha acabado el juego
        if (playState.vidaJ1 == 0){
            this.timer.loop(500, finish1, this);
            this.timer.start();
            
        }
        if (playState.vidaJ2 == 0){ 
            this.timer.loop(500, finish2, this); 
            this.timer.start();           
        }
    },

}