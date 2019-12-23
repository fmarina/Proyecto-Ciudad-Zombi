var Jugador = {
  sprite: 'imagenes/auto_rojo_abajo.png',
  x: 130,
  y: 160,
  ancho: 15,
  alto: 30,
  velocidad: 10,
  vidas: 5,
  mover: function(movX, movY, tecla){
    if (tecla == 'izq') {
      this.ancho = 30;
      this.alto = 15;
      this.sprite = "imagenes/auto_rojo_izquierda.png";      
    }
    if (tecla == 'arriba') {
      this.ancho = 15;
      this.alto = 30;
      this.sprite = "imagenes/auto_rojo_arriba.png";
    }
    if (tecla == 'der') {
      this.ancho = 30;
      this.alto = 15;
      this.sprite = "imagenes/auto_rojo_derecha.png";
    }
    if (tecla == 'abajo') {
      this.ancho = 15;
      this.alto = 30;
      this.sprite = "imagenes/auto_rojo_abajo.png";
    }    
    this.x += movX;
    this.y += movY;
  },
  perderVidas: function(cantidadVidas){
    this.vidas -= cantidadVidas;
  }
}

