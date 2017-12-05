// Representación de la grilla. Cada nro representa a una pieza.
// El 9 es la posición vacía
var grilla = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9]
];
var grilla_ordenada = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9]
];
// Acá vamos a ir guardando la posición vacía
var posicionVacia = {
  fila:2,
  columna:2
};
var padre = document.getElementById("pieza-9").parentNode;
// Esta función va a chequear si el Rompecabezas está en la posición ganadora
function chequearSiGano(){
  for(var i=0;i<grilla.length;i++){
    for(var j=0;j<grilla[0].length;j++){
      if (grilla[i][j] != grilla_ordenada[i][j]){
        return false;
      }
    }
  }
  return true;
}



// la hacen los alumnos, pueden mostrar el cartel como prefieran. Pero es importante que usen
// esta función
function mostrarCartelGanador(){
  var cartel = document.getElementById("cartel_ganador");
  cartel.style.animationName = 'mostrar';
  cartel.style.animationDuration = '5s';
  cartel.style.visibility = 'visible';
}

// Intercambia posiciones grilla y en el DOM
function intercambiarPosiciones(fila1, columna1, fila2, columna2){
    var elemento1 = document.getElementById("pieza-" + grilla[fila1][columna1]);
    var elemento2 = document.getElementById("pieza-" + grilla[fila2][columna2]);
    var aux_1 = elemento1.cloneNode(true);
    var aux_2 = elemento2.cloneNode(true)
    var aux = grilla[fila1][columna1];
    grilla[fila1][columna1] = grilla[fila2][columna2];
    grilla[fila2][columna2] = aux;
    padre.replaceChild(aux_2, elemento1);
    padre.replaceChild(aux_1, elemento2);
}

// Actualiza la posición de la pieza vacía
function actualizarPosicionVacia(nuevaFila,nuevaColumna){
  posicionVacia.fila = nuevaFila;
  posicionVacia.columna = nuevaColumna;
}


// Para chequear si la posicón está dentro de la grilla.
function posicionValida(fila, columna){ 
  if(fila < grilla.length && fila >= 0 ){
    if(columna < grilla[0].length && columna >= 0){
      return true;
    }
    else{return false}
  }
  else{return false;}
}
  


// Movimiento de fichas, en este caso la que se mueve es la blanca intercambiando
// su posición con otro elemento
function moverEnDireccion(direccion){

  var nuevaFilaPiezaVacia;
  var nuevaColumnaPiezaVacia;

  // Intercambia pieza blanca con la pieza que está arriba suyo
  if(direccion == 40){
    nuevaFilaPiezaVacia = posicionVacia.fila-1;
    nuevaColumnaPiezaVacia = posicionVacia.columna;
  }
  // Intercambia pieza blanca con la pieza que está abajo suyo
  else if (direccion == 38) {
    nuevaFilaPiezaVacia = posicionVacia.fila+1;
    nuevaColumnaPiezaVacia = posicionVacia.columna;

  }
  // Intercambia pieza blanca con la pieza que está a su izq
  else if (direccion == 39) {
    nuevaFilaPiezaVacia = posicionVacia.fila;
    nuevaColumnaPiezaVacia = posicionVacia.columna-1;

  }
  // Intercambia pieza blanca con la pieza que está a su der
  else if (direccion == 37) {
    nuevaFilaPiezaVacia = posicionVacia.fila;
    nuevaColumnaPiezaVacia = posicionVacia.columna+1;
  }

  // Se chequea si la nueva posición es válida, si lo es, se intercambia 
  if (posicionValida(nuevaFilaPiezaVacia, nuevaColumnaPiezaVacia)){
    intercambiarPosiciones(posicionVacia.fila, posicionVacia.columna,
    nuevaFilaPiezaVacia, nuevaColumnaPiezaVacia);
    actualizarPosicionVacia(nuevaFilaPiezaVacia, nuevaColumnaPiezaVacia);
  }

}



// Extras, ya vienen dadas

function mezclarPiezas(veces){
  if(veces<=0){return;}
  var direcciones = [40, 38, 39, 37];
  var direccion = direcciones[Math.floor(Math.random()*direcciones.length)];
  moverEnDireccion(direccion);

  setTimeout(function(){
    mezclarPiezas(veces-1);
  },100);
}

function capturarTeclas(){
  document.body.onkeydown = (function(evento) {
    if(evento.which == 40 || evento.which == 38 || evento.which == 39 || evento.which == 37){
      moverEnDireccion(evento.which);

      var gano = chequearSiGano();
      if(gano){
        setTimeout(function(){
          mostrarCartelGanador();  
        },500);
      } 
      evento.preventDefault();
    }
  })
}

function iniciar(){
  mezclarPiezas(2);
  capturarTeclas();
}


iniciar();