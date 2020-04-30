var socket = io();
socket.emit('new player');

socket.on('state', function(playerObject) {
  console.log('Received state: '+playerObject.state);
  switch(playerObject.state) {
    case STATE.waitingForPlayers:
      drawTextScreen('Not enough players');
      break;
    case STATE.decision:
      drawDecisionInterface();
      drawScore(playerObject.score);
      break;
    case STATE.waitingForOpponent:
      drawTextScreen('Waiting for the other player to decide...');
      drawScore(playerObject.score);
      break;
    case STATE.result:
      drawTextScreen('Game has ended. Result: '+playerObject.result);
      drawScore(playerObject.score);
      drawReplayButton();
      break;
  }
});

var currentState = STATE.decision;

setupCanvas();
drawTextScreen('Not enough players');
