let MasterMind = function(){
  let randowColors = [];
  let intentos = 0;

  const COLORS = [
    'red',
    'white',
    'black',
    'yellow',
    'orange',
    'brown',
    'blue',
    'green'
  ];


  function checkBoard(intento){
    let intent = intento;
    let result = [0,0];
    let backupArray = randowColors.slice();

    for (let i = 0; i < intent.length; i++) {
      if( backupArray[i] == intent[i] ){
        result[0]++;
        backupArray[i] = undefined;
        intent[i] = 0;
      }
    }

    for (let i = 0; i < intent.length; i++) {
      if( backupArray.some(a => { return a == intent[i] }) ){
        result[1]++;
        backupArray[backupArray.indexOf(intent[i])] = undefined;
      }
    }

    intentos++;

    return result;
  }

  function setRandomColors(){
    for (let i = 0; i < 4; i++) {
      randowColors[i] = COLORS[ Math.floor( Math.random() * COLORS.length ) ];
    }
  }

  return {
    init: function(){
      intentos = 0;
      setRandomColors();
    },
    mostrar: function(){
      console.log(randowColors);
    },
    comprobarCoincidencia: function(intento){
      return checkBoard(intento);
    },
    getIntentos: function(){
      return intentos;
    }
  }
}();
