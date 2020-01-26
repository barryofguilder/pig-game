import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import Player from '../models/player';

const MIN_PLAYER_COUNT = 2;
const MAX_PLAYER_COUNT = 4;

export default class ApplicationController extends Controller {
  @tracked showOptions = false;
  @tracked numberOfPlayers = 2;
  @tracked players;
  @tracked _players;

  clonePlayers(players) {
    return players.map(player => {
      let newPlayer = new Player(player.number, player.enabled);
      newPlayer.name = player.name;
      newPlayer.score = player.score;
      return newPlayer;
    });
  }

  @action showOptionsDialog() {
    this._players = this.clonePlayers(this.players);
    this.showOptions = true;
  }

  @action changePlayers(number) {
    this.numberOfPlayers += number;

    if (this.numberOfPlayers < MIN_PLAYER_COUNT) {
      this.numberOfPlayers = MIN_PLAYER_COUNT;
    }

    if (this.numberOfPlayers > MAX_PLAYER_COUNT) {
      this.numberOfPlayers = MAX_PLAYER_COUNT;
    }

    this._players.forEach((player, index) => {
      player.enabled = index < this.numberOfPlayers;
    });
  }

  @action cancelOptions() {
    this._players = [];
    this.showOptions = false;
  }

  @action saveOptions(event) {
    event.preventDefault();

    this.players = this.clonePlayers(this._players);
    this.showOptions = false;
  }

  constructor() {
    super(...arguments);

    this.players = [];

    for (let i = 0; i < MAX_PLAYER_COUNT; i++) {
      this.players.push(new Player(i + 1, i < this.numberOfPlayers));
    }
  }
}
