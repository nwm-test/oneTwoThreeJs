export class PlayerManager {
  constructor(){
    this.players = [];

  }
addPlayer(newName){
  // initiate player data
  var player = {
    name: "gast"
  }
  if (newName !=''){
    player.name = newName;
  }
  this.players.push(player);

}


}
