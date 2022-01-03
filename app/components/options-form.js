import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import { MAX_PLAYER_COUNT, MIN_PLAYER_COUNT } from '../services/game';
import Player from '../models/player';

export default class OptionsFormComponent extends Component {
  @service game;

  @tracked numberOfPlayers = this.game.numberOfPlayers;
  @tracked players;

  constructor() {
    super(...arguments);

    this.players = this.clonePlayers(this.game.players);
  }

  clonePlayers(players) {
    return players.map((player) => {
      let newPlayer = new Player(player.number, player.enabled);
      newPlayer.name = player.name;
      newPlayer.score = 0;
      return newPlayer;
    });
  }

  @action changePlayers(number) {
    this.numberOfPlayers += number;

    if (this.numberOfPlayers < MIN_PLAYER_COUNT) {
      this.numberOfPlayers = MIN_PLAYER_COUNT;
    }

    if (this.numberOfPlayers > MAX_PLAYER_COUNT) {
      this.numberOfPlayers = MAX_PLAYER_COUNT;
    }

    this.players.forEach((player, index) => {
      player.enabled = index < this.numberOfPlayers;
    });
  }

  @action resetGame() {
    this.game.players = this.clonePlayers(this.players);

    if (this.args.onFormClosed) {
      this.args.onFormClosed();
    }
  }

  @action cancelOptions() {
    if (this.args.onFormClosed) {
      this.args.onFormClosed();
    }
  }

  @action saveOptions(event) {
    event.preventDefault();

    this.resetGame();
  }
}
