/* Un objeto que representa a los obstaculos. Recibe un sprite que tendra la
imagen que lo representa y una potencia indicando cuanto danio hace al chocar
al jugador, ademas de los parametros comunes x, y, ancho y alto*/
var Obstaculo = function (sprite, x, y, ancho, alto, potencia) {
  this.sprite = sprite;
  this.x = x;
  this.y = y;
  this.ancho = ancho;
  this.alto = alto;
  this.potencia = potencia;
  this.chocar = function(jugador){ //al chocar con un obstaculo el jugador pierde vidas
    jugador.perderVidas(this.potencia);
  };
  
  

}

