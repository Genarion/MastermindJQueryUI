{
  let coloursSelected = [undefined,undefined,undefined,undefined];

  let $colors = $('.colors');

  let $selectedOne = $('#selectedOne');
  let $selectedTwo = $('#selectedTwo');
  let $selectedThree = $('#selectedThree');
  let $selectedFour = $('#selectedFour');

  let $checkedOne = $('#checkedOne');
  let $checkedTwo = $('#checkedTwo');
  let $checkedThree = $('#checkedThree');
  let $checkedFour = $('#checkedFour');

  let $jugadaNode = $('#jugada');
  let $boardNode = $('#last-turns');
  let $checkColorsNode = $('#checkColors');
  let $buttonStartNode = $('#start');
  let $buttonSalirNode = $('#salir');
  let $buttonResetNode = $('#reiniciar');
  let $intentosNode = $('#intentos');

  let isFinish = false;

  let setColor = function(color){
    let indexUndefined = coloursSelected.indexOf(undefined);
    if(coloursSelected.length == 4 && indexUndefined != -1 && !isFinish){
      coloursSelected[indexUndefined] = color;
      drawColor(color,indexUndefined);
    }
  }
  let drawColor = function(color,index){
    if (index == 0) {
      $selectedOne.css('fill', color).css('opacity', '1');
    } else if (index == 1) {
      $selectedTwo.css('fill', color).css('opacity', '1');
    } else if(index == 2){
      $selectedThree.css('fill', color).css('opacity', '1');
    }else{
      $selectedFour.css('fill', color).css('opacity', '1');
    }
    $jugadaNode.hide().show('bounce', {times: 3}, 600)
  }
  let resetColor = function(){
    if( !$.Color( $( this ).css( 'fill' ) ).is( 'gray' ) ){
      $(this).css('fill', 'gray').css('opacity', '0.75');

      if (this.id == 'selectedOne') {
        coloursSelected[0] = undefined;
      } else if(this.id == 'selectedTwo') {
        coloursSelected[1] = undefined;
      } else if(this.id == 'selectedThree') {
        coloursSelected[2] = undefined;
      }else{
        coloursSelected[3] = undefined;
      }

      $jugadaNode.hide().show('pulsate', {times: 2}, 600)
    }
  }

  let checkColors = function(){
    if(coloursSelected.every( a => { return a != undefined } ) ){
      let match = MasterMind.comprobarCoincidencia( coloursSelected );

      if(!isFinish){
        showMatchesInBoard( match );
        refreshBoard();
        clearTurnBoard();
      }

      if(match[0] == 4){
        $buttonStartNode.css('display','block');
        isFinish = true;
        $( "#menu" ).dialog( "open" );
      }

      $intentosNode.html(MasterMind.getIntentos());
    }
  }
  let showMatchesInBoard = function(matches){
    let posibilities = [ $checkedOne, $checkedTwo, $checkedThree, $checkedFour ];
    let contador = 0;

    for (let i = 0; i < matches[0]; i++) {
      posibilities[i].css('fill','black').css('opacity','1');
      contador++;
    }

    for (let i = 0; i < matches[1]; i++) {
      posibilities[contador++].css('fill','white').css('opacity','1');
    }

  }
  let refreshBoard = function(){
    $jugadaNode.clone().appendTo($boardNode);
  }
  let clearTurnBoard = function(){
    coloursSelected = [undefined,undefined,undefined,undefined];
    $('#jugada').children().css('fill', 'gray').css('opacity', '0.75');
  }

  let start = function(){
    isFinish = false;
    $('#menu').dialog('close');
    $intentosNode.html(0);
    clearTurnBoard();
    $boardNode.empty();

    MasterMind.init();
    MasterMind.mostrar();
  }

  $colors.on( 'click', function(){ setColor( $(this).children().attr('fill') ) } );
  $colors.hover(
    function(){ $( this ).addClass( 'shadowColors'); },
    function(){ $( this ).removeClass('shadowColors'); }
  );

  $selectedOne.on('click', resetColor);
  $selectedTwo.on('click', resetColor);
  $selectedThree.on('click', resetColor);
  $selectedFour.on('click', resetColor);

  $checkColorsNode.on('click', checkColors);

  $buttonStartNode.on('click', start);
  $buttonResetNode.on('click', start);
  $buttonSalirNode.on('click', function(){ window.close(); });

  $( "#menu" ).dialog({
    autoOpen: false,
    modal: true,
    show: {
      effect: "blind",
      duration: 1000
    },
    hide: {
      effect: "explode",
      duration: 1000
    }
  });


  start();
}
