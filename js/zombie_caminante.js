var ZombieCaminante = function(sprite, x, y, ancho, alto, velocidad, rangoMov){
  Enemigo.call(this, sprite, x, y, ancho, alto, velocidad, rangoMov);
}

ZombieCaminante.prototype = Object.create(Enemigo.prototype);
ZombieCaminante.prototype.constructor = ZombieCaminante;

ZombieCaminante.prototype.mover = function() {
  /* Los movimientos estan basados en un numero aleatorio
  La direccion horizontal es siempre la misma y va ondulando verticalmente.
  Esto hasta llegar a sus limites, donde se invierte su direccion horizontal */
  if (Math.random() < 0.5) {
    this.x -= this.velocidad;
    this.y -= this.velocidad;
  } else {
    //Sino, hace otro movimiento
    this.y += this.velocidad;
    this.x -= this.velocidad;
  }
  /*Se invierte la direccion horizontal si toca uno de sus limites, modificando su velocidad. Si multiplicamos por -1 la velocidad lo que hacemos es invertir su direccion.*/
  if ((this.x < this.rangoMov.desdeX) || (this.x > this.rangoMov.hastaX)){
    this.velocidad *= -1;
  }
  // Si sobrepasa el rangoY, lo manda al centro entre ambos rangos
  if ((this.y < this.rangoMov.desdeY) || (this.y > this.rangoMov.hastaY)) {
    this.y = this.rangoMov.desdeY + (this.rangoMov.hastaY - this.rangoMov.desdeY)/2;
  }
}