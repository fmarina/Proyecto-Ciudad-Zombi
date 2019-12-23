/*El objeto Juego sera el encargado del control de todo el resto de los Objetos
existentes.
Le dara ordenes al Dibujante para que dibuje entidades en la pantalla. Cargara
el mapa, chequeara colisiones entre los objetos y actualizara sus movimientos
y ataques.*/

var Juego = {
  anchoCanvas: 961,
  altoCanvas: 577,
  jugador: Jugador,
  vidasInicial: Jugador.vidas,  
  ganador: false,// Indica si el jugador gano
  obstaculosCarretera: [    
                  //sprite, x, y, ancho, alto, potencia
    new Obstaculo('imagenes/valla_horizontal.png', 70, 440, 30, 30, 1),
    new Obstaculo('imagenes/valla_horizontal.png', 100, 440, 30, 30, 1),
    new Obstaculo('imagenes/valla_horizontal.png', 130, 440, 30, 30, 1),
    new Obstaculo('imagenes/valla_horizontal.png', 130, 70, 30, 30, 1),
    new Obstaculo('imagenes/valla_horizontal.png', 160, 70, 30, 30, 1),
    new Obstaculo('imagenes/valla_horizontal.png', 520, 420, 30, 30, 1),
    new Obstaculo('imagenes/valla_horizontal.png', 790, 400, 30, 30, 1),
    new Obstaculo('imagenes/valla_vertical.png', 480, 480, 30, 30, 1),
    new Obstaculo('imagenes/valla_vertical.png', 480, 450, 30, 30, 1),
    new Obstaculo('imagenes/bache.png', 510, 450, 30, 30, 2),
    new Obstaculo('imagenes/bache.png', 560, 480, 30, 30, 2),
    new Obstaculo('imagenes/bache.png', 790, 420, 30, 30, 2),
    new Obstaculo('imagenes/bache.png', 500, 75, 30, 30, 2),
    new Obstaculo('imagenes/bache.png', 174, 250, 30, 30, 2),
    new Obstaculo('imagenes/bache.png', 350, 390, 30, 30, 2),
    new Obstaculo('imagenes/auto_verde_abajo.png', 540, 210, 15, 30, 3),
    new Obstaculo('imagenes/auto_verde_derecha.png', 835, 283, 30, 15, 3)
  ],
  // Estos son los bordes con los que se puede chocar, por ejemplo, la vereda.
  bordes: [
    // Bordes
    new Obstaculo('', 0, 5, 961, 18, 0),
    new Obstaculo('', 0, 559, 961, 18, 0),
    new Obstaculo('', 0, 5, 18, 572, 0),
    new Obstaculo('', 943, 5, 18, 572, 0),
    // Veredas
    new Obstaculo('', 18, 23, 51, 536, 2),
    new Obstaculo('', 69, 507, 690, 52, 2),
    new Obstaculo('', 587, 147, 173, 360, 2),
    new Obstaculo('', 346, 147, 241, 52, 2),
    new Obstaculo('', 196, 267, 263, 112, 2),
    new Obstaculo('', 196, 23, 83, 244, 2),
    new Obstaculo('', 279, 23, 664, 56, 2),
    new Obstaculo('', 887, 79, 56, 480, 2)
  ],
  enemigos: [
                //sprite, x, y, ancho, alto, velocidad, rangoMov, direccion    
    new ZombieConductor("imagenes/tren_horizontal.png", 400, 322, 90, 30, 8, {
      desdeX: 20,
      hastaX: 850,
      desdeY: 0,
      hastaY: 577
      }, "h"),
    new ZombieConductor("imagenes/tren_vertical.png", 644, 0, 30, 90, 4, {
      desdeX: 0,
      hastaX: 644,
      desdeY: 0,
      hastaY: 470
      }, "v"),
    new ZombieConductor("imagenes/tren_vertical.png", 678, 0, 30, 90, 6, {
      desdeX: 678,
      hastaX: 678,
      desdeY: 0,
      hastaY: 470
      }, "v"),
    new ZombieCaminante("imagenes/zombie1.png", 100, 200, 10, 10, 1, {
      desdeX: 50,
      hastaX: 200,
      desdeY: 400,
      hastaY: 50
      }), 
    new ZombieCaminante("imagenes/zombie4.png", 100, 200, 10, 10, 1.5, {
      desdeX: 50,
      hastaX: 360,
      desdeY: 400,
      hastaY: 0
      }),        
    new ZombieCaminante("imagenes/zombie2.png", 800, 100, 10, 10, 0.8, {
      desdeX: 750,
      hastaX: 900,
      desdeY: 260,
      hastaY: 260
      }),
    new ZombieCaminante("imagenes/zombie3.png", 870, 520, 10, 10, 0.7, {
      desdeX: 750,
      hastaX: 900,
      desdeY: 250,
      hastaY: 250
      }),
    new ZombieCaminante("imagenes/zombie4.png", 800, 100, 10, 10, 0.7, {
      desdeX: 750,
      hastaX: 900,
      desdeY: 220,
      hastaY: 220
      }),
    new ZombieCaminante("imagenes/zombie3.png", 450, 480, 10, 10, 0.8, {
      desdeX: 100,
      hastaX: 450,
      desdeY: 460,
      hastaY: 480
      }),
    new ZombieCaminante("imagenes/zombie1.png", 430, 470, 10, 10, 1, {
      desdeX: 100,
      hastaX: 450,
      desdeY: 480,
      hastaY: 480
      }),
    new ZombieCaminante("imagenes/zombie2.png", 410, 490, 10, 10, 0.5, {
      desdeX: 410,
      hastaX: 450,
      desdeY: 200,
      hastaY: 577
      }),      
    new ZombieCaminante("imagenes/zombie4.png", 860, 545, 10, 10, 1, {
      desdeX: 740,
      hastaX: 900,
      desdeY: 500,
      hastaY: 530
      }),    
    new ZombieCaminante("imagenes/zombie1.png", 880, 50, 10, 10, 0.3, {
      desdeX: 720,
      hastaX: 940,
      desdeY: 50,
      hastaY: 50
      }),
    new ZombieCaminante("imagenes/zombie4.png", 860, 30, 10, 10, 0.3, {
      desdeX: 720,
      hastaX: 940,
      desdeY: 30,
      hastaY: 30
      }),
    new ZombieCaminante("imagenes/zombie4.png", 460, 330, 10, 10, 0.6, {
      desdeX: 460,
      hastaX: 570,
      desdeY: 310,
      hastaY: 230
      }),
  ]
}

Juego.iniciarRecursos = function() {
  Resources.load([
    'imagenes/mapa.png',
    'imagenes/mensaje_gameover.png',
    'imagenes/Splash.png',
    'imagenes/bache.png',
    'imagenes/tren_horizontal.png',
    'imagenes/tren_vertical.png',
    'imagenes/valla_horizontal.png',
    'imagenes/valla_vertical.png',
    'imagenes/zombie1.png',
    'imagenes/zombie2.png',
    'imagenes/zombie3.png',
    'imagenes/zombie4.png',
    'imagenes/auto_rojo_abajo.png',
    'imagenes/auto_rojo_arriba.png',
    'imagenes/auto_rojo_derecha.png',
    'imagenes/auto_rojo_izquierda.png',
    'imagenes/auto_verde_abajo.png',
    'imagenes/auto_verde_derecha.png',
    'imagenes/Mapa/linea_llegada.png'
  ]);
  Resources.onReady(this.comenzar.bind(Juego));
};

// Agrega los bordes de las veredas a los obstaculos de la carretera
Juego.obstaculos = function() {
  return this.obstaculosCarretera.concat(this.bordes);
};

Juego.comenzar = function() {
  Dibujante.inicializarCanvas(this.anchoCanvas, this.altoCanvas);
  /* El bucle principal del juego se llamara continuamente para actualizar
  los movimientos y el pintado de la pantalla. Es el encargado de calcular los
  ataques, colisiones, etc*/
  this.buclePrincipal();
};

Juego.buclePrincipal = function() {  
  this.update(); //update actualiza la logica del juego, tanto ataques como movimientos
  this.dibujar();//Funcion que dibuja por cada fotograma a los objetos en pantalla.
  window.requestAnimationFrame(this.buclePrincipal.bind(this));
};

Juego.update = function() {
  this.calcularAtaques();
  this.moverEnemigos();
}
// Captura las teclas y si coincide con alguna de las flechas hace que el jugador se mueva
Juego.capturarMovimiento = function(tecla) {
  var movX = 0;
  var movY = 0;
  var velocidad = this.jugador.velocidad;
  // El movimiento esta determinado por la velocidad del jugador
  if (tecla == 'izq') {
    movX = -velocidad;    
  }
  if (tecla == 'arriba') {
    movY = -velocidad;
  }
  if (tecla == 'der') {
    movX = velocidad;
  }
  if (tecla == 'abajo') {
    movY = velocidad;
  }
  if (this.chequearColisiones(movX + this.jugador.x, movY + this.jugador.y)) {
    this.jugador.mover(movX, movY, tecla);
  }
};

Juego.dibujar = function(){
  Dibujante.borrarAreaDeJuego(); //Borra el fotograma actual  
  this.dibujarFondo(); //Se pinta la imagen de fondo segun el estado del juego

  if(this.terminoJuego() || this.ganoJuego()) return;

  Dibujante.dibujarEntidad(this.jugador);
  //linea de llegada:
  Dibujante.dibujarImagen("imagenes/Mapa/linea_llegada.png", 760, 530, 127, 16);

  this.obstaculosCarretera.forEach(function(obstaculo) {    
    Dibujante.dibujarEntidad(obstaculo);// Se pintan los obstaculos de la carretera
  });

  this.enemigos.forEach(function(enemigo) {
    Dibujante.dibujarEntidad(enemigo);// Se recorren los enemigos pintandolos
  });
  //El dibujante dibuja las vidas del jugador:
  var tamanio = this.anchoCanvas / this.vidasInicial;
  Dibujante.dibujarRectangulo('white', 0, 0, this.anchoCanvas, 8);
  for (var i = 0; i < this.jugador.vidas; i++) {
    var x = tamanio * i
    Dibujante.dibujarRectangulo('red', x, 0, tamanio, 8);
  }
};

//Recorre los enemigos haciendo que se muevan.
Juego.moverEnemigos = function(){
  this.enemigos.forEach(function(enemigo){
    enemigo.mover();    
  });
};

/*Recorre los enemigos para ver cual esta colisionando con el jugador
Si colisiona empieza el ataque el zombie, si no, deja de atacar.*/
Juego.calcularAtaques = function() {
  this.enemigos.forEach(function(enemigo) {
    if (this.intersecan(enemigo, this.jugador, this.jugador.x, this.jugador.y)){
      enemigo.comenzarAtaque(this.jugador);
    } else {
      Enemigo.prototype.dejarDeAtacar();
    }
  }, this);
};

/* Chequea si el jugador se puede mover a la posicion destino.
 Es decir, que no haya obstaculos que se interpongan. De ser asi, no podra moverse */
Juego.chequearColisiones = function(x, y) {
  var puedeMoverse = true
  this.obstaculos().forEach(function(obstaculo) {
    if (this.intersecan(obstaculo, this.jugador, x, y)) {
      obstaculo.chocar(this.jugador);
      obstaculo.potencia = 0;
      puedeMoverse = false
    }
  }, this)
  return puedeMoverse
};

/* Este metodo chequea si los elementos 1 y 2 si cruzan en x e y
 x e y representan la coordenada a la cual se quiere mover el elemento2*/
Juego.intersecan = function(elemento1, elemento2, x, y) {
  var izquierda1 = elemento1.x
  var derecha1 = izquierda1 + elemento1.ancho
  var techo1 = elemento1.y
  var piso1 = techo1 + elemento1.alto
  var izquierda2 = x
  var derecha2 = izquierda2 + elemento2.ancho
  var techo2 = y
  var piso2 = y + elemento2.alto

  return ((piso1 >= techo2) && (techo1 <= piso2) &&
    (derecha1 >= izquierda2) && (izquierda1 <= derecha2))
};

Juego.dibujarFondo = function() {
  // Si se termino el juego muestra el mensaje de game over de fondo
  if (this.terminoJuego()) {
    Dibujante.dibujarImagen('imagenes/mensaje_gameover.png', 0, 5, this.anchoCanvas, this.altoCanvas);
    document.getElementById('reiniciar').style.visibility = 'visible';
  }
  // Si se gano el juego se muestra el mensaje de ganoJuego de fondo
  else if (this.ganoJuego()) {
    Dibujante.dibujarImagen('imagenes/Splash.png', 190, 113, 500, 203);
    document.getElementById('reiniciar').style.visibility = 'visible';
  } else {
    Dibujante.dibujarImagen('imagenes/mapa.png', 0, 5, this.anchoCanvas, this.altoCanvas);
  }
};

Juego.terminoJuego = function() {
  return this.jugador.vidas <= 0;
};

/* Se gana el juego si se sobre pasa cierto altura Y */
Juego.ganoJuego = function() {
  return (this.jugador.y + this.jugador.alto) > 530;
};

Juego.iniciarRecursos();

// Activa las lecturas del teclado al presionar teclas
document.addEventListener('keydown', function(e) {
  var allowedKeys = {
    37: 'izq',
    38: 'arriba',
    39: 'der',
    40: 'abajo'
  };
  Juego.capturarMovimiento(allowedKeys[e.keyCode]);
});
