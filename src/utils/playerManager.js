export class PlayerManager {
  constructor(){
    this.players = [];

  }
  // add new player and save data in players[]
  addPlayer(newName){
    // initiate player data
    var player = {
      name: "gast",
      difficulty: 0,
      level: 1,
      solvedProblems: 1
    }
    if (newName !=''){
      player.name = newName;
    }
    this.players.unshift(player);
  }
  // save difficulty of the problem
  changeDifficulty(x){
    var player = this.getPlayer();
    player.difficulty += x;
    if (player.difficulty < 0) {
      player.difficulty = 0;
    }
    player.level = Math.floor(player.difficulty/3) + 1;
    console.log("player difficulty: " , player.difficulty, player.level);
  }
  // return player data
  getPlayer(){
    return this.players[0];
  }
}
